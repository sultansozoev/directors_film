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
        blogDiv.classList.add('blog-container');
        const blogHeader = document.createElement('div');
        blogHeader.classList.add('blog-header');

        const blogCover = document.createElement('div');
        blogCover.classList.add('blog-cover');
        blogCover.style.background = `url("${request.background_image}") no-repeat center center`;
        blogCover.style.backgroundSize = 'cover';
        blogCover.style.borderRadius = '10% 10% 0 0';
        blogCover.style.height = '35rem';
        blogCover.style.boxShadow = 'inset rgba(0, 0, 0, 0.2) 0 64px 64px 16px';
        const blogAuthor = document.createElement('div');
        blogAuthor.classList.add('blog-author');

        const avatar = document.createElement('div');
        avatar.style.background = `url("${request.image}") no-repeat center center`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.width = "32px";
        avatar.style.height = "32px";
        avatar.style.borderRadius = "50%";
        avatar.style.marginRight = "0.5rem";
        avatar.style.display = "inline-block";
        avatar.style.verticalAlign = "middle";

        const author = document.createElement('h3');
        author.innerText = request.username;
        author.style.display = "inline-block";
        author.style.verticalAlign = "middle";

        blogAuthor.append(avatar, author);
        blogCover.append(blogAuthor);
        blogHeader.append(blogCover);

        const blogBody = document.createElement('div');
        blogBody.classList.add('blog-body');
        const blogTitle = document.createElement('div');
        blogTitle.classList.add('blog-title');
        let title = document.createElement('h2');
        title.classList.add('py-3');
        title.innerText = request.title;
        blogTitle.append(title);
        const blogSummary = document.createElement('div');
        blogSummary.classList.add('blog-summary');
        let summary = document.createElement('p');
        summary.innerText = request.description;
        blogSummary.append(summary);
        blogBody.append(blogTitle);
        blogBody.append(blogSummary);

        const blogFooter = document.createElement('div');
        blogFooter.classList.add('blog-footer', 'pt-3');

        const ul = document.createElement('ul');
        const date = document.createElement('li');
        date.classList.add('published-date');
        const dateConverted = new Date(request.added_date);
        date.innerHTML = `${dateConverted.getDate().toString().padStart(2, '0')}/${(dateConverted.getMonth() + 1).toString().padStart(2, '0')}/${dateConverted.getFullYear()}`;

        const editButton = document.createElement('li');
        editButton.classList.add('shares');

        const svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgEdit.setAttribute("class", "icon-edit");
        svgEdit.setAttribute("width", "24");
        svgEdit.setAttribute("height", "24");
        svgEdit.setAttribute("viewBox", "0 0 1024 1024");
        const useEdit = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useEdit.setAttribute("href", "#icon-edit");
        svgEdit.appendChild(useEdit);
        editButton.append(svgEdit);
        svgEdit.style.display = 'none';

        const svgSave = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgSave.setAttribute("class", "icon-save");
        svgSave.setAttribute("width", "24");
        svgSave.setAttribute("height", "24");
        svgSave.setAttribute("viewBox", "0 0 1024 1024");
        const useSave = document.createElementNS("http://www.w3.org/2000/svg", "use");
        useSave.setAttribute("href", "#icon-save");
        svgSave.appendChild(useSave);
        editButton.append(svgSave);
        svgSave.style.display = 'none';

        ul.append(date);
        ul.append(editButton);
        blogFooter.append(ul);
        blogDiv.append(blogHeader, blogBody, blogFooter);

        const user_id = getCookie("user");
        fetch(`${apiUrl}/isAdmin`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ user_id })
        })
          .then(response => response.json())
          .then(data => {

            if (data[0].admin === 1) {
              console.log(data)
              svgEdit.style.display = 'inline-block';
            }
          })
          .catch(error => {
            console.error('Error fetching films:', error);
          });

        svgEdit.addEventListener('click', () => {
          const titleInput = document.createElement('input');
          titleInput.value = title.innerText;
          titleInput.classList.add('blog-slider__title');

          const textArea = document.createElement('span');
          textArea.innerText = summary.innerText;
          textArea.contentEditable = "true";
          textArea.classList.add('blog-slider__text', 'textarea');

          blogTitle.replaceChild(titleInput, title);
          blogSummary.replaceChild(textArea, summary);

          title = titleInput;
          summary = textArea;

          svgSave.style.display = 'inline-block';
          svgEdit.style.display = 'none';
        });

        svgSave.addEventListener('click', () => {
          const newTitle = document.createElement('h2');
          newTitle.classList.add('blog-slider__title');
          newTitle.innerText = title.value;

          const newSummary = document.createElement('p');
          newSummary.classList.add('blog-slider__text');
          newSummary.innerText = summary.innerText;

          blogTitle.replaceChild(newTitle, title);
          blogSummary.replaceChild(newSummary, summary);

          title = newTitle;
          summary = newSummary;

          updateBlog(request.blog_id, title.innerText, summary.innerText);

          svgSave.style.display = 'none';
          svgEdit.style.display = 'inline-block';
        });


        container.appendChild(blogDiv);
      });
    })
    .catch(error => console.error('Errore nel recupero dei blog:', error));
}

function updateBlog(id, newTitle, newText) {
  fetch(`${apiUrl}/updateBlog`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blog_id: id, title: newTitle, description: newText })
  })
    .then(response => response.json())
    .then(data => {

    })
    .catch(error => console.error(`Errore durante l'aggiornamento:`, error));
}


const container = document.getElementById('container');
const url = `${apiUrl}/getAllBlogs`;
fetchBlog(url, container);
