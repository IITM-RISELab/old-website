// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvT-MHFirRHd3ccQZ4J9w1nGGy-PqQ8oM",
    authDomain: "rise-labs-website.firebaseapp.com",
    databaseURL: "https://rise-labs-website.firebaseio.com",
    projectId: "rise-labs-website",
    storageBucket: "rise-labs-website.appspot.com",
    messagingSenderId: "368224713702"
};

// var designationDict = {
//     "PhD": "#phd-students",
//     "Dual": "#dual-students",
//     "M.Tech": "#mtech-students",
//     "B.Tech": "#btech-students",
//     "MS": "#ms-students",
//     "Project Staff": "#project-associates",
// };

firebase.initializeApp(config);
var database = firebase.database();
var databaseRef = database.ref('/openings');

// Database Listener
databaseRef.once("value", function (snapshot) {
    var openingsList = snapshot.val();
    var keys = Object.keys(openingsList);
    for (var i = 0; i < keys.length; i++) {
        var _id = keys[i];
        console.log(openingsList[_id]);
        addOpeningToHTML(openingsList[_id], _id);
    }
    $('#loader-container').fadeOut().remove();
    $("#openings-container").fadeIn();
});

function addOpeningToHTML(opening, id) {
    skillSetList = '';
    for(var skill_id in opening.skills ){
        skillSetList += '<li>' + opening.skills[skill_id] + '</li>\n';
    }
    var html = $([
        '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">',
        '<div class="card opening-card">',
            '<h1 class="center">' + opening.title + '</h1>',
            '<h2>Summary</h2>',
            '<p class="center">' + opening.summary + '</p>',
            '<div class="skill-container">',
                '<h2>Skills required</h2>',
                '<ul>',
                    skillSetList,
                '</ul>',
            '</div>',
            '<a class="btn btn-primary center" href="contact.html?" role="button">Apply</a>',        '</div>',
        '</div>'
    ].join("\n"));
    $("#openings-container").prepend(html)
}