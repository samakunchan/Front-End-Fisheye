import { MediaVideoModel } from '../../core/models/media-video-model.js';
import { CarousselComponent } from './caroussel-component.js';

export class MediasCardComponent {
    constructor(medias) {
        this._medias = medias;
    }

    getMediasResults() {
        const ul = document.createElement('ul');
        ul.classList.add('medias');
        this._medias.forEach((media, indexMedia) => {
            const heart = document.createElement('i');
            heart.setAttribute('class', 'fas fa-heart fa-solid');

            const title = document.createElement('p');
            title.textContent = media.title;

            const likes = document.createElement('small');
            likes.classList.add(`like-${indexMedia}`);
            likes.textContent = media.likes;

            const blockLikes = document.createElement('div');
            blockLikes.classList.add('media-et-description');
            blockLikes.appendChild(likes);
            blockLikes.appendChild(heart);


            const nodeMedia = media instanceof MediaVideoModel ?
                document.createElement('video') :
                document.createElement('img');
            nodeMedia.alt = media.alt;
            nodeMedia.src = media.src;

            const blockDescription = document.createElement('div');
            blockDescription.classList.add('media-et-description');
            blockDescription.appendChild(title);
            blockDescription.appendChild(blockLikes);

            const li = document.createElement('li');
            const item = document.createElement('div');
            item.classList.add('item');

            li.classList.add('media-item');
            item.appendChild(nodeMedia);
            item.appendChild(blockDescription);
            li.appendChild(item);
            ul.appendChild(li);

            const caroussel = new CarousselComponent(indexMedia, this._medias);

            blockLikes.addEventListener('click',() => this._updateCounter(indexMedia));
            nodeMedia.addEventListener('click',() => caroussel.showCaroussel(indexMedia, this._medias));
        })

        return ul;
    }

    getCounterLikes() {
        const totalLikes = this._medias
            .map(media => media.likes)
            .reduce((a, b) => a + b, 0);

        const heart = document.createElement('i');
        heart.setAttribute('class', 'fas fa-heart fa-solid');

        const likes = document.createElement('small');
        likes.textContent = totalLikes;

        const price = document.createElement('small');
        price.classList.add('price');
        price.textContent = this._medias.find(media => media.price).price;

        const blockLikes = document.createElement('div');
        blockLikes.classList.add('like-heart');
        blockLikes.appendChild(likes);
        blockLikes.appendChild(heart);

        const blockCounter = document.createElement('div');
        blockCounter.classList.add('block-counter')
        blockCounter.appendChild(blockLikes);
        blockCounter.appendChild(price);

        return blockCounter;
    }

    _updateCounter(indexMedia) {
        document.querySelector('.block-counter').removeChild(document.querySelector('.like-heart'));
        document.querySelector('.block-counter').removeChild(document.querySelector('.price'));

        const testLikes = this._medias.find((data, index ) => index === indexMedia);
        testLikes.likes++;

        const totalLikes = this._medias
            .map(data => data.likes)
            .reduce((a, b) => a + b, 0);

        const heartR = document.createElement('i');
        heartR.setAttribute('class', 'fas fa-heart fa-solid');

        const likesR = document.createElement('small');
        likesR.textContent = totalLikes;

        const price = document.createElement('small');
        price.classList.add('price');
        price.textContent = this._medias.find(media => media.price).price;

        const blockLikes = document.createElement('div');
        blockLikes.classList.add('like-heart');
        blockLikes.appendChild(likesR);
        blockLikes.appendChild(heartR);
        document.querySelector('.block-counter').appendChild(blockLikes);
        document.querySelector('.block-counter').appendChild(price);
        const newLikes = this._medias.find((data, index ) => index === indexMedia);
        document.querySelector(`.like-${indexMedia}`).innerText = `${newLikes.likes}`;
    }
}

