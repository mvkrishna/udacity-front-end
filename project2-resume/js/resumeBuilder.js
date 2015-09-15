// Bio Information in JSON format
var bio = {
    "name": "Krishna Madireddy",
    "role": "Software Engineer",
    "contacts": {
        "mobile": "000-000-0000",
        "email": "krishna@madireddy.net",
        "github": "mvkrishna",
        "twitter": "@mvkrishna",
        "location": "San Jose, California"
    },
    "welcomeMessage": "Welcome to my world!",
    "skills": ["Java", "Javascript", "Java/J2EE", "Objective-C", "WebObjects", "Eclipse", "Spring", "Hibernate"],
    "biopic": "images/logo.jpeg"
};
//Render bio information in the screen
bio.display = function() {
    var headerName = HTMLheaderName.replace("%data%", bio.name);
    var headerRole = HTMLheaderRole.replace("%data%", bio.role);
    var contactsMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var contactsEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var contactsGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var contactsTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var contactsLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    var displayWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    var displayImage = HTMLbioPic.replace("%data%", bio.biopic);

    $("#header").prepend(headerRole);
    $("#header").prepend(headerName);
    $("#header").append(displayImage);
    $("#header").append("<br>");
    $("#header").append(displayWelcomeMsg);
    $("#header").append("<br>");
    $("#topContacts").append(contactsEmail);
    $("#topContacts").append(contactsGithub);
    $("#topContacts").append(contactsMobile);
    $("#topcontacts").append(contactsTwitter);
    $("#topContacts").append(contactsLocation);
    $("#footerContacts").append(contactsEmail);
    $("#footerContacts").append(contactsGithub);
    $("#footerContacts").append(contactsMobile);
    $("#footercontacts").append(contactsTwitter);
    $("#footerContacts").append(contactsLocation);
    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (var skill in bio.skills) {
            var formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
            $("#skills").append(formattedSkill);
        }
    }
}


    // Education Information in JSON format
var education = {
    "schools": [{
        "name": "Osmania University",
        "location": "Hyderabad, Andhra Pradesh",
        "degree": "Masters of Science in Information Systems",
        "majors": ["Information Systems"],
        "dates": "2004",
        "url": "http://www.osmania.in"
    }, {
        "name": "Osmania University",
        "location": "Hyderabad, Andhra Pradesh",
        "degree": "Bachelor of Computer Applications",
        "majors": ["Computer Applications"],
        "dates": "2008",
        "url": "http://www.osmania.in"
    }],
    "onlineCourses": [

        {
            "title": "Front-End Developer Nanodegree",
            "school": "Udacity",
            "dates": "In progress",
            "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        }, {
            "title": "Full Stack Developer Nanodegree",
            "school": "Udacity",
            "dates": "2015",
            "url": "https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004",
        },
    ]
};
//Render eduction information  in the screen
education.display = function() {
    for (var school in education.schools) {
        // create new div for education
        $("#education").append(HTMLschoolStart);
        var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
        formattedSchoolName = formattedSchoolName.replace("#", education.schools[school].url);
        var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        var formattedSchoolNameDegree = formattedSchoolName + formattedSchoolDegree;
        $(".education-entry:last").append(formattedSchoolNameDegree);
        var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
        $(".education-entry:last").append(formattedSchoolDates);
        var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        $(".education-entry:last").append(formattedSchoolLocation);
        var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors);
        $(".education-entry:last").append(formattedSchoolMajor);
    }

    if (education.onlineCourses.length > 0) {
        $("#education").append(HTMLonlineClasses);

        for (var course in education.onlineCourses) {
            $("#education").append(HTMLschoolStart);
            var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
            formattedOnlineTitle = formattedOnlineTitle.replace("#", education.onlineCourses[course].url);
            var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
            var formattedOnlineTitleSchool = formattedOnlineTitle + formattedOnlineSchool;
            $(".education-entry:last").append(formattedOnlineTitleSchool);
            var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
            $(".education-entry:last").append(formattedOnlineDates);
            $(".education-entry:last").append("<br>");

        }
    }
};

// work information in JSON format
var work = {
    "jobs": [{
        "employer": "General Electric",
        "title": "Lead Software Engineer",
        "location": "San Ramon, California",
        "dates": "2014-present",
        "website": "http://wwww.ge.com",
        "description": "Design and developing Web & Mobile applications."
    }, {
        "employer": "Exilant Technologies",
        "title": "Systems Analyst",
        "location": "Cupertino, California",
        "dates": " 2008-2014",
        "website": "http://www.exilant.com",
        "description": "Design and developing Web & Mobile applications."
    }, {
        "employer": "Effigent Inc.,",
        "title": "Senior Programmer",
        "location": "Cupertino, California",
        "dates": " 2004-2008",
        "website": "http://www.effigent.com",
        "description": "Developing web applications"
    }]
};

//Render work information in the screen
work.display = function() {
        for (job in work.jobs) {
            $("#workExperience").append(HTMLworkStart);
            var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
            formattedEmployer = formattedEmployer.replace("#", work.jobs[job].website);
            var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title)
            var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
            var formattedEmployerTitle = formattedEmployer + formattedTitle + formattedLocation;
            var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
            var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

            $(".work-entry:last").append(formattedEmployerTitle);
            $(".work-entry:last").append(formattedDates);
            $(".work-entry:last").append(formattedDescription);
        }
    }
// Projects Information in JSON format
var projects = {
    "projects": [{
            "title": "Movie Trailer",
            "dates": "2015",
            "description": "Favorite movies website",
            "images": ["images/movie-trailer.png"]
        }, {
            "title": "Catalog",
            "dates": "2015",
            "description": "Catalog application",
            "images": ["images/catalog.png"]
        }, {
            "title": "Conference central",
            "dates": "2015",
            "description": "Conference management application",
            "images": ["images/conference.jpg"]
        },

    ]
};

//Render projects information  in the screen
projects.display = function() {
    for (var project in projects.projects) {
        var displayProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
        var displayProjectDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
        var displayProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(displayProjectTitle);
        $(".project-entry:last").append(displayProjectDates);
        $(".project-entry:last").append(displayProjectDescription);

        if (projects.projects[project].images.length > 0) {
            for (var image in projects.projects[project].images) {
                var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
                $(".project-entry:last").append(formattedImage);
            }
        }
    }
}

//Locationizer for GoogleMap
function locationizer(work_obj) {
    var locationArray = [];
    for (job in work_obj.jobs) {
        var newLocation = work_obj.jobs[job].location;
        locationArray.push(newLocation);
    }
    return locationArray;
}

//Internationalizer Uppercase
function inName() {
    var name1 = bio.name.trim().split(" ");
    name1[0] = name1[0].slice(0, 1).toUpperCase() + name1[0].slice(1).toLowerCase();
    name1[1] = name1[1].toUpperCase();
    return name1[0] + " " + name1[1];
}

//Print document click locationin console
$(document).click(function(loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x, y);
});

//Call render methods to display all the data
bio.display();
work.display();
education.display();
projects.display();

$("#mapDiv").append(googleMap);
$('#footerContacts').append(internationalizeButton);
