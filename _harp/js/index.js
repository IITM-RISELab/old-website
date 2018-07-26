$( "#btn-know-more" ).bind( "click", function() {
    $("#welcome-container").fadeOut( 300 );
    $("canvas#intro-canvas").toggleClass("faded");
    $("#about-container").delay(500).fadeIn();
});

$( "#btn-back" ).bind( "click", function() {
    $("#about-container").fadeOut( 300 );
    $("canvas#intro-canvas").toggleClass("faded");
    $("#welcome-container").delay(500).fadeIn();
});