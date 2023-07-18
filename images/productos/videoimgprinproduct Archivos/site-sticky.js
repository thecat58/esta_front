$('.slidemenu').on('click', 'div a', function () {
    $(this).removeClass('active');
    $(this).addClass('active');
});
$(function () {
    $('.btn-group-fab').on('click', '.btnctrl', function () {
        $('.btn-group-fab').toggleClass('active');
        if ($('.btn-group-fab').hasClass('active')) {
            $('#group-fab__overlay').show();
        } else {
            $('#group-fab__overlay').hide();
        }
    });
    $('.js-gtm-fab').click(function (e) {
        e.preventDefault();
        $url = $(this).attr('data-url');
        dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': $(this).attr('data-category'),
            'eventAction': $(this).attr('data-action'),
            'eventLabel': $(this).attr('data-lable'),
        });
        if ($url && $url != '') window.open($url, '_blank');
    });
});
$(function () {
    $('.js-gtm-mob').click(function (e) {
        e.preventDefault();
        $url = $(this).attr('data-url');
        dataLayer.push({
            'event': 'trackEvent',
            'eventCategory': $(this).attr('data-category'),
            'eventAction': $(this).attr('data-action'),
            'eventLabel': $(this).attr('data-lable'),
        });
        if ($url && $url != '') window.open($url, '_blank');
    });
});