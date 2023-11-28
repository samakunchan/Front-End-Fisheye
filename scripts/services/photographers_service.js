import { PhotographCardComponent } from '../pages/components/photograph_card_component.js';
import { ContactComponent } from '../pages/components/contact_component.js';

export class PhotographersService {
    constructor(data) {
        this._data = data;
        this._card = new PhotographCardComponent(this._data);
    }

    photographerTemplate() {
        return {
            getUserCardDOM: () => this._getUserCardDOM(),
            getSectionHeaderDOM: () => this._getSectionHeaderDOM(),
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
        section.classList.add('photograph-header')
        const userInfo = this._card.getUserInfo();
        const contact = this._contact.getContactBtn();
        const image = this._card.getImage();

        section.appendChild(userInfo);
        section.appendChild(contact);
        section.appendChild(image);
        return section;
    }
}
