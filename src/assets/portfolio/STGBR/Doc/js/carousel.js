$(document).ready(function () {
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  $(".next-btn").click(function () {
    owl.trigger("next.owl.carousel");
  });

  $(".prev-btn").click(function () {
    owl.trigger("prev.owl.carousel", [300]);
  });
});
