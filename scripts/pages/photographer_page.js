import { PhotographerRepositoryFactory } from '../core/factories/photographer_repository_factory.js';
import { errorInitMessage, errorMessage, redirectToThisUrl, realTypeText, typeObjectText, typeStringText, idParam } from '../utils/utils.js';
import { PhotographerFactory } from '../core/factories/photographer_factory.js';

export class PhotographerPage {
    constructor() {
        this.init().catch(console.log);
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
            const realPhotographers = PhotographerFactory.getOneWithRealModelFactory(oneJSON);
            console.log(realPhotographers); // TODO Faire un truc ici
            // this.displayData(realPhotographers);
            return realPhotographers;
        } else {
            throw errorInitMessage;
        }
    }
}

new PhotographerPage();
