import { PhotographerRepositoryFactory } from '../core/factories/photographer_repository_factory.js';
import { errorInitMessage, errorMessage, redirectToThisUrl, realTypeText, typeObjectText, typeStringText, idParam } from '../utils/utils.js';
import { PhotographerFactory } from '../core/factories/photographer_factory.js';
import { PhotographersService } from '../services/photographers_service.js';
import { ContactComponent } from './components/contact_component.js';

export class PhotographerPage {
    constructor() {
        this.init().catch(console.log);
        this._contact = new ContactComponent();
    }

    /**
     * Initialisation de l'Home
     * @return {Promise<PhotographerFactory | String>}
     */
    async init() {
        const params = new URLSearchParams(window.location.search);
        const oneJSON =  await new PhotographerRepositoryFactory(realTypeText, idParam);

        if((typeof oneJSON === typeStringText && oneJSON === errorMessage) || params.get('id') === null) {
            window.location.href = redirectToThisUrl('index');
        } else if(typeof oneJSON === typeObjectText) {
            const onePhotographer = PhotographerFactory.getOneWithRealModelFactory(oneJSON);
            console.log(onePhotographer);
            this.displayData(onePhotographer);
            return onePhotographer;
        } else {
            throw errorInitMessage;
        }
    }

    /**
     * Son job est de passer les données au template pour afficher les cards.
     * @param photographer
     */
    displayData(photographer) {
        this.addToTemplate(photographer);
    }

    /**
     * Méthode exécuter à chaque itération de la boucle forEach() de la méthode displayData()
     * @param photographer
     */
    addToTemplate(photographer) {
        const photographerTemplate = new PhotographersService(photographer).photographerTemplate();
        const userCardDOM = photographerTemplate.getSectionHeaderDOM();
        document.getElementById('main').appendChild(userCardDOM);

        this._contact.listenModal();
    }
}

new PhotographerPage();
