for (let i = 1; i < 45; i++) {
  new Swiper(".slide-container"+i, {
    slidesPerView: 4,
    spaceBetween: 5,
    sliderPerGroup: 6,
    touchEventsTarget: 'container',
    loop: true,
    centerSlide: "true",
    effect: 'slide',
    grabCursor: "true",
    freeMode: true,
    navigation: {
      nextEl: '.swiper-button-next'+i,
      prevEl: '.swiper-button-prev'+i,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      350: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      450: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });

}
