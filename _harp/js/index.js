$( "#btn-know-more" ).bind( "click", function() {
    $("#welcome-container").fadeOut( 300 );
    $("canvas#intro-canvas").css('display','none');
    $("#about-container").delay(500).fadeIn();
});

$( "#btn-back" ).bind( "click", function() {
    $("#about-container").fadeOut( 300 );
    $("canvas#intro-canvas").css('display','block');
    $("#welcome-container").delay(500).fadeIn();
});