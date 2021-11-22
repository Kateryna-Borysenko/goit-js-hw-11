import './css/styles.css';
import fetchPhoto from "./services/api-service";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallary: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

let searchQuery = '';
let page = 1;

/////////////////////////////////////////

function onSearch(e) {

    e.preventDefault();

    //при submit form -> сохранять текущее значение input
    searchQuery = e.currentTarget.elements.searchQuery.value;

    fetchPhoto(searchQuery, page)
        .then(data => {
            console.log(data)
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
            refs.gallary.innerHTML = "";
            refs.gallary.insertAdjacentHTML('beforeend', createMarkupCard(data.hits));
            addSimpleLightbox();
            if (data.totalHits > 0) {
                refs.loadMoreBtn.classList.remove('is_hidden');
            }
            
        })
}
/////////////////////////////////////////

function onLoadMore() {
  
    page += 1;

    fetchPhoto(searchQuery, page)
        .then(data => {
            if (data.totalHits > 0) {

                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

            } else {
               
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            }
            refs.gallary.insertAdjacentHTML('beforeend', createMarkupCard(data.hits));
            addSimpleLightbox();
        })
}
/////////////////////////////////////////

const createMarkupCard = (data) => {

    return data.map(({ id, webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>

        `<div class='item card' id='${id}'>
        <a class="gallery__item" href="${webformatURL}">
            <img class="gallery-image"  loading="lazy" src="${largeImageURL}" alt="${tags}" />
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
    </div>`
    )
        .join('');

}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// настройки с библиотеки  SimpleLightbox
function addSimpleLightbox() {
    new SimpleLightbox('.gallery a').refresh();
}
