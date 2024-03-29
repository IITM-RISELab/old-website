// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvT-MHFirRHd3ccQZ4J9w1nGGy-PqQ8oM",
    authDomain: "rise-labs-website.firebaseapp.com",
    databaseURL: "https://rise-labs-website.firebaseio.com",
    projectId: "rise-labs-website",
    storageBucket: "rise-labs-website.appspot.com",
    messagingSenderId: "368224713702"
};
firebase.initializeApp(config);
var database = firebase.database()
var databaseRef = database.ref('/projects')

// Database Listener
databaseRef.once("value", function (snapshot) {
    var projectList = snapshot.val();
    if (projectList != null) {
        var keys = Object.keys(projectList)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            addProjectToHTML(projectList[key], key)
        }
    } else {
        $('#projects-container').html('<h2 style="text-align:center" class="center"><strong>Nothing to show</strong></h2>');
    }
    $('#loader-container').fadeOut().remove()
    $("#projects-container").fadeIn();
});

function addProjectToHTML(project, id) {
    var html = $([
        '<div class="card-container center col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">',
        '<div class="card">',
        '<div class="card-body">',
        '<h1 class="center">' + project.title + '</h2>',
        '<h2 class="center"><span style="color:#38b538" >Incharge : </span>' + project.faculty + '</h4>',
        '<h2 class="center"><span style="color:#38b538" >Status : </span>' + project.status + '</h4>',
        '<a class="btn btn-primary center" href="project.html?id=' + id + '" role="button">Learn more</a>',
        '</div>',
        '</div>',
        '</div>'
    ].join("\n"))
    $("#projects-list").prepend(html)
}