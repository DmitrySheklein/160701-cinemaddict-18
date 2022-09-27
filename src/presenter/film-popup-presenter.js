import { render, remove, replace } from '../framework/render';
import FilmsPopup from '../view/film-popup';
import { isEsc } from '../util';

export default class FilmPopupPresenter {
  #siteBodyElement = document.body;
  #bodyHiddenClass = 'hide-overflow';
  #filmPopup = null;
  #commentsModel = null;
  #changeData = null;
  #film = null;

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;
    const prevPopupComponent = this.#filmPopup;
    const comments = this.#commentsModel.get(this.#film);
    this.#filmPopup = new FilmsPopup(this.#film, comments);
    this.#siteBodyElement.classList.add(this.#bodyHiddenClass);
    this.#filmPopup.setCloseClickHandler(this.#removePopup);
    this.#filmPopup.setFavotiteClickHandler(this.#onFavoriteBtnClick);
    this.#filmPopup.setWatchListClickHandler(this.#onWatchListBtnClick);
    this.#filmPopup.setWatchedClickHandler(this.#onWatchedBtnClick);
    document.addEventListener('keydown', this.#onEscKeyDown);

    if (prevPopupComponent === null) {
      render(this.#filmPopup, this.#siteBodyElement);

      return;
    }

    if (this.#siteBodyElement.contains(prevPopupComponent.element)) {
      replace(this.#filmPopup, prevPopupComponent);
    }

    remove(prevPopupComponent);
  };

  #onEscKeyDown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.#removePopup();
    }
  };

  #onFavoriteBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    };
    this.#changeData(updatedFilm);
    this.init(updatedFilm);
  };

  #onWatchListBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    };
    this.#changeData(updatedFilm);
    this.init(updatedFilm);
  };

  #onWatchedBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    };
    this.#changeData(updatedFilm);
    this.init(updatedFilm);
  };

  #removePopup = () => {
    this.#siteBodyElement.classList.remove(this.#bodyHiddenClass);
    if (this.#filmPopup) {
      remove(this.#filmPopup);
      this.#filmPopup = null;
    }
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
