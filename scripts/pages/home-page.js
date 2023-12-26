import {
  errorMessage,
  typeStringText,
  typeObjectText,
  errorInitMessage,
  fakeTypeText,
  realTypeText,
} from '../utils/utils.js';
import { PhotographerFactory } from '../core/factories/photographer-factory.js';
import { PhotographersService } from '../services/photographers-service.js';
import { PhotographerRepositoryFactory } from '../core/factories/photographer-repository-factory.js';
import { HeaderComponent } from './components/header-component.js';

export class HomePage {
  constructor() {
    this.init().catch(console.log);
  }

  /**
   * Initialisation de l'Home
   * @return {Promise<PhotographerExempleModel | PhotographerModel | Error>}
   */
  async init() {
    const exempleJSON = await new PhotographerRepositoryFactory(fakeTypeText);
    const remoteJSON = await new PhotographerRepositoryFactory(realTypeText);

    const headerTemplate = new HeaderComponent();
    const logoHeader = headerTemplate.headerTemplate();
    document.querySelector('.header').insertBefore(logoHeader.getLogoDOM(), document.querySelector('.h1'));

    if (typeof remoteJSON === typeStringText && remoteJSON === errorMessage) {
      const fakePhotographers = exempleJSON['photographers'].map(PhotographerFactory.mapWithFakeModelFactory);
      this.displayData(fakePhotographers);
      return fakePhotographers;
    } else if (typeof remoteJSON === typeObjectText) {
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
