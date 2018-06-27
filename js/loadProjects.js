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
databaseRef.on("child_added", function(snapshot) {
    var newProject = snapshot.val();
    console.log('child added : ' + newProject)
    addProjectToHTML(newProject,snapshot.key)
});

// Click Listener

function addProjectToHTML(project,id){
    // console.log(project)
    var html = $([
        '<div class="card mx-auto">',
            '<div class="card-body">',
                '<h4 class="card-title">'+ project.title +'</h4>',
                '<p class="card-text">' + project.description + '</p>',
                '<a href="project.html?id=' + id + '" class="btn btn-primary">Learn More</a>',
            '</div>',
        '</div>',
    ].join("\n"))
    $(".projects-container").hide().prepend(html).fadeIn()
}