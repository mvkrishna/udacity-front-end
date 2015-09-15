# Project : Neighborhood Map Project

Application to provide a search/filter option on the existing map markers that are already displayed. If a list of locations already shows up on a map, offer a search function that filters this existing list. The list view and the markers should update accordingly in real-time. Simply providing a search function through a third-party API is not enough to meet specifications.

### Running the application
1. Unzip the folder.
2. Folder will have 3 files index.html, main.js and style.css
3. Open index.html in a browser
4. Requires internet connection for the common frameworks and map

### Using the application
1. All the bart stations are marked in the map and loaded in to list view.
2. Bart stations information is loaded using ajax request using bart api http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V
3. Bart stations api returns xml based response and it is parsed using jquery.
4. Click on any of the markers in the map or the list from the side bar to see the station name.
5. Clicking on the station on the markers info window will fire another ajax request to fetch weather information.
6. Weather information is fetched from open weather api using the station name http://api.openweathermap.org/data/2.5/forecast/daily?q=Oakland,CA&mode=json&units=metric&cnt=7
7. Map is diplayed using google maps and the coordinates of the stations are fetched using the bart api and marked on the map.
8. Filter the fetched bart stations both on the map and the list using the text field and hitting on enter key or filter button.
