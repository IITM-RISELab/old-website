var urlParams = new URLSearchParams(window.location.search)
var converter = new showdown.Converter()
var id = urlParams.get('id')

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvT-MHFirRHd3ccQZ4J9w1nGGy-PqQ8oM",
    authDomain: "rise-labs-website.firebaseapp.com",
    databaseURL: "https://rise-labs-website.firebaseio.com",
    projectId: "rise-labs-website",
    storageBucket: "rise-labs-website.appspot.com",
    messagingSenderId: "368224713702"
    }
firebase.initializeApp(config)
var database = firebase.database()
var databaseRef = database.ref('/projects')

databaseRef.child(id).once('value').then(function(snapshot){
    var project = snapshot.val()
    var mdToHtml = converter.makeHtml(project.text)
    var html = $([
        '<div id="project-container" class="center">',
            '<h1 class="project-title center">' + project.title + '</h1>',
                '<div class="project-body">',
                mdToHtml,
                '</div>',
            '</div>',
        '</div>'
    ].join("\n"))
    $('#loader-container').fadeOut().remove()
    $("#body-container").html(html).fadeIn();
})