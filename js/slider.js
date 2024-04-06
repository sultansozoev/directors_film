for (let i = 1; i < 14; i++) {
  new Swiper(".slide-container"+i, {
    slidesPerView: 4,
    spaceBetween: 5,
    sliderPerGroup: 6,
    dynamicBullets: true,
    loop: true,
    centerSlide: "true",
    touchEventsTarget: 'container',
    fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination"+i,
      dynamicBullets: true,
      loop: true
    },
    navigation: {
      nextEl: '.swiper-button-next'+i,
      prevEl: '.swiper-button-prev'+i,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
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
