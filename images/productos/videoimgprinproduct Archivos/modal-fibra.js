$(document).on('click', '.js-modal-parrilla-fibra', function (e) {
    e.preventDefault();
    let label = $(this).attr('data-label');
  
    $('.modal-fibra').hide();
    $('#modal-parrilla-fibra').show();
    dataLayer.push({
        'event': 'trackEvent',
        'eventCategory': 'Movistar - Movistar TV',
        'eventAction': 'Click Movistar TV',
        'eventLabel': 'Click ' + label,
    });
  });
  
  let modal_fibra = document.getElementById('modal-parrilla-fibra');
  function hideModalActivar() {
    if (event.target === modal_fibra) {
        $('#modal-parrilla-fibra').hide();
    }
  }
  window.addEventListener('click', hideModalActivar);
  $('#modal-parrilla-fibra').find($('.modal-fibra__close')).on('click', function () {
    $('#modal-parrilla-fibra').hide();
  });
  
  $('.modal-fibra-desk__tablink').on('click', function () {
    let tabContentToShow = $(this).data('id');
    let label = $(this).data('label');
  
    $('.modal-fibra-desk__tabcontent').hide();
    $('#parrilla-fibra-tv__' + tabContentToShow).show();
    $('.modal-fibra-desk__tablink').removeClass("active");
    $(this).addClass("active");
  
    dataLayer.push({
        'event': 'trackEvent',
        'eventCategory': 'Movistar - Movistar TV',
        'eventAction': 'Click tabs Guía de canales Fibra TV',
        'eventLabel': 'Click ' + label,
    });
  });
  
  let fibra_acc = $('#modal-parrilla-fibra').find($(".accordion-btn"));
  let fibra_paneles = $('#modal-parrilla-fibra').find($(".panel"));
  
  fibra_acc.on('click', function () {
    let panel = $(this).next();
    fibra_paneles.slideUp();
    fibra_acc.removeClass("active");
  
    if (panel.hasClass("active")) {
        fibra_paneles.removeClass("active");
        panel.slideUp();
    } else {
        panel.addClass("active");
        $(this).addClass("active");
        panel.slideDown();
    }
  
    let category = $(this).data('category');
    let label = $(this).data('label');
    dataLayer.push({
        'event': 'trackEvent',
        'eventCategory': 'Movistar - Movistar TV',
        'eventAction': 'Click tabs Guía de canales ' + category,
        'eventLabel': 'Click ' + label,
    });
  });