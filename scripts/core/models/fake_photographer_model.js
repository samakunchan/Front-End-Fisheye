export class FakePhotographerModel {
    constructor({name}) {
        this._name = name;
    }

    get name () {
        return this._name;
    }

    get portrait () {
        return `assets/photographers/account.png`;
    }
}
