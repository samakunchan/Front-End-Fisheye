import { getError, getJson } from '../../utils/utils.js';

export class FakePhotographeRepository {
    constructor() {
        return this.getPhotographers();
    }

    /**
     * Fake Datas
     * @return {Promise<Response | String>}
     */
    async getPhotographers() {
        return await fetch('data/fake-photographers.json').then(getJson).catch(getError);
    }
}
