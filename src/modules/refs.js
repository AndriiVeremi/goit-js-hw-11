export default function getRefs() {
    const refs = {
        form: document.querySelector('.search-form'),
        inputForm: document.querySelector('.form-input'),
        btnLoadMore: document.querySelector('.load-more'),
        gallery: document.querySelector('.gallery'),
    };
    return refs;
};