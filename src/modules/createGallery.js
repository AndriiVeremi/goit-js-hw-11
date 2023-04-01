function createGallery(response) {
    return response.map(({ tags, webformatURL, largeImageURL, likes, views, comments, downloads }) => {
        return `
           <a href="${largeImageURL}" class="card-link js-card-link">
            <div class="photo-card">
              <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <div class="info-item info-item-likes">                  
                  <div class="box-likes"><b>Likes</b>
                  <span id="value">${likes}</span>
                  </div>                  
                </div>
                <p class="info-item">
                  <b>Views</b>
                  ${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${downloads}
                </p>
              </div>
            </div>
            </a>`;
    }).join('');
}

export default createGallery;