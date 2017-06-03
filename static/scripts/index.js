$(document).ready(function() {

    // Nav starts at bottom then is fixed to top
    // Logo and hamburger menus fade in and out
    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();
        if( scrollPosition > $(this).height() - $("nav").height() ) {
            $("nav").addClass("nav-fixed");
            $("nav > div.logo").css('visibility','visible').fadeIn();
            $("nav > div.nav-toggle").css('visibility','visible').fadeIn();
        } else {
            $("nav").removeClass("nav-fixed");
            $("nav > div.logo").css('visibility','hidden').fadeOut();
            $("nav > div.nav-toggle").css('visibility','hidden').fadeOut();
        }
    });

    Typed.new('.rotating-titles', {
        strings: ["Technologist.", "Entrepreneur.", "Systems Architect.",
            "Leader.", "Curious.", "Passionate.", "Driven.", "Gritty.",
            "Enthusiastic.", "Developer.", "Team Player.", "Innovative."
        ],
        typeSpeed: 75,
        loop: true,
        shuffle: true
    });

    // Full screen nav open on click
    $(".nav-icon").click(function(){
        $(".nav-full").toggleClass("active");
        $("main").toggleClass("active");
        $(this).find("img").toggle();
    });

    // Full screen nav close on click
    $(".nav-full").find("a").click(function(){
        $(".nav-full").toggleClass("active");
        $("main").toggleClass("active");
        $(".nav-icon").find("img").toggle();
    });

    // Highlight.js initialization
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
    var isWindows = /windows phone/i.test(navigator.userAgent.toLowerCase());
    var isBlackberry = /blackberry/i.test(navigator.userAgent.toLowerCase());
    var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());

    if(isAndroid || isWindows || isBlackberry || isiDevice){
        $('.overlay').on('click', function(){
            $('.overlay').fadeTo(0, 0);
             $(this).fadeTo('fast', 1);
        });
    }else{
        $('.overlay').mouseenter(function(){
             $(this).fadeTo('fast', 1);
        });
        $('.overlay').mouseleave(function(){
             $(this).fadeTo('fast', 0);
        });
    }
});

// Mobile browsers viewport height bug fix
function fullMobileViewport() {
    var HEIGHT_CHANGE_TOLERANCE = 100; // Approximately URL bar height in Chrome
    var element = $(this);
    var viewportHeight = $(window).height();

    $(window).resize(function () {
        if (Math.abs(viewportHeight - $(window).height()) > HEIGHT_CHANGE_TOLERANCE) {
            viewportHeight = $(window).height();
            update();
        }
    });

    function update() {
        element.css("height", viewportHeight + "px");
    }

    update();
}
$("header").each(fullMobileViewport);
