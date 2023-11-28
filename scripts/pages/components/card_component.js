import { redirectToThisUrl } from '../../utils/utils.js';

export class CardComponent {
    constructor(data) {
        const { id, name, portrait, tagline, price, location } = data;
        this._id = id;
        this._name = name;
        this._tagline = tagline;
        this._price = price;
        this._picture = portrait;
        this._location = location;
    }

    /**
     * Créer un lien en HTML
     * @return {HTMLAnchorElement}
     */
    getAnchor() {
        const anchor = document.createElement( 'a');
        anchor.href = `${redirectToThisUrl('photographer')}?id=${this._id}`;
        anchor.classList.add('photographer-anchor');

        return anchor;
    }

    /**
     * Créer une balise article avec tout le contenu en HTML
     * @return {HTMLAnchorElement}
     */
    getArticle() {
        const article = document.createElement( 'article');

        const img = this._getImage();
        const h2 = this._getTitle();
        const paraLocation = this._getLocation();
        const paraDescription = this._getDescription();
        const small = this._getPrice();

        article.appendChild(img);
        article.appendChild(h2);

        if(this._location !== undefined) {
            article.appendChild(paraLocation);
        }
        if(this._tagline !== undefined) {
            article.appendChild(paraDescription);
        }
        if(this._price !== undefined) {
            article.appendChild(small);
        }

        return article;
    }

    /**
     * Créer l'image en HTML
     * @return {HTMLImageElement}
     * @private
     */
    _getImage() {
        const img = document.createElement( 'img' );
        img.setAttribute('src', this._picture);

        return img;
    }

    /**
     * Créer le titre en HTML
     * @return {HTMLHeadingElement}
     * @private
     */
    _getTitle() {
        const h2 = document.createElement( 'h2' );
        h2.textContent = this._name;
        h2.classList.add('photographer-title');

        return h2;
    }

    /**
     * Créer un paragraphe de description
     * @return {HTMLParagraphElement}
     * @private
     */
    _getLocation() {
        const para = document.createElement( 'p' );
        para.textContent = this._location;
        para.classList.add('photographer-location');

        return para;
    }

    /**
     * Créer un paragraphe de description
     * @return {HTMLParagraphElement}
     * @private
     */
    _getDescription() {
        const para = document.createElement( 'p' );
        para.textContent = this._tagline;
        para.classList.add('photographer-description');

        return para;
    }

    /**
     * Créer une balise small pour afficher le prix
     * @return {HTMLElement}
     * @private
     */
    _getPrice() {
        const small = document.createElement( 'small' );
        small.textContent = this._price;
        small.classList.add('photographer-price');

        return small;
    }

}
