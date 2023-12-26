import { MediaVideoModel } from '../../core/models/media-video-model.js';

export class CarousselComponent {
  constructor() {
    this._count = 0;
  }

  /**
   * Construit le caroussel lors du chargement de la page
   * @return {HTMLDivElement}
   */
  buildCaroussel() {
    const caroussel = document.createElement('div');
    caroussel.classList.add('bloc-caroussel', 'hide-caroussel');
    caroussel.tabIndex = 0;
    caroussel.appendChild(this._getCloseCross());

    return caroussel;
  }

  /**
   * Affiche le caroussel
   * @param indexMedia
   * @param medias
   */
  showCaroussel(indexMedia, medias) {
    this._count = indexMedia;
    const caroussel = document.querySelector('.bloc-caroussel');
    caroussel.focus();
    console.log('A');

    const nodeMedia = this._getMedia(indexMedia, medias);
    const blockButtons = document.createElement('div');
    blockButtons.classList.add('bloc-buttons');

    if (document.querySelector('.block-image-and-text')) {
      caroussel.removeChild(document.querySelector('.block-image-and-text'));
    }

    caroussel.appendChild(nodeMedia);
    caroussel.classList.remove('hide-caroussel');

    if (!document.querySelector('.previous') && !document.querySelector('.next')) {
      blockButtons.appendChild(this._previousButton(medias));
      blockButtons.appendChild(this._nextButton(medias));
      caroussel.appendChild(blockButtons);
      document.body.addEventListener('keydown', (event) => {
        if (!document.querySelector('.hide-caroussel')) {
          if (event.key === 'Escape') this._hideCaroussel();
        }
        if (event.key === 'ArrowRight') this._nextEvent(medias);
        if (event.key === 'ArrowLeft') this._previousEvent(medias);
      });
    }

    document.body.classList.add('overflow-hidden');
  }

  /**
   * Event du bouton de fermeture du caroussel
   * @private
   */
  _hideCaroussel() {
    document.querySelector('.bloc-caroussel').classList.add('hide-caroussel');
    document.body.classList.remove('overflow-hidden');
    document.getElementsByClassName('media-item')[this._count ?? 0].focus();
  }

  /**
   * Bouton de fermeture du caroussel
   * @return {HTMLElement}
   * @private
   */
  _getCloseCross() {
    const buttonClose = document.createElement('i');
    buttonClose.setAttribute('class', 'fas fa-xmark fa-solid');
    buttonClose.classList.add('close');
    buttonClose.addEventListener('click', this._hideCaroussel);

    return buttonClose;
  }

  /**
   * Bouton "suivante"
   * @param medias
   * @return {HTMLElement}
   * @private
   */
  _previousButton(medias) {
    const button = document.createElement('i');
    button.setAttribute('class', 'fas fa-chevron-left fa-solid');
    button.classList.add('previous');
    button.tabIndex = 0;
    button.addEventListener('click', () => {
      this._previousEvent(medias);
    });
    button.addEventListener('keydown', event => {
      event.stopPropagation();
      if (event.key === 'Enter') this._previousEvent(medias);
    });

    return button;
  }

  /**
   * Bouton "suivante"
   * @param medias
   * @return {HTMLElement}
   * @private
   */
  _nextButton(medias) {
    const button = document.createElement('i');
    button.setAttribute('class', 'fas fa-chevron-right fa-solid');
    button.classList.add('next');
    button.tabIndex = 0;
    button.addEventListener('click', () => this._nextEvent(medias));
    button.addEventListener('keydown', event => {
      event.stopPropagation();
      if (event.key === 'Enter') this._nextEvent(medias);
    });

    return button;
  }

  /**
   * Event du bouton "précédente"
   * @param medias
   * @private
   */
  _previousEvent(medias) {
    this._count--;
    if (this._count < 0) this._count = medias.length - 1;

    const nodeMedia = this._getMedia(this._count, medias);

    if (document.querySelector('.block-image-and-text')) {
      document.querySelector('.bloc-caroussel').removeChild(document.querySelector('.block-image-and-text'));
    }
    document.querySelector('.bloc-caroussel').appendChild(nodeMedia);
  }

  /**
     Event du bouton "suivante"
     * @param medias
     * @private
     */
  _nextEvent(medias) {
    this._count++;
    if (this._count > medias.length - 1) this._count = 0;

    const nodeMedia = this._getMedia(this._count, medias);

    if (document.querySelector('.block-image-and-text')) {
      document.querySelector('.bloc-caroussel').removeChild(document.querySelector('.block-image-and-text'));
    }
    document.querySelector('.bloc-caroussel').appendChild(nodeMedia);
  }

  /**
   * Créé la partie image et titre
   * @param indexMedia
   * @param medias
   * @return {HTMLDivElement}
   * @private
   */
  _getMedia(indexMedia, medias) {
    // 1. Titre
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = medias[indexMedia].title;

    // 1. Div qui va contenir le titre
    const blockParaTitle = document.createElement('div');
    blockParaTitle.classList.add('block-para-title');
    blockParaTitle.appendChild(title);

    let imageOrVideo;
    if (medias[indexMedia] instanceof MediaVideoModel) {
      imageOrVideo = document.createElement('video');
      const source = document.createElement('source');
      source.src = `${medias[indexMedia].src}#t=0.1`;
      source.type = `video/mp4`;

      const track = document.createElement('track');
      track.kind = 'captions';
      track.srclang = 'fr';
      track.label = 'Français';
      imageOrVideo.appendChild(source);
      imageOrVideo.appendChild(track);
      // imageOrVideo.addEventListener('keydown', (event) => {
      //   // event.preventDefault();
      //   imageOrVideo.paused && event.key === 'Enter' ? imageOrVideo.play() : imageOrVideo.pause();
      // });
    } else {
      imageOrVideo = document.createElement('img');
      imageOrVideo.alt = medias[indexMedia].alt;
      imageOrVideo.src = medias[indexMedia].src;
    }

    imageOrVideo.classList.add(medias[indexMedia] instanceof MediaVideoModel ? 'video-caroussel' : 'image-caroussel');

    if (medias[indexMedia] instanceof MediaVideoModel) {
      const source = document.createElement('source');
      source.src = medias[indexMedia].src;
      source.type = 'video/mp4';
      imageOrVideo.controls = true;
      imageOrVideo.appendChild(source);
    } else {
      imageOrVideo.src = medias[indexMedia].src;
      imageOrVideo.alt = medias[indexMedia].alt;
    }
    imageOrVideo.tabIndex = 0;

    // 2. Div qui va contenir l'image ou la video
    const blockMedia = document.createElement('div');
    blockMedia.classList.add('block-media');
    blockMedia.appendChild(imageOrVideo);

    // Div qui va contenir 1 et 2
    const blockImageAndText = document.createElement('div');
    blockImageAndText.classList.add('block-image-and-text');

    blockImageAndText.appendChild(blockMedia);
    blockImageAndText.appendChild(blockParaTitle);

    return blockImageAndText;
  }
}
