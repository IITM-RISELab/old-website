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
    if(announcementList != null){
        var keys = Object.keys(announcementList)
        for (var i = 0; i < keys.length; i++) {
            console.log(keys[i])
            var key = keys[i]
            addAnnouncementToHTML(announcementList[key], key)
        }
    }else{
        $("#announcements-container")
        .html('<h2 style="text-align:center" class="center"><strong>No recent announcements</strong></h2>');
    }
    $('#loader-container-small').fadeOut().remove()
    $("#announcements-container").fadeIn();
});

function addAnnouncementToHTML(announcement, id) {
    var html = $([
        '<div class="card announcement-card">',
            '<h1>' + announcement.title +  '</h1>',
            '<h2>' + announcement.date + '</h2>',
            '<p>' + announcement.content +'</p>',
        '</div>'
    ].join("\n"))
    $("#announcements-container").prepend(html)
}