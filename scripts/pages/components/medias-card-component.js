import {MediaVideoModel} from '../../core/models/media-video-model.js';

export class MediasCardComponent {
    constructor(medias) {
        this._medias = medias;
    }

    getMediasResults() {
        const ul = document.createElement('ul');
        ul.classList.add('medias')
        this._medias.forEach(media => {
            const li = document.createElement('li');
            li.classList.add('media-item')
            // li.textContent = `Titre: ${media.title} Date : \n${media.date} - Popularité : \n${media.likes}`;

            const nodeMedia = media instanceof MediaVideoModel ?
                document.createElement('video') :
                document.createElement('img');
            nodeMedia.alt = media.alt;
            nodeMedia.src = media.src;
            li.appendChild(nodeMedia);
            ul.appendChild(li);
        })

        return ul;
    }
}

