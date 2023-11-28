import { getError, getJson } from '../../utils/utils.js';

export class PhotographerRepository {
    constructor(photographerId = null) {
        return photographerId !== null ? this.getOnePhotographerWithMedia(photographerId) : this.getPhotographers();
    }

    /**
     * Fake Datas
     * @return {Promise<Response | String>}
     */
    async getPhotographers() {
        return await fetch('data/photographers.json').then(getJson).catch(getError);
    }

    /**
     * Construit un nouveau JSON avec un photographe et ses medias
     * @param photographerId
     * @return {Promise<*&{medias: *}>}
     */
    async getOnePhotographerWithMedia(photographerId) {
        return await this.getPhotographers()
            .then(json => ({
                ...json['photographers'].find(photographer => photographer['id'] === photographerId),
                medias: json['media'].filter(media => media['photographerId'] === photographerId)
            }))
            .catch(getError);
    }
}
