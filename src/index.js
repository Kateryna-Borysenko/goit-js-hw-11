// import './css/styles.css'; //TODO написать стили для формы

import fetchPhoto from "./services/api-service";


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallary: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

let searchQuery = '';
let page = 1;
console.log(page);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {

    e.preventDefault();

    //при submit form -> сохранять текущее значение input
    searchQuery = e.currentTarget.elements.searchQuery.value;

    fetchPhoto()
        .then(response => response.json)
        .then(data => {
            page += 1; 
            console.log(page);
        })
}

function onLoadMore () {}