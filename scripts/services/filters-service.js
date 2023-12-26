import { PhotographerRepositoryFactory } from '../core/factories/photographer-repository-factory.js';
import { idParam, realTypeText } from '../utils/utils.js';
import { PhotographersService } from './photographers-service.js';

export class FiltersService {
  constructor() {
    this.buildSelects();
    this.handleUpdateFilter();
  }

  /**
   * Construit les élements selects
   */
  buildSelects() {
    const customSelect = [...document.getElementsByClassName('custom-select')];
    let initDone = false;

    customSelect.forEach((select) => {
      const currentSelect = select.getElementsByTagName('select')[0];
      const divSelected = document.createElement('div');
      this.buildDivSelectSelected(currentSelect, divSelected, select);
      this.buildDivSelectItem(currentSelect, divSelected, select, initDone);
      this.activeCloseEvent();
    });
  }

  /**
   * Construit la div de la class 'select-selected'
   * @param currentSelect
   * @param divSelected
   * @param select
   */
  buildDivSelectSelected(currentSelect, divSelected, select) {
    divSelected.setAttribute('class', 'select-selected');
    divSelected.setAttribute('tabindex', '0');
    divSelected.innerHTML = currentSelect.options[currentSelect.selectedIndex].innerHTML;

    select.appendChild(divSelected);
  }

