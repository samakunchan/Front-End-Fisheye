import { MediaVideoModel } from '../../core/models/media-video-model.js';
import { CarousselComponent } from './caroussel-component.js';

export class MediasCardComponent {
  constructor(medias) {
    this._medias = medias;
  }

  getMediasResults() {
    const div = document.createElement('div');
    div.classList.add('medias');
    this._medias.forEach((media, indexMedia) => {
      const heart = document.createElement('i');
      heart.setAttribute('class', 'fas fa-heart fa-solid');
      heart.setAttribute('aria-hidden', 'true');

      const title = document.createElement('p');
      title.id = `descriptionId${indexMedia}`;
      title.textContent = media.title;
      if (media instanceof MediaVideoModel) {
        title.setAttribute('aria-label', `Titre de la video : ${media.title}.`);
      } else {
        title.setAttribute('aria-label', `Titre de l'image : ${media.title}.`);
      }

      const likes = document.createElement('small');
      likes.id = `likeId${indexMedia}`;
      likes.classList.add(`like-${indexMedia}`);
      likes.textContent = `${media.likes}`;
      likes.setAttribute(
        'aria-label',
        `${media.likes} personnes aiment cette ${media instanceof MediaVideoModel ? 'video.' : 'image.'}`,
      );

      const blockLikes = document.createElement('div');
      blockLikes.classList.add('media-et-description');
      blockLikes.appendChild(likes);
      blockLikes.appendChild(heart);

      let nodeMedia;
      if (media instanceof MediaVideoModel) {
        nodeMedia = document.createElement('video');
        const source = document.createElement('source');
        source.src = `${media.src}#t=0.1`;
        source.title = media.alt;
        source.type = `video/mp4`;

        nodeMedia.appendChild(source);
      } else {
        nodeMedia = document.createElement('img');
        nodeMedia.alt = media.alt;
        nodeMedia.src = media.src;
        nodeMedia.setAttribute('aria-hidden', `true`);
      }

      const blockDescription = document.createElement('div');
      blockDescription.classList.add('media-et-description');
      blockDescription.appendChild(title);
      blockDescription.appendChild(blockLikes);
      blockDescription.setAttribute('aria-labelledby', `likeId${indexMedia} descriptionId${indexMedia}`);

      const anchor = document.createElement('a');
      anchor.href = `javascript:void(${indexMedia})`;
      anchor.classList.add('media-item');

      const item = document.createElement('div');
      item.classList.add('item');
      item.appendChild(nodeMedia);
      item.appendChild(blockDescription);

      anchor.appendChild(item);
      div.appendChild(anchor);

      const caroussel = new CarousselComponent(indexMedia, this._medias);

      blockLikes.addEventListener('click', () => this._updateCounter(indexMedia));
      nodeMedia.addEventListener('click', () => caroussel.showCaroussel(indexMedia, this._medias));
      anchor.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') caroussel.showCaroussel(indexMedia, this._medias);
      });
    });

    return div;
  }

  getCounterLikes() {
    const totalLikes = this._medias.map(this._mediaOnly).reduce(this._addition, 0);

    const heart = document.createElement('i');
    heart.setAttribute('class', 'fas fa-heart fa-solid');

    const likes = document.createElement('small');
    likes.textContent = totalLikes;

    const price = document.createElement('small');
    price.classList.add('price');
    price.textContent = this._medias.find((media) => media.price).price;

    const blockLikes = document.createElement('article');
    blockLikes.classList.add('like-heart');
    blockLikes.appendChild(likes);
    blockLikes.appendChild(heart);

    const blockCounter = document.createElement('div');
    blockCounter.classList.add('block-counter');
    blockCounter.setAttribute('aria-label', `Total des votes ${totalLikes}.`);
    blockCounter.appendChild(blockLikes);
    blockCounter.appendChild(price);

    return blockCounter;
  }

  _updateCounter(indexMedia) {
    document.querySelector('.block-counter').removeChild(document.querySelector('.like-heart'));
    document.querySelector('.block-counter').removeChild(document.querySelector('.price'));

    const testLikes = this._medias.find((data, index) => index === indexMedia);
    testLikes.likes++;

    const totalLikes = this._medias.map((data) => data.likes).reduce((a, b) => a + b, 0);

    const heartR = document.createElement('i');
    heartR.setAttribute('class', 'fas fa-heart fa-solid');

    const likesR = document.createElement('small');
    likesR.textContent = totalLikes;

    const price = document.createElement('small');
    price.classList.add('price');
    price.textContent = this._medias.find((media) => media.price).price;

    const blockLikes = document.createElement('div');
    blockLikes.classList.add('like-heart');
    blockLikes.appendChild(likesR);
    blockLikes.appendChild(heartR);
    document.querySelector('.block-counter').appendChild(blockLikes);
    document.querySelector('.block-counter').appendChild(price);
    const newLikes = this._medias.find((data, index) => index === indexMedia);
    document.querySelector(`.like-${indexMedia}`).innerText = `${newLikes.likes}`;
  }

  _mediaOnly(media) {
    return media.likes;
  }

  _addition(a, b) {
    return a + b;
  }
}
