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
databaseRef.once("value", function(snapshot) {
    var projectList = snapshot.val();
    console.log(projectList)
    var keys = Object.keys(projectList)
    for(var i=0;i<keys.length;i++){
        console.log(keys[i])
        var key = keys[i]
        addProjectToHTML(projectList[key],key)
    }
    $('#loader-container').fadeOut().remove()
    $("#projects-container").fadeIn();
});

function addProjectToHTML(project,id){
    var html = $([
        '<div class="card mx-auto">',
            '<div class="card-body">',
                '<h2 class="heading2 center">'+ project.title +'</h2>',
                '<p class="card-text center">' + project.info + '</p>',
                '<a href="project.html?id=' + id + '" class="button-link center">',
                    '<button class="button center">',
                        'Learn more',
                    '</button>',
                '</a>',
            '</div>',
        '</div>',
    ].join("\n"))
    $("#projects-list").prepend(html)
}