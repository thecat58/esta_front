$(document).on('click', '.js-activar-online', function (e) {
    e.preventDefault();
    let modalPlan = $(this).data('plan');
    console.log(modalPlan);
    let label = $(this).attr('data-label');

    $('.modal-paquetes').show();
    $('.modal-paquetes__container').hide();
    $('#' + modalPlan).show();
    dataLayer.push({
        'event': 'trackEvent',
        'eventCategory': 'Movistar - Movistar TV',
        'eventAction': 'Click Movistar TV',
        'eventLabel': 'Click ' + label,
    });
});


let modal_activar = document.getElementById('modal--activar-online');

function hideModalActivar() {
    if (event.target === modal_activar) {
        $('#modal--activar-online').hide();
    }
}

window.addEventListener('click', hideModalActivar);
$('#modal--activar-online').find($('.modal-paquetes__close')).on('click', function () {
    $('#modal--activar-online').hide();
});