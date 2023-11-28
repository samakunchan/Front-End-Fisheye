export class PhotographerModel {
    constructor({name, id, city, country, tagline, price, portrait, medias}) {
        this._name = name;
        this._id = id;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
        this._portrait = portrait;
        this._medias = medias;
    }

    get id () {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get portrait () {
        return `assets/photographers/${this._portrait}`;
    }

    get tagline () {
        return this._tagline;
    }

    get price () {
        return `${this._price}€/jour`;
    }

    get location () {
        return `${this._country}/${this._city}`;
    }

    get medias () {
        return this._medias;
    }
}
