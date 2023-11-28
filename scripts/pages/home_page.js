import { errorMessage, typeStringText, typeObjectText, errorInitMessage, fakeTypeText, realTypeText } from '../utils/utils.js';
import { PhotographerFactory } from '../core/factories/photographer_factory.js';
import { PhotographersService } from '../services/photographers_service.js';
import { PhotographerRepositoryFactory } from '../core/factories/photographer_repository_factory.js';

export class HomePage {
    constructor() {
        this.init().catch(console.log);
    }

    /**
     * Initialisation de l'Home
     * @return {Promise<FakePhotographerModel | PhotographerModel | Error>}
     */
    async init() {
        const exempleJSON = await new PhotographerRepositoryFactory(fakeTypeText);
        const remoteJSON =  await new PhotographerRepositoryFactory(realTypeText);
        // const testJSON =  await new PhotographerRepositoryFactory(realTypeText, 930);
        if(typeof remoteJSON === typeStringText && remoteJSON === errorMessage) {
            const fakePhotographers = exempleJSON['photographers'].map(PhotographerFactory.mapWithFakeModelFactory);
            this.displayData(fakePhotographers);
            return fakePhotographers;
        } else if(typeof remoteJSON === typeObjectText) {
            const realPhotographers = remoteJSON['photographers'].map(PhotographerFactory.mapWithRealModelFactory);
            this.displayData(realPhotographers);
            return realPhotographers;
        } else {
            throw errorInitMessage;
        }
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

new HomePage();
