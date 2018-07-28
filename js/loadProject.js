var urlParams = new URLSearchParams(window.location.search)
var converter = new showdown.Converter()
converter.setFlavor('vanilla');
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
    var mdToHtml = converter.makeHtml(project.content)
    var html = $([
        '<h1 class="center">' + project.title + '</h1>',
        '<div id="project-body" class="center">',
            mdToHtml,
        '</div>',
    ].join("\n"))
    $('#loader-container').fadeOut().remove()
    $("#body-container").html(html).fadeIn();
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
        console.log('highlighted');
    });
})
