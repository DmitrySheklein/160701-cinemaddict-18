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

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  setFavotiteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this.#film);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick(this.#film);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick(this.#film);
  };
}
