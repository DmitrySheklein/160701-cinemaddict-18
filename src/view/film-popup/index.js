import { createElement } from '../../render';
import createFilmsPopupTemplate from './film-popup-view';

export default class FilmsPopup {
  #element = null;
  #film = null;
  #comments = [];

  constructor(film, comments) {
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmsPopupTemplate(this.#film, this.#comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
