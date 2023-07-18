$('.js-franja-shop__btn').on('click', function (){
    dataLayer.push({
        'event': 'trackEvent',
        'eventCategory': 'Movistar - Movistar TV - Franja',
        'eventAction': 'Click - Compra ahora',
        'eventLabel': 'Descarga la App de Movistar TV',
    });
})