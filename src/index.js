// import './css/styles.css'; //TODO написать стили для формы

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
        
        `<div class='' id='${id}'>
            <a class="gallery__item" href="${webformatURL}">
                <img class="gallery__image" width ='50'src="${largeImageURL}" alt="${tags}" />
            </a>
            <ul class=''>
                <li>
                    <p>Likes</p>
                    <p>${likes}</p>
                </li>
                <li>
                    <p>Views</p>
                    <p>${views}</p>
                </li>
                <li>
                    <p>Comments</p>
                    <p>${comments}</p>
                </li>
                <li>
                    <p>Downloads</p>
                    <p>${downloads}</p>
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