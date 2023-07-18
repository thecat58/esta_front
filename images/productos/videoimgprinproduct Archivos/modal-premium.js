$(document).on("click", ".js-modal-parrilla-premium", function (e) {
    e.preventDefault();
    let label = $(this).attr("data-label");

    $(".modal-premium").hide();
    $("#modal-parrilla-premium").show();
    dataLayer.push({
      event: "trackEvent",
      eventCategory: "Movistar - Movistar TV",
      eventAction: "Click Movistar TV",
      eventLabel: "Click " + label,
    });
  });

  let modal_premium = document.getElementById("modal-parrilla-premium");
  function hideModalActivar() {
    if (event.target === modal_premium) {
      $("#modal-parrilla-premium").hide();
    }
  }
  window.addEventListener("click", hideModalActivar);
  $("#modal-parrilla-premium")
    .find($(".modal-premium__close"))
    .on("click", function () {
      $("#modal-parrilla-premium").hide();
    });

  $(".modal-premium-desk__tablink").on("click", function () {
    let tabContentToShow = $(this).data("id");
    let label = $(this).data("label");

    $(".modal-premium-desk__tabcontent").hide();
    $("#parrilla-premium__" + tabContentToShow).show();
    $(".modal-premium-desk__tablink").removeClass("active");
    $(this).addClass("active");

    dataLayer.push({
      event: "trackEvent",
      eventCategory: "Movistar - Movistar TV",
      eventAction: "Click tabs Guía de canales Movistar Play",
      eventLabel: "Click " + label,
    });
  });

  let premium_acc = $("#modal-parrilla-premium").find($(".accordion-btn"));
  let premium_paneles = $("#modal-parrilla-premium").find($(".panel"));

  premium_acc.on("click", function () {
    let panel = $(this).next();
    premium_paneles.slideUp();
    premium_acc.removeClass("active");

    if (panel.hasClass("active")) {
      premium_paneles.removeClass("active");
      panel.slideUp();
    } else {
      panel.addClass("active");
      $(this).addClass("active");
      panel.slideDown();
    }

    let category = $(this).data("category");
    let label = $(this).data("label");
    dataLayer.push({
      event: "trackEvent",
      eventCategory: "Movistar - Movistar TV",
      eventAction: "Click tabs Guía de canales " + category,
      eventLabel: "Click " + label,
    });
  });