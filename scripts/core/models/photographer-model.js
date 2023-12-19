import { AbstractPhotographerModel } from './abstract-photographer-model.js';

export class PhotographerModel extends AbstractPhotographerModel  {
    constructor(data) {
        super(data);
        const { city, country, tagline, price, medias } = data;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
        this._medias = medias;
    }

    /**
     * @return {string}
     */
    get portrait () {
        return `assets/images/photographers/${this._portrait}`;
    }

    /**
     * @return {string}
     */
    get tagline () {
        return this._tagline;
    }

    /**
     * @return {string}
     */
    get price () {
        return `${this._price}€ / jour`;
    }

    /**
     * @return {string}
     */
    get ariaPrice () {
        return `${this._price}€ par jour`;
    }

    /**
     * @return {string}
     */
    get location () {
        return `${this._city}, ${this._country}`;
    }

    /**
     * @return MediaFactory[]
     */
    get medias () {
        return this._medias;
    }
}
