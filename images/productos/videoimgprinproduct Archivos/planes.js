$(document).ready(function () {
    $(".plans-tv__container").slick({
      dots: false,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });
  $(document).on("click", ".js-link", function (e) {
    let url = $(this).data("url");
    let label = $(this).attr("data-label");
    window.open(url, "_blank");
    dataLayer.push({
      event: "trackEvent",
      eventCategory: "Movistar - Movistar TV",
      eventAction: "Click Movistar TV",
      eventLabel: "Click " + label,
    });
  });