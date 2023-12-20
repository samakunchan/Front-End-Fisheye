import { redirectToThisUrl } from '../../utils/utils.js';

export class PhotographCardComponent {
    constructor(data) {
        const { id, name, portrait, tagline, price, location, ariaPrice } = data;
        this._id = id;
        this._name = name;
        this._tagline = tagline;
        this._price = price;
        this._ariaPrice = ariaPrice;
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
        anchor.setAttribute('aria-label', `${this._name}.`);

        return anchor;
    }

    /**
     * Créer une balise article avec tout le contenu en HTML
     * @return {HTMLAnchorElement}
     */
    getArticle() {
        const article = document.createElement( 'article');
        const figure = document.createElement( 'figure');
        figure.classList.add('figure');

        const img = this.getImage();
        const h2 = this.getTitle();
        const paraLocation = this.getLocation('p');
        const paraDescription = this.getDescription();
        const small = this.getPrice();

        img.setAttribute('aria-hidden', 'true');
        figure.appendChild(img);
        article.appendChild(figure);
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

    getUserInfo() {
        const div = document.createElement( 'div');
        const h2 = this.getTitle();
        const paraLocation = this.getLocation('h3');
        const paraDescription = this.getDescription();

        div.appendChild(h2);
        div.appendChild(paraLocation);
        div.appendChild(paraDescription);

        return div;
    }

    /**
     * Créer l'image en HTML
     * @return {HTMLImageElement}
     */
    getImage() {
        const img = document.createElement( 'img');
        img.setAttribute('src', this._picture);
        img.setAttribute('alt', `Image de ${this._name}`);

        return img;
    }

    /**
     * Créer le titre en HTML
     * @return {HTMLHeadingElement}
     */
    getTitle() {
        const heading = document.createElement( 'h2');
        heading.textContent = this._name;
        heading.classList.add('photographer-title');

        return heading;
    }

    /**
     * Créer un paragraphe de description
     * @return {HTMLHeadingElement | HTMLParagraphElement}
     */
    getLocation(tag) {
        const para = document.createElement( tag);
        para.textContent = this._location;
        para.classList.add('photographer-location');
        para.setAttribute('aria-hidden', 'true');

        return para;
    }

    /**
     * Créer un paragraphe de description
     * @return {HTMLParagraphElement}
     */
    getDescription() {
        const para = document.createElement( 'p' );
        para.textContent = this._tagline;
        para.classList.add('photographer-description');
        para.setAttribute('aria-hidden', 'true');

        return para;
    }

    /**
     * Créer une balise small pour afficher le prix
     * @return {HTMLElement}
     */
    getPrice() {
        const small = document.createElement( 'small' );
        small.textContent = this._price;
        small.classList.add('photographer-price');
        small.setAttribute('aria-hidden', 'true');

        return small;
    }


}
