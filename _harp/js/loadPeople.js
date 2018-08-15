// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvT-MHFirRHd3ccQZ4J9w1nGGy-PqQ8oM",
    authDomain: "rise-labs-website.firebaseapp.com",
    databaseURL: "https://rise-labs-website.firebaseio.com",
    projectId: "rise-labs-website",
    storageBucket: "rise-labs-website.appspot.com",
    messagingSenderId: "368224713702"
};

var designationDict = {
    "PhD": "#phd-students",
    "Dual": "#dual-students",
    "M.Tech": "#mtech-students",
    "B.Tech": "#btech-students",
    "MS": "#ms-students",
    "Project Staff": "#project-associates",
};

firebase.initializeApp(config);
var database = firebase.database();
var databaseRef = database.ref('/members');

// Database Listener
databaseRef.once("value", function (snapshot) {
    var memberList = snapshot.val();
    console.log(memberList);
    var keys = Object.keys(memberList);
    for (var i = 0; i < keys.length; i++) {
        var _id = keys[i];
        console.log(memberList[_id]);
        addPersonToHTML(memberList[_id], _id);
    }
    $('#loader-container').fadeOut().remove();
    $("#people-container").fadeIn();
});

function addPersonToHTML(person, id) {
    var photo_url = getEmbeddablePhotoURL(person.photo_url);
    var html = $([
        '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">',
        '<div class="card bio-card">',
            '<div class="img-container-round center">',
                '<img src="' + photo_url + '" alt="profile picture">',
            '</div>',
            '<h1 class="center">' + person.name + '</h1>',
            '<h2 class="center">' + person.area_of_research + '</h2>',
            '<h3 class="center"><span style="color:#0c60d0">Guide : </span>' + person.guide + '</h3>',
            '<h3 class="center"><span style="color:#0c60d0">Lab : </span>' + person.lab_name + '</h3>',
            '<a class="btn btn-primary center" href="member.html?id=' + id + '" role="button">Learn more</a>',
            // <a class="btn btn-primary" href="#" role="button">Bio</a>
        '</div>',
        '</div>'
    ].join("\n"));
    var section = getSection(person.designation);
    console.log(section + " > .row");
    $(section + " > .row").append(html)
}

function getSection(designation){
    var section = designationDict[designation];
    return (section !== undefined)?section:"#other-members";
}

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