import { PhotographerRepositoryFactory } from '../core/factories/photographer-repository-factory.js';
import {errorInitMessage, errorMessage, redirectToThisUrl, realTypeText, typeObjectText, typeStringText, idParam, SortBy} from '../utils/utils.js';
import { PhotographerFactory } from '../core/factories/photographer-factory.js';
import { PhotographersService } from '../services/photographers-service.js';
import { ContactComponent } from './components/contact-component.js';
import { HeaderComponent } from './components/header-component.js';

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

        const headerTemplate = new HeaderComponent();
        const logoHeader = headerTemplate.headerTemplate();
        document.querySelector('.header').appendChild(logoHeader.getLogoDOM());

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

    /**
     * Méthode exécuter à chaque itération de la boucle forEach() de la méthode displayData()
     * @param photographer
     */
    addToTemplate(photographer) {
        const hiddenH1 = document.createElement('h1');
        hiddenH1.textContent = photographer.name;
        hiddenH1.classList.add('hidden');
        const photographerTemplate = new PhotographersService(photographer).photographerTemplate();
        const photographerHeader = photographerTemplate.getSectionHeaderDOM();
        const photographerMedias = photographerTemplate.getMediasDOM();
        const photographerTotalLikes = photographerTemplate.getCounterDOM();
        const photographerCaroussel = photographerTemplate.getCarousselDOM();

        document.getElementById('main').appendChild(hiddenH1);
        document.getElementById('main').insertBefore(
            photographerHeader,
            document.querySelector('.photograph-filters')
        );
        document.getElementById('main').appendChild(photographerMedias);
        document.getElementById('main').appendChild(photographerTotalLikes);
        document.getElementById('main').appendChild(photographerCaroussel);

        this._contact.listenModal();
        photographerTemplate.getFilterDOM();
    }



}

new PhotographerPage();
