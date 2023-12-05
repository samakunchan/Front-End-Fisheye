import { AbstractMediaModel } from './abstract-media-model.js';

export class MediaImageModel extends AbstractMediaModel {
    constructor(data) {
        super(data);
        const { image } = data;
        this._image = image;
    }

    /**
     * @return {string}
     */
    get src() {
        return `assets/images/medias/${this.name}/${this._image}`;
    }

    /**
     * @return {string}
     */
    get alt() {
        return `Image de ${this._title}`;
    }
}