  /**
   * Construit la div de la class 'select-items'
   * @param currentSelect
   * @param divSelected
   * @param select
   * @param initDone
   */
  buildDivSelectItem(currentSelect, divSelected, select, initDone) {
    const divSelectItem = document.createElement('div');
    divSelectItem.setAttribute('class', 'select-items select-hide');

    [...currentSelect].forEach((current) => {
      const sameAsSelectedFilter = document.createElement('div');
      sameAsSelectedFilter.innerHTML = current.innerHTML;
      if (!initDone) {
        sameAsSelectedFilter.setAttribute('class', 'same-as-selected hidden');
        initDone = true;
      }
      sameAsSelectedFilter.setAttribute('tabindex', '0');

      sameAsSelectedFilter.addEventListener('click', () => {
        this.updateFilter(sameAsSelectedFilter, currentSelect);
      });

      sameAsSelectedFilter.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;
        this.updateFilter(sameAsSelectedFilter, currentSelect);
      });

      divSelectItem.appendChild(sameAsSelectedFilter);
    });

    select.appendChild(divSelectItem);

    divSelected.addEventListener('click', (eventClick) => {
      this.eventDivSelected(eventClick, divSelected);
    });

    divSelected.addEventListener('keydown', (eventKeyboard) => {
      if (eventKeyboard.key !== 'Enter') return;
      this.eventDivSelected(eventKeyboard, divSelected);
    });
  }

  /**
   * Event du click sur la div principale 'custom-select'
   * @param event
   * @param divSelected
   */
  eventDivSelected(event, divSelected) {
    event.stopPropagation();
    this.handleBackGround();

    let storage = [];
    const selectItem = document.getElementsByClassName('select-items');
    const selectedItem = document.getElementsByClassName('select-selected');

    [...selectedItem].forEach((selected, index) => {
      if (divSelected === selected) {
        storage.push(index);
      } else {
        selected.classList.remove('select-arrow-active');
      }
    });

    [...selectItem].forEach((item, index) => {
      if (storage.indexOf(index)) {
        item.classList.add('select-hide');
      }
    });

    divSelected.nextSibling.classList.toggle('select-hide');
    divSelected.classList.toggle('select-arrow-active');
  }

  /**
   * Change dynamiquement le faux filter
   * @param sameAsSelectedFilter
   * @param currentSelect
   */
  updateFilter(sameAsSelectedFilter, currentSelect) {
    const parentsSelectForClick = [...sameAsSelectedFilter.parentNode.parentNode.getElementsByTagName('select')][0];
    const previousSiblingForClick = sameAsSelectedFilter.parentNode.previousSibling;

    [...parentsSelectForClick].forEach((parent, index) => {
      if (parent.innerHTML === sameAsSelectedFilter.innerHTML) {
        parentsSelectForClick.selectedIndex = index;

        previousSiblingForClick.innerHTML = sameAsSelectedFilter.innerHTML;
        const parentsSameAsSelectForClick = [
          ...sameAsSelectedFilter.parentNode.getElementsByClassName('same-as-selected'),
        ];
        parentsSameAsSelectForClick.forEach((parentSameAsSelect) => {
          parentSameAsSelect.style.display = 'flex';
          parentSameAsSelect.removeAttribute('class');
        });
        sameAsSelectedFilter.setAttribute('class', 'same-as-selected');
        sameAsSelectedFilter.setAttribute('data-value', currentSelect.options[currentSelect.selectedIndex].value);
        sameAsSelectedFilter.style.display = 'none';
      }
    });

    previousSiblingForClick.click();
  }

  /**
   * Gestion du background des icones
   */
  handleBackGround() {
    const selectInp = document.getElementsByClassName('select-selected')[0];
    const backgroundImageOpen = `url("${window.location.protocol}//${window.location.host}/${
      window.location.pathname.split('/')[1]
    }/assets/icons/arrow-up.svg")`;
    const backgroundImageClose = `url("${window.location.protocol}//${window.location.host}/${
      window.location.pathname.split('/')[1]
    }/assets/icons/arrow-down.svg")`;

    if (selectInp.style.backgroundImage === backgroundImageOpen) {
      selectInp.style.backgroundImage = backgroundImageClose;
      selectInp.style.borderBottomLeftRadius = '5px';
      selectInp.style.borderBottomRightRadius = '5px';
    } else {
      selectInp.style.backgroundImage = backgroundImageOpen;
      selectInp.style.borderBottomLeftRadius = '0px';
      selectInp.style.borderBottomRightRadius = '0px';
    }
  }

  /**
   * Gère la fermeture du faux filter au clic et au clavier
   */
  activeCloseEvent() {
    document.addEventListener('click', (event) => {
      this.closeAllSelect(event);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      this.closeAllSelect(event);
    });
  }

  /**
   * Fermeture du faux filter
   * @param event
   */
  closeAllSelect(event) {
    let arrNo = [];
    const selectItems = document.getElementsByClassName('select-items');
    const selectedItems = document.getElementsByClassName('select-selected');
    [...selectedItems].forEach((item, index) => {
      if (event === item) {
        arrNo.push(index);
      } else {
        item.classList.remove('select-arrow-active');
      }
    });

    [...selectItems].forEach((item, index) => {
      if (arrNo.indexOf(index)) {
        item.classList.add('select-hide');
      }
    });
  }

  /**
   * Cherche les infos dans le repository afin d'effectuer la mise à jour des données
   */
  handleUpdateFilter() {
    const items = document.getElementsByClassName('select-items')[0].getElementsByTagName('div');
    [...items].forEach((item) => {
      item.addEventListener('click', async (event) => {
        const value = event.target.getAttribute('data-value');
        const oneJSON = await new PhotographerRepositoryFactory(realTypeText, idParam, value);
        this.addToNodesMedia(oneJSON);
      });
      item.addEventListener('keydown', async (event) => {
        const value = event.target.getAttribute('data-value');
        if (event.key !== 'Enter') return;
        const oneJSON = await new PhotographerRepositoryFactory(realTypeText, idParam, value);
        this.addToNodesMedia(oneJSON);
        const selectedSelect = document.getElementsByClassName('select-selected');
        selectedSelect[0].focus();
      });
    });
  }

  /**
   * Construction et reconstruction du DOM à partir.
   * Gère le filtrage des données.
   * @param media
   */
  addToNodesMedia(media) {
    document.getElementById('main').removeChild(document.querySelector('.photograph-results'));
    const photographerTemplate = new PhotographersService(media).photographerTemplate();
    const photographerMedias = photographerTemplate.getMediasDOM();

    document.getElementById('main').appendChild(photographerMedias);
  }
}
