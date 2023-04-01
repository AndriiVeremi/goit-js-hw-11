import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import createGallery from './modules/createGallery';
import getRefs from './modules/refs';
import APIservice from './modules/API-service';

const modalGallery = new SimpleLightbox('.js-gallery a', {
    captionDelay: 250,
});

const refs = getRefs();
const API = new APIservice();

async function onSearchClick(event) {
    event.preventDefault();
    const searchPhoto = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();

    if (!searchPhoto) {
        clearPage()
        Notify.info('Enter something to search!');
        return;
    }

    API.query = searchPhoto;

    clearPage()

    try {
        const response = await API.getPhotos();
        const hits = response.data.hits;
        const total = response.data.total;

        if (hits.length === 0) {
            Notify.failure(`Sorry, there are no images matching your ${searchPhoto}. Please try again.`);
            return;
        }
        const markupPhotos = createGallery(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markupPhotos);

        API.setTotal(total);
        Notify.success(`Hooray! We found ${total} images.`);

        if (API.hasMorePhotos()) {
            refs.btnLoadMore.classList.remove('is-hidden');
        }

        modalGallery.refresh()

    } catch (error) {
        Notify.failure(error.message, 'Something went wrong!');
        clearPage()
    }
}

const loadMore = async () => {
    API.incrementPage();

    if (!API.hasMorePhotos()) {
        refs.btnLoadMore.classList.add('is-hidden');
        Notify.info("We're sorry, but you've reached the end of search results.");
    }

    try {
        const response = await API.getPhotos();
        const hits = response.data.hits;
        const markupPhotos = createGallery(hits);
        refs.gallery.insertAdjacentHTML('beforeend', markupPhotos);
        modalGallery.refresh();
        scrollPage();
    } catch (error) {
        Notify.failure(error.message, 'Something went wrong!');
        clearPage();
    }
};

function clearPage() {
    API.resetPage();
    refs.gallery.innerHTML = '';
    refs.btnLoadMore.classList.add('is-hidden');
}

refs.form.addEventListener('submit', onSearchClick);
refs.btnLoadMore.addEventListener('click', loadMore);

function scrollPage() {
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}


