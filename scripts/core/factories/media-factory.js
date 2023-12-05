import { MediaVideoModel } from '../models/media-video-model.js';
import { MediaImageModel } from '../models/media-image-model.js';

export class MediaFactory {
    constructor(json) {
        if(Object.keys(json).includes('video')) {
            return new MediaVideoModel(json);
        } else if(Object.keys(json).includes('image')) {
            return new MediaImageModel(json);
        } else {
            throw 'Format incorrect pour les medias.';
        }
    }
}
