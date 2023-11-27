import { getJson, getError, errorMessage, typeStringText, typeObjectText, errorInitMessage } from '../utils/utils.js';
import { PhotographerFactory } from '../factories/photographer_factory.js';
import { PhotographersService } from '../services/photographers_service.js';

export class App {
    constructor() {
        this.init().catch(console.log);
    }

    /**
     * Initialisation de l'App
     * @return {Promise<FakePhotographerModel | PhotographerModel | Error>}
     */
    async init() {
        const exempleJSON = await this.getFakePhotographers();
        const remoteJSON = await this.getRemotePhotographers();
        if(typeof remoteJSON === typeStringText && remoteJSON === errorMessage) {
            const fakePhotographers = exempleJSON['photographers'].map(PhotographerFactory.mapWithFakeModelFactory);
            this.displayData(fakePhotographers);
            return fakePhotographers;
        } else if(typeof remoteJSON === typeObjectText) {
            const realPhotographers = remoteJSON['photographers'].map(PhotographerFactory.mapWithFakeRealFactory);
            this.displayData(realPhotographers);
            return realPhotographers;
        } else {
            throw errorInitMessage;
        }
    }

    /**
     * Fake Datas
     * @return {Promise<Response | String>}
     */
    async getFakePhotographers() {
        return await fetch('data/fake-photographers.json').then(getJson).catch(getError);
    }

    /**
     * Real Datas
     * @return {Promise<Response | String>}
     */
    async getRemotePhotographers() {
        return await fetch('data/photoographers.json').then(getJson).catch(getError);
    }

    /**
     * Son job est de passer les données au template pour afficher les cards.
     * @param photographers
     */
    displayData(photographers) {
        photographers.forEach(this.addToTemplate);
    }

    /**
     * Méthode exécuté à chaque itération de la boucle forEach() de la méthode displayData()
     * @param photographer
     */
    addToTemplate(photographer) {
        const photographerModel = new PhotographersService(photographer).photographerTemplate();
        const userCardDOM = photographerModel.getUserCardDOM();
        document.querySelector('.photographer_section').appendChild(userCardDOM);
    }
}

