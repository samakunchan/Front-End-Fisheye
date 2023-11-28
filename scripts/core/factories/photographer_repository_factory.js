import { fakeTypeText, realTypeText } from '../../utils/utils.js';
import { FakePhotographeRepository } from '../repositories/fake_photographers_repository.js';
import { PhotographerRepository } from '../repositories/photographers_repository.js';

export class PhotographerRepositoryFactory {
    constructor(type, photographerId = null) {
        if(type === fakeTypeText) {
            return new FakePhotographeRepository();
        } else if (type === realTypeText) {
            if(photographerId === null) {
                return new PhotographerRepository();
            } else {
                return new PhotographerRepository(photographerId);
            }
        } else {
            throw 'Unknown format type for repository';
        }
    }
}
