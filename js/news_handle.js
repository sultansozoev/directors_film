import { apiUrl } from '../api/config.js';

function fetchBlog(url, container) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(request => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog-slider__item', 'swiper-slide');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('blog-slider__img');
        const img = document.createElement('img');
        img.src = request.background_image;
        imgDiv.appendChild(img);

        const blogContent = document.createElement('div');
        blogContent.classList.add('blog-slider__content');

        const spanContent = document.createElement('span');
        const date = new Date(request.added_date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        spanContent.innerHTML = `${day}/${month}/${year}, ${request.username}`;
        spanContent.classList.add('blog-slider__code');

        const title = document.createElement('div');
        title.innerHTML = request.title;
        title.classList.add('blog-slider__title');

        const text = document.createElement('div');
        text.innerHTML = request.description;
        text.classList.add('blog-slider__text');

        blogContent.appendChild(spanContent);
        blogContent.appendChild(title);
        blogContent.appendChild(text);
        blogDiv.appendChild(imgDiv);
        blogDiv.appendChild(blogContent);
        container.appendChild(blogDiv);
      });

      setTimeout(() => {
        const swiper = new Swiper('.blog-slider', {
          spaceBetween: 30,
          effect: 'fade',
          loop: true,
          mousewheel: {
            invert: false,
          },
          pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
          }
        });

        swiper.update();
      }, 0);

    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

const container = document.getElementById('blog-slider');
const url = `${apiUrl}/getAllBlogs`;
fetchBlog(url, container);
