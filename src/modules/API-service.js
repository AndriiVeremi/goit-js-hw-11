import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34554984-68074c5646cb7a45ce2c04cbc';

class ApiClient {

    #page = 1;
    #per_page = 40;
    #query = '';
    #totalPages = 0;

    async getPhotos() {

        const params = {
            page: this.#page,
            q: this.#query,
            per_page: this.#per_page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }

        const url = `${BASE_URL}?key=${API_KEY}`
        const photoData = await axios.get(url, { params });

        return photoData;
    }

    get query() {
        this.#query;
    }

    set query(newQuery) {
        this.#query = newQuery;
    }

    incrementPage() {
        this.#page += 1;
    }

    resetPage() {
        this.#page = 1;
    }

    setTotal(total) {
        this.#totalPages = total;
    }

    hasMorePhotos() {
        return this.#page < Math.ceil(this.#totalPages / this.#per_page);
    }
}

export default ApiClient;