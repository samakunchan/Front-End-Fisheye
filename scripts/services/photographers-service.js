import { PhotographCardComponent } from '../pages/components/photograph-card-component.js';
import { ContactComponent } from '../pages/components/contact-component.js';
import { MediasCardComponent } from '../pages/components/medias-card-component.js';
import { MediaFactory } from '../core/factories/media-factory.js';
import { CarousselComponent } from '../pages/components/caroussel-component.js';
import {FiltersService} from './filters-service.js';

export class PhotographersService {
    constructor(data) {
        this._data = data;
        this._card = new PhotographCardComponent(this._data);
        if(this._data.medias !== undefined) {
            const media = this._data.medias.map(media => new MediaFactory({
                ...media,
                name: this._data.name,
                price: this._data.price
            }));
            this._resultMedias = new MediasCardComponent(media);
        }
        this._caroussel = new CarousselComponent();
    }

    photographerTemplate() {
        return {
            getUserCardDOM: () => this._getUserCardDOM(),
            getSectionHeaderDOM: () => this._getSectionHeaderDOM(),
            getMediasDOM: () => this._getMediasDOM(),
            getCounterDOM: () => this._getCounterDOM(),
            getCarousselDOM: () => this._getCarousselDOM(),
            getFilterDOM: () => this._getFilter(),
        };
    }

    /**
     * Créé la card en HTML
     * @return {HTMLElement}
     * @private
     */
    _getUserCardDOM() {
        const anchor = this._card.getAnchor();
        const article = this._card.getArticle();
        anchor.appendChild(article);
        return anchor;
    }

    _getSectionHeaderDOM() {
        this._contact = new ContactComponent(this._data.name);
        const section = document.createElement('section');
        section.classList.add('photograph-header');
        const userInfo = this._card.getUserInfo();
        const contact = this._contact.getContactBtn();
        const image = this._card.getImage();

        section.appendChild(userInfo);
        section.appendChild(contact);
        section.appendChild(image);
        return section;
    }

    _getMediasDOM() {
        const section = document.createElement('section');
        section.classList.add('photograph-results');
        const label = this._resultMedias.getMediasResults();

        section.appendChild(label);

        return section;
    }

    _getCounterDOM() {
        return this._resultMedias.getCounterLikes();
    }

    _getCarousselDOM() {
        return this._caroussel.buildCaroussel();
    }

    _getFilter() {
        return new FiltersService();
    }
}
