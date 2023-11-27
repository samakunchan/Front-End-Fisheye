import { PhotographerModel } from '../models/photographer_model.js';
import { FakePhotographerModel } from '../models/fake_photographer_model.js';
import {fakeTypeText, realTypeText} from '../utils/utils.js';

export class PhotographerFactory {
    constructor(json, type) {
        if(type === fakeTypeText) {
            return new FakePhotographerModel({...json});
        } else if (type === realTypeText) {
            return new PhotographerModel({...json});
        } else {
            throw 'Unknown format type';
        }
    }

    /**
     * Son job est d'utiliser la factory avec le type : "fake"
     * @param json
     * @param type
     * @return {PhotographerFactory}
     */
    static mapWithFakeModelFactory(json, type) {
        return new PhotographerFactory({...json}, fakeTypeText);
    }

    /**
     * Son job est d'utiliser la factory avec le type : "real"
     * @param json
     * @param type
     * @return {PhotographerFactory}
     */
    static mapWithFakeRealFactory(json, type) {
        return new PhotographerFactory({...json}, realTypeText);
    }
}
