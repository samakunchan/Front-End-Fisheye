export class AbstractMediaModel {
  constructor(data) {
    const { id, photographerId, title, likes, date, price, name } = data;
    this._id = id;
    this._photographerId = photographerId;
    this._title = title;
    this._likes = likes;
    this._date = date;
    this._price = price;
    this._name = name;
  }

  /**
   * @return {number}
   */
  get id() {
    return this._id;
  }

  /**
   * @return {number}
   */
  get photographerId() {
    return this._photographerId;
  }

  /**
   * @return {string}
   */
  get title() {
    return this._title;
  }

  /**
   * @param likes
   */
  set likes(likes) {
    this._likes = likes;
  }

  /**
   * @return {number}
   */
  get likes() {
    return this._likes;
  }

  /**
   * @return {string}
   */
  get date() {
    return this._date;
  }

  /**
   * @return {string}
   */
  get price() {
    return `${this._price}€ / jour`;
  }

  /**
   * @return {string}
   */
  get src() {
    return `chemin/vers/la/video`;
  }

  /**
   * @return {string}
   */
  get alt() {
    return `ajouter une description ici`;
  }

  /**
   * @return {string}
   */
  get name() {
    return this._name
      .split(' ')
      .map((text) => text.toLowerCase())
      .join('-');
  }
}
