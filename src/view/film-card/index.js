import AbstractView from '../../framework/view/abstract-view';
import createFilmsCardTemplate from './film-card-view';

export default class FilmsCard extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmsCardTemplate(this.#film);
  }
}
