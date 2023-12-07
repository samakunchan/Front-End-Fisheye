import { fakeTypeText, realTypeText } from '../../utils/utils.js';
import { FakePhotographeRepository } from '../repositories/fake-photographers-repository.js';
import { PhotographerRepository } from '../repositories/photographers-repository.js';

export class PhotographerRepositoryFactory {
    constructor(type, photographerId = null, sortBy = null) {
        if(type === fakeTypeText) {
            return new FakePhotographeRepository();
        } else if (type === realTypeText) {
            if(photographerId === null) {
                return new PhotographerRepository();
            } else {
                return new PhotographerRepository(photographerId, sortBy);
            }
        } else {
            throw 'Format incorrect pour le repository';
        }
    }
}
