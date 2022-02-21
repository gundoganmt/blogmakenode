(function ($) {
    "use strict";

    $(document).ready(function () {
        // owl Carousel
        $(".slider").owlCarousel({
            loop: true,
            margin: 20,
            animateOut: "fadeOut",
            autoWidth: true,
            responsiveClass: true,
            autoplay: true,
            slideBy: 3,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 2,
                },
                1600: {
                    items: 3,
                },
            },
        });

        // heightlight Carousel
        $(".hl-casousel").owlCarousel({
            loop: true,
            margin: 10,
            animateOut: "fadeOut",
            autoHeight: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                750: {
                    items: 2,
                },
                1000: {
                    items: 3,
                },
                1400: {
                    items: 3,
                },
                1600: {
                    items: 4,
                },
            },
        });

        // full-width-slider

        $(".full-width-slider").owlCarousel({
            loop: true,
            margin: 10,
            animateOut: "fadeOut",
            autoHeight: false,
            margin: 30,
            autoplay: false,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            responsiveClass: true,

            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                    center: true,
                },
                1000: {
                    items: 1,
                },
                1600: {
                    items: 1,
                },
            },
        });
    });
    // testimonials
    $(".testimonials-cards").owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            750: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1400: {
                items: 3,
            },
            1600: {
                items: 4,
            },
        },
    });

    // magnefic pop-up
    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    $(".popup-gallery").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return (
                    item.el.attr("title") +
                    "<small>by Marsel Van Oosten</small>"
                );
            },
        },
    });
})(jQuery);

// Vanilla Js

// nav-bar
let heroNav = document.querySelector(".hero-nav");
let menu = document.querySelector("#menu-bars");

menu.onclick = () => {
    menu.classList.toggle("fa-times");
    heroNav.classList.toggle("active");
};

window.onload = function (e) {
    if (document.getElementById("defaultOpen") != null) {
        str = document.getElementById("defaultOpen").click();
    }
    if (document.getElementById("defaultOpen2") != null) {
        str = document.getElementById("defaultOpen2").click();
    }
    if (document.getElementById("defaultOpen3") != null) {
        str = document.getElementById("defaultOpen3").click();
    }
};

// tab-1
function tabSection(evt, content) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(content).style.display = "block";
    evt.currentTarget.className += " active";
}
// tab-2
function tabSection2(evt, content) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(content).style.display = "block";
    evt.currentTarget.className += " active";
}
// tab-3
function tabSection3(evt, content) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent3");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks3");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(content).style.display = "block";
    evt.currentTarget.className += " active";
}

// full screen search bar
function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
}

// Subscribe overlay
function openSubs() {
    document.getElementById("subscribeOverlay").style.display = "block";
}

function closeSubs() {
    document.getElementById("subscribeOverlay").style.display = "none";
}