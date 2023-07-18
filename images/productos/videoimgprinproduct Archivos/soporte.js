/* $(document).on('ready', function () {
    $(".soporte-tv__container").slick({
        dots: false,
        infinite: false,
        settings: "unslick",
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 890,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            }
        ]
    });
}); */

 // tab 3
 $(document).ready(function () {
    $(window).resize(function () {
        cambio();
    });
  
    cambio();
  
    function cambio() {
        if ($(window).width() <= 1100) {
            $('.soporte-tv__container').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 890,
                        settings: {
                            arrows: false,
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: false,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 1100,
                        settings: {
                            arrows: false,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: false,
                            dots: true
                        }
                    }
                ]
            });
        }
        else { if ($('.soporte-tv__container').hasClass("slick-initialized")) { $('.soporte-tv__container').slick("unslick") } }
    }
  });
  


$(document).on('click', '.js-link--soporte', function (e) {
    let url = $(this).data('url');
    let label = $(this).attr('data-label');
    window.open(url, '_blank');
    dataLayer.push({
        'event': 'trackEvent',
        'eventCategory': 'Movistar - Movistar TV - Soporte',
        'eventAction': 'Click Movistar TV - Soporte',
        'eventLabel': 'Click ' + label,
    });
});