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
var databaseRef = database.ref('/announcements')

// Database Listener
databaseRef.once("value", function (snapshot) {
    var announcementList = snapshot.val();
    var keys = Object.keys(announcementList)
    for (var i = 0; i < keys.length; i++) {
        console.log(keys[i])
        var key = keys[i]
        addAnnouncementToHTML(announcementList[key], key)
    }
    $('#loader-container').fadeOut().remove()
    $("#announcements-list").fadeIn();
});

function addAnnouncementToHTML(announcement, id) {
    var html = $([
        '<div class="card announcement-card">',
            '<h1>' + announcement.title +  '</h1>',
            '<h2> By: ' + announcement.author + '</h2>',
            '<p>' + announcement.info +'</p>',
            '<h2>' + announcement.date + '</h2>',
        '</div>'
    ].join("\n"))
    $("#announcements-container").prepend(html)
}