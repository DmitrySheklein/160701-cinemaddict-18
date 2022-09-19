import AbstractView from '../../framework/view/abstract-view';
import createFilmsPopupTemplate from './film-popup-view';

export default class FilmsPopup extends AbstractView {
  #film = null;
  #comments = [];

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmsPopupTemplate(this.#film, this.#comments);
  }
}
