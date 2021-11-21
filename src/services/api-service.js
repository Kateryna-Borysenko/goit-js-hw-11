
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24447293-d3f0d6bbd906e1eb5560775ff'; //получила ключи при регистрации на сайте
//searchQuery - значение которое ввел пользователь

// export default function fetchPhoto(searchQuery, page) {
//     return fetch(
//         `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&key=${API_KEY}&page=${page}&per_page=40`,

//         // todo fields=id,webformatURL,largeImageURL,tags,likes,views,comments,downloads
//     );
// }
export default function fetchPhoto(searchQuery, page) {
    return fetch(
        `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&key=${API_KEY}&page=${page}&per_page=40`,
       
    )
        .then(response => {

            if (response.status === 404) {

                return Promise.reject(new Error(response.message));
            }
            return response;
        })
        .then(data => data.json())
}