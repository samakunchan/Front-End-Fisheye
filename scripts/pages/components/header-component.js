import { redirectToThisUrl } from '../../utils/utils.js';

export class HeaderComponent {
    constructor() {}

    headerTemplate() {
        return {
            getLogoDOM: () => this._getLogoDOM(),
        }
    }

    _getLogoDOM() {
        const logo = document.createElement('img');
        logo.alt = `Logo du site Fisheye`;
        logo.src = `assets/images/logo.png`;
        logo.classList.add('logo');

        const linkLogo = document.createElement('a');
        linkLogo.href = redirectToThisUrl('index');
        linkLogo.setAttribute('aria-label', `Page d'acceuil du site`);
        linkLogo.appendChild(logo);

        return linkLogo;
    }
}
