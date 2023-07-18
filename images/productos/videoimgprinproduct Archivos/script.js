 $(document).ready(function () {
    $(window).resize(function () {
        cambio();
    });
  
    cambio();
  
    function cambio() {
        if ($(window).width() <= 1100) {
            $('.channels-tv__container').not('.slick-initialized').slick({
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
        else { if ($('.channels-tv__container').hasClass("slick-initialized")) { $('.channels-tv__container').slick("unslick") } }
    }
  });
  


/* $(document).on('click', '.js-link--soporte', function (e) {
    let url = $(this).data('url');
    let label = $(this).attr('data-label');
    window.open(url, '_blank');
    dataLayer.push({
        'event': 'trackEvent',
        'eventCategory': 'Movistar - Movistar TV - Soporte',
        'eventAction': 'Click Movistar TV - Soporte',
        'eventLabel': 'Click ' + label,
    });
}); */