//Execute the function when the document is ready.
$(document).ready(function() {
    //Bind on click event for menu toggle.
    $("#menu-toggle").click(function(e) {
        e.preventDefault();

        $("#wrapper").toggleClass("toggled");
        //Trigger resize after the toggle animation.
        setTimeout(function(){ google.maps.event.trigger(map, 'resize'); map.setZoom( map.getZoom() );}, 500);
    });
    //Shrink menu for mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $("#menu-toggle").click();
    }
    //Apply bindings to view Model
    ko.applyBindings(viewModel);
});

//Initialize map variable with google Map object
var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(37.8, -122.1),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

//Maintain previous marker to remove animation
var previousMarker = null;
//Maintain previous infowindow to close on clicking the new info window.
var previousInfoWindow = null;

// Point class to Initialize the marker details
function point(stationObj, lat, long) {
    this.name = stationObj.name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);
    //Initialize Marker on the google map.
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        animation: google.maps.Animation.DROP,
        title: stationObj.name,
        map: map,
        draggable: false
    });

    // Add click event listener and bind to the marker
    google.maps.event.addListener(this.marker, 'click', function() {
        //Stop marker animation if it is already animating
        if (this.marker.getAnimation() !== null) {
            this.marker.setAnimation(null);
        } else {
            //Marker animation on click.
            this.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        var infowindow = new google.maps.InfoWindow({
            content: ""
        });
        // Info window content with a link to show weather details
        var replaceSingleQuote = stationObj.name.replace(/'/g, "");
        var content = "<a  href='javascript:findWeather(\"" + replaceSingleQuote + "\")'><div class='info-div'>" + stationObj.name + "<br>" + stationObj.address + "</div></a>";
        infowindow.content = content;
        // Open info window on clicking the info window
        infowindow.open(map, this.marker);
        //Clear previous animation
        if (previousMarker != null) {
            previousMarker.setAnimation(null);
        }
        //Clear previous info window.
        if (previousInfoWindow != null) {
            previousInfoWindow.close();
        }
        previousMarker = this.marker;
        previousInfoWindow = infowindow;
    }.bind(this));


}

//View Model which will be bound using knockout
var viewModel = function() {
    var self = this;
    // search key value bound to texfield
    self.searchKey = ko.observable();
    //Function to find all BART stations called when the page is loaded
    self.findAllStations = function() {
        //Ajax call to get the bart stations info in xml format
        $.ajax({
            url: "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V",
            type: "GET",
            dataType: 'xml',
            cache: false,
            success: function(data) {
                //Get stations info from the ajax response and iterate through each station
                jQuery('stations', data).find('station').each(function() {
                    // Parse the xml using jquery to get lat, long and station name
                    var longitude = parseFloat($(this).find("gtfs_longitude").text());
                    var latitude = parseFloat($(this).find("gtfs_latitude").text());
                    var stationObj = {};
                    stationObj.name = $(this).find("name").text();
                    stationObj.address = $(this).find("address").text();

                    // Create a new point using the station info and pus into all Markers array
                    self.allMarkers.push(new point(stationObj, latitude, longitude));
                    // Push the station name and it's visibility to true for displaying the list view
                    self.filteredList.push({
                        name: stationObj.name,
                        visible: true
                    });
                });
            },
            error: function(response) {
                // Alert user if the there is any error while connecting to the server
                alert("Couldn't connect to bart server. Please try later" + response);
            }
        });

    };
    // Function to filter stations on searching
    self.filterStations = function() {
        var currentMarkers = self.allMarkers();
        // Remove all stations from filtered list
        self.filteredList.removeAll();
        // Iterate through all the markers
        for (var index in currentMarkers) {
            var currentName = currentMarkers[index].name;
            var searchVal = self.searchKey();
            // If search value is null initialize to empty string
            if (!searchVal) {
                searchVal = "";
            }
            // Check if the typed in value is matching with the current station name in the list
            if (currentName.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0) {
                // Set the visibility of the marker to true
                currentMarkers[index].marker.setVisible(true);
                // Push it to filtered list with visible property as true
                self.filteredList.push({
                    name: currentName,
                    visible: true
                });
            } else {
                // Set the visibility of the marker to false
                currentMarkers[index].marker.setVisible(false);
                // Push it to filtered list with visible property as false
                self.filteredList.push({
                    name: currentName,
                    visible: false
                });

            }
        }
    };
    // Function to call on pressing enter key pressed
    self.searchKeyUp = function(d, e) {
        if (e.keyCode == 13) {
            filterStations();
        }
    };
    // Function to call when the station is selected from the list view
    self.selectedStation = function(index) {
            // Trigger the marker click event from list view
            google.maps.event.trigger(self.allMarkers()[index].marker, "click");
        }
        // Function to fetch the weather forecast for the week.
    self.findWeather = function(name) {
        // Display modal window
        $('#myModal').modal('toggle')
            // set selected place to be diplayed as title.
        self.selectedPlace(name);
        // Remove all the existing weather details of the previous location
        self.weatherDetails.removeAll();
        // Ajax request to get the weather forecast based on the selected station name.
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + name + ",CA&mode=json&units=metric&cnt=7",
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(response) {
                // Push all the weather details of the week to an array.
                ko.utils.arrayPushAll(weatherDetails, response["list"]);
            },
            error: function(response) {
                // Alert user if the there is any error while connecting to the server
                alert(JSON.stringify(response));
            }
        });

    };

    //Find station address from the filtered list.
    self.findStationAddress = function(stationName) {
        var stationList = self.filteredList;
        for (var index in stationList) {
            var currentName = stationList[index].name;
            if (currentName.toLowerCase().indexOf(stationName.toLowerCase()) >= 0) {
                return stationList[index].address;
            }
        }
    };

    // List to store all the google markers
    self.allMarkers = ko.observableArray();
    // List to store the list view.
    self.filteredList = ko.observableArray();
    // List to store the weather details of the week
    self.weatherDetails = ko.observableArray();
    // Selected station name to display in the modal
    self.selectedPlace = ko.observable();
    // Find all stations on load of the page.
    self.findAllStations();

};
