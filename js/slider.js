document.querySelectorAll(".slide-container").forEach((container, index) => {
  const containerClass = container.classList[1];
  const idNumber = containerClass.match(/\d+/)[0];

  new Swiper(`.${containerClass}`, {
    slidesPerView: 4,
    spaceBetween: 10,
    sliderPerGroup: 6,
    touchEventsTarget: 'container',
    loop: true,
    centerSlide: "true",
    effect: 'slide',
    grabCursor: "true",
    freeMode: true,
    navigation: {
      nextEl: `.swiper-button-next${idNumber}`,
      prevEl: `.swiper-button-prev${idNumber}`,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      300: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      400: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      450: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      1224: {
        slidesPerView: 7,
        spaceBetween: 20,
      },
    },
  });
});

const swiperContainer = document.querySelector('.slide-container45');
const nextButton = document.querySelector('.swiper-button-next45');
const prevButton = document.querySelector('.swiper-button-prev45');

const observer = new MutationObserver(() => {
  const slides = swiperContainer.querySelectorAll('.swiper-slide');
  if (slides.length > 1) {
    new Swiper('.slide-container45', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      touchEventsTarget: 'container',
      effect: 'slide',
      grabCursor: true,
      initialSlide: 0,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-button-next45',
        prevEl: '.swiper-button-prev45',
      },
      breakpoints: {
        0: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
        300: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
      },
    });

    nextButton.style.display = 'block';
    prevButton.style.display = 'block';
  } else {
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
  }

  observer.disconnect();
});

observer.observe(swiperContainer, { childList: true, subtree: true });
