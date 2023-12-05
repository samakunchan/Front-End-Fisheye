export class AbstractPhotographerModel {
    constructor(data) {
        const { id, name, portrait } = data;
        this._id = id;
        this._name = name;
        this._portrait = portrait;
    }

    /**
     * @return {number}
     */
    get id () {
        return this._id;
    }

    /**
     * @return {string}
     */
    get name () {
        return this._name;
    }

    /**
     * @return {string}
     */
    get portrait () {
        return `chemin/vers/image`;
    }
}
