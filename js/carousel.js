"use strict";
// [---Swiper Carousel Settings---]
const swiper = new Swiper(".swiper-container", {
  slidesPerView: "auto",
  spaceBetween: 30,
  centeredSlides: true,
  lazy: true,
  mousewheel: true,
  grabCursor: true,
  on: {
    init: function () {
      $(".swiper-slide-prev").prevAll().addClass("swiper__all-prev");
      $(".swiper-slide-next").nextAll().addClass("swiper__all-next");
    }
  },
  keyboard: {
    enabled: true
  }
});
// if slide changes, refresh class names
swiper.on("transitionEnd", function () {
  $(".swiper__all-next").removeClass("swiper__all-next");
  $(".swiper__all-prev").removeClass("swiper__all-prev");
  $(".swiper-slide-prev").prevAll().addClass("swiper__all-prev");
  $(".swiper-slide-next").nextAll().addClass("swiper__all-next");
  $(".swiper-slide-next").removeClass("swiper__all-next");
  $(".swiper-slide-prev").removeClass("swiper__all-prev");
});
/// Vibrant [--Color Picker from Images--]
function processColors(img) {
  let vibrant = new Vibrant(img, 40, 10);
  let swatches = vibrant.swatches();
  let globPopul = 0;
  let populColor = "rgb(0,0,0)";
  //find popular colors
  $.each(swatches, function (color, colorVal) {
    if (colorVal != undefined) {
      if (colorVal.population > globPopul) {
        globPopul = colorVal.population;
        populColor = `rgb(${colorVal.rgb[0]},${colorVal.rgb[1]},${colorVal.rgb[2]})`;
      }
      else {
        return 1;
      }
    }
    else {
      return 1;
    }
  });
  let res = {
    side: populColor,
    light: swatches["Vibrant"].getHex()
  };
  return res;
}
// [--images for color picker--]
let $cardsimg = $(".cube__face--front > .poster > img");
// [--add vibrant colors--]
$cardsimg.each(function (index) {
  $(this)
    .get(0)
    .addEventListener("load", function () {
      $(this)
        .parent()
        .parent()
        .nextAll()
        .children()
        .css("background-color", processColors($(this).get(0)).side);
      $(this)
        .parent()
        .nextAll()
        .children()
        .css("background-color", processColors($(this).get(0)).light); //info block bg
      $(this)
        .parent()
        .parent()
        .parent()
        .css("box-shadow", "0 0 300px 70px " + processColors($(this).get(0)).light); //light
    });
});
