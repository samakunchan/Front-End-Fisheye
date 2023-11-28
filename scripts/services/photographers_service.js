import { CardComponent } from '../pages/components/card_component.js';

export class PhotographersService {
    constructor(data) {
        this._data = data;
        this._card = new CardComponent(this._data);
    }

    /**
     * @return {{name, picture, getUserCardDOM: (function(): HTMLElement)}}
     */
    photographerTemplate() {
        return {
            // name: this._name,
            // picture: this._portrait,
            getUserCardDOM: () => this._getUserCardDOM(),
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
}
