const buildSwiperSlider = sliderElm => {
  const sliderIdentifier = sliderElm.dataset.id;
  return new Swiper(`#${sliderElm.id}`, {
    navigation: {
      nextEl: `.swiper-button-next-${sliderIdentifier}`,
      prevEl: `.swiper-button-prev-${sliderIdentifier}`
    },
    pagination: {
      el: `.swiper-pagination-${sliderIdentifier}`,
      type: 'progressbar',
    },
  });
}

const allSliders = document.querySelectorAll('.swiper');

allSliders.forEach(slider => buildSwiperSlider(slider));
