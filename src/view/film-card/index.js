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

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(this.#film);
  };

  setFavotiteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this.#film);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick(this.#film);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick(this.#film);
  };
}
