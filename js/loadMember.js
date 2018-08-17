var urlParams = new URLSearchParams(window.location.search)
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
var databaseRef = database.ref('/members')

databaseRef.child(id).once('value').then(function(snapshot){
    var person = snapshot.val()
    var photo_url = getEmbeddablePhotoURL(person.photo_url);
    var html = $([
        '<h1 class="center">About me</h1>',
        '<div class="card member-card center">',
            '<div class="img-container-round center">',
                '<img src="' + photo_url + '" alt="profile picture">',
            '</div>',
            '<h2 class="center">' + person.name + '</h2>',
            '<h3 class="center">' + person.area_of_research + '</h3>',
            '<h4 class="center" style="color:blue"> Guide: ' + person.guide + '</h4>',
            '<h5 class="center" style="color:#E74C3C"> Lab: ' + person.lab_name + '</h5>',
            '<p class="center" >' + person.bio + '</p>',
            '<a class="btn btn-info center" href="' + person.bio_url + '" role="button">Portfolio</a>',
        '</div>'
    ].join("\n"))
    $('#loader-container').fadeOut().remove()
    $("#member-container").html(html).fadeIn();
});

function getEmbeddablePhotoURL(url){
    var regex = new RegExp("https:\/\/drive.google.com\/file\/d\/([a-zA-Z0-9-_]+)");
    var match = regex.exec(url);
    var embeddableLink = null;
    if(match !== null)
        embeddableLink = 'https://drive.google.com/uc?id=' + match[1];
    else
        embeddableLink = "https://raw.githubusercontent.com/AkshayRaman97/iitm-riselab-dev.github.io/master/_harp/assets/dummy-profile.jpeg"
    return(embeddableLink);
}
