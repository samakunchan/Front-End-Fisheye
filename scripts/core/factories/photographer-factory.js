import { PhotographerModel } from '../models/photographer-model.js';
import { PhotographerExempleModel } from '../models/photographer-exemple-model.js';
import { fakeTypeText, realOneTypeText, realTypeText } from '../../utils/utils.js';

export class PhotographerFactory {
    constructor(json, type) {
        if(type === fakeTypeText) {
            return new PhotographerExempleModel(json);
        } else if (type === realTypeText || type ===  realOneTypeText) {
            return new PhotographerModel(json);
        } else {
            throw 'Format incorrect pour un seul photographe';
        }
    }

    /**
     * Son job est d'utiliser la factory avec le type : "fake"
     * @param json
     * @return {PhotographerFactory}
     */
    static mapWithFakeModelFactory(json) {
        return new PhotographerFactory(json, fakeTypeText);
    }

    /**
     * Son job est d'utiliser la factory avec le type : "real"
     * @param json
     * @return {PhotographerFactory}
     */
    static mapWithRealModelFactory(json) {
        return new PhotographerFactory(json, realTypeText);
    }

    /**
     * Son job est d'utiliser la factory avec le type : "one"
     * @param json
     * @return {PhotographerFactory}
     */
    static getOneWithRealModelFactory(json) {
        return new PhotographerFactory(json, realOneTypeText);
    }
}
