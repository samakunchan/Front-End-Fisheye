import { AbstractPhotographerModel } from './abstract-photographer-model.js';

export class PhotographerExempleModel extends AbstractPhotographerModel {
    constructor(data) {
        super(data)
    }

    get portrait () {
        return `assets/images/photographers/account.png`;
    }
}
