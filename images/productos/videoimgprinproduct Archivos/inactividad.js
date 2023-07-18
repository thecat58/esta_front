const modalInactividad = document.querySelector('.container_Inactividad');
const modalClose = document.querySelector('#inactivity_close');

(function ($) {
    let timeout;
    $(document).on('mousemove', function (event) {
        if (timeout !== undefined) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
            $(event.target).trigger('mouseMoveEnd');
            dataLayer.push({
                'event': 'trackEvent',
                'eventCategory': 'Popup abandono',
                'eventAction': 'Fibra',
                'eventLabel': 'activación',
            });
        }, 50000);
    });
}(jQuery));


// $(window).on("load", function() {
//     setTimeout(function() {
//         modalInactividad.style.display = 'flex'
//     }, 5000);
// });

$(document).on('mouseMoveEnd', function () {
    modalInactividad.style.display = 'flex'
});

modalClose.onclick = function(e) {
    modalInactividad.style.display = "none";
    let close = e.target;
    let modal = close.closest('.id-modal-inactivity');
    let call = modal.querySelector('.id-callback');
    if( !call.classList.contains('sendNumber-ok') ){
        dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': 'Popup llámame ahora',
            'eventAction': 'click::cerrar',
            'eventLabel': 'Fibra - Popup abandono',
        });
    }
}
  
window.onclick = function(event) {
    if (event.target == modalInactividad) {
        modalInactividad.style.display = "none";
    }
}

