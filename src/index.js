import './css/styles.css'; 

import fetchPhoto from "./services/api-service";


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallary: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

let searchQuery = '';
let page = 1;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {

    e.preventDefault();

    //при submit form -> сохранять текущее значение input
    searchQuery = e.currentTarget.elements.searchQuery.value;

    fetchPhoto(searchQuery, page)
        .then(data => {
            console.log(data)
            refs.gallary.innerHTML = createMarkupCard(data.hits);
        })
    }
    


function onLoadMore() { }

const createMarkupCard = (data) => {

    return data.map(({ id, webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        
        `<div class='item card' id='${id}'>
            <a class="gallery__item" href="${webformatURL}">
                <img class="gallery-image" src="${largeImageURL}" alt="${tags}" />
            </a>
            <ul class='category-list'>
                <li class='catebory-item'>
                    <p class='category'>Likes</p>
                    <p class='category-value'>${likes}</p>
                </li>
                <li class='catebory-item'>
                    <p class='category'>Views</p>
                    <p class='category-value'>${views}</p>
                </li>
                <li class='catebory-item'>
                    <p class='category'>Comments</p>
                    <p class='category-value'>${comments}</p>
                </li>
                <li class='catebory-item'>
                    <p class='category'>Downloads</p>
                    <p class='category-value'>${downloads}</p>
                </li>
            </ul>
        </div>`,
    )
    .join('');

}



// настройки с библиотеки  SimpleLightbox
// new SimpleLightbox('.gallery a', {

//     captionsData: 'alt', //получить заголовок из данного атрибута
//     captionDelay: 250    //задержка перед отображением подписи

// });
// console.log(galleryItems);