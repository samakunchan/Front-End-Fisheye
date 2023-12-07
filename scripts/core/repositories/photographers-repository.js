import { getError, getJson, SortBy } from '../../utils/utils.js';

export class PhotographerRepository {
    constructor(photographerId = null, sortBy = null) {
        switch (true) {
            case photographerId !== null && sortBy === null:
                return this.getOnePhotographerWithMedias(photographerId);
            case photographerId !== null && sortBy !== null:
                return this.getPhotographerAndSortMedias(photographerId, sortBy);
            default:
                return this.getPhotographers();
        }
    }

    /**
     * Datas
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
    async getOnePhotographerWithMedias(photographerId) {
        return await this.getPhotographers()
            .then(json => ({
                ...json['photographers'].find(photographer => photographer['id'] === photographerId),
                medias: json['media'].filter(media => media['photographerId'] === photographerId)
            }))
            .catch(getError);
    }

    async getPhotographerAndSortMedias(photographerId, sortBy) {
        return await this.getOnePhotographerWithMedias(photographerId)
            .then(json => ({
                ...json,
                medias: this._sortMedias(json['medias'], sortBy)
            }))
            .catch(getError);
    }

    _sortMedias(medias, sortBy) {
        switch (sortBy) {
            case SortBy.popular.key:
                return medias.sort((a, b) => Number(b['likes']) - Number(a['likes']));
            case SortBy.title.key:
                return medias.sort((a, b) => a['title'] > b['title'] ? 1 : -1);
            case SortBy.date.key:
                return medias.sort((a, b) => new Date(a['date']) - new Date(b['date']));
            default:
                throw 'On peut trier uniquement par date, titre et popularité.'
        }
    }
}
