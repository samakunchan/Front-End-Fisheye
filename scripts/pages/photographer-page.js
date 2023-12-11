import { PhotographerRepositoryFactory } from '../core/factories/photographer-repository-factory.js';
import {errorInitMessage, errorMessage, redirectToThisUrl, realTypeText, typeObjectText, typeStringText, idParam, SortBy} from '../utils/utils.js';
import { PhotographerFactory } from '../core/factories/photographer-factory.js';
import { PhotographersService } from '../services/photographers-service.js';
import { ContactComponent } from './components/contact-component.js';

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
        const oneJSON =  await new PhotographerRepositoryFactory(realTypeText, idParam, SortBy.popular.key);

        if((typeof oneJSON === typeStringText && oneJSON === errorMessage) || params.get('id') === null) {
            window.location.href = redirectToThisUrl('index');
        } else if(typeof oneJSON === typeObjectText) {
            const onePhotographer = PhotographerFactory.getOneWithRealModelFactory(oneJSON);
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

    displayMediasData(photographer) {
        this.addToNodesMedia(photographer);
    }

    /**
     * Méthode exécuter à chaque itération de la boucle forEach() de la méthode displayData()
     * @param photographer
     */
    addToTemplate(photographer) {
        const photographerTemplate = new PhotographersService(photographer).photographerTemplate();
        const photographerHeader = photographerTemplate.getSectionHeaderDOM();
        const photographerMedias = photographerTemplate.getMediasDOM();
        const photographerTotalLikes = photographerTemplate.getCounterDOM();
        document.getElementById('main').insertBefore(
            photographerHeader,
            document.querySelector('.photograph-filters')
        );
        document.getElementById('main').appendChild(photographerMedias);
        document.getElementById('main').appendChild(photographerTotalLikes);

        this._contact.listenModal();
        document.querySelector('.select-filter').addEventListener('change', async event => {
            document.getElementById('main').removeChild(document.querySelector('.photograph-results'));
            const oneJSON =  await new PhotographerRepositoryFactory(realTypeText, idParam, event.target.value);
            const onePhotographer = PhotographerFactory.getOneWithRealModelFactory(oneJSON);
            this.displayMediasData(onePhotographer);
        });
    }

    addToNodesMedia(media) {
        const photographerTemplate = new PhotographersService(media).photographerTemplate();
        const photographerMedias = photographerTemplate.getMediasDOM();
        console.log('voila');
        document.getElementById('main').appendChild(photographerMedias);
    }
}

new PhotographerPage();
