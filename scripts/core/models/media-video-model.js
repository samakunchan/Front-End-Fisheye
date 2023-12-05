import { AbstractMediaModel } from './abstract-media-model.js';

export class MediaVideoModel extends AbstractMediaModel {
    constructor(data) {
        super(data);
        const { video } = data;
        this._video = video;
    }

    /**
     * @return {string}
     */
    get src() {
        return `assets/videos/medias/${this.name}/${this._video}`;
    }

    /**
     * @return {string}
     */
    get alt() {
        return `Video de ${this._title}`;
    }
}
