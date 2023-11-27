export class FakePhotographerModel {
    constructor({name, id, city, country, tagline, price, portrait}) {
        this._name = name;
        this._id = id;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
        this._portrait = portrait;
    }

    get name () {
        return this._name;
    }

    get portrait () {
        return `assets/photographers/account.png`;
    }
}
