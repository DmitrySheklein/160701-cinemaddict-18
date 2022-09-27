import { render, remove } from '../framework/render';
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
    this.#renderPopup(film);
    this.#film = film;
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

  #renderPopup = (film) => {
    this.#removePopup();
    const comments = this.#commentsModel.get(film);
    this.#filmPopup = new FilmsPopup(film, comments);
    this.#siteBodyElement.classList.add(this.#bodyHiddenClass);
    this.#filmPopup.setCloseClickHandler(this.#removePopup);
    this.#filmPopup.setFavotiteClickHandler(this.#onFavoriteBtnClick);
    this.#filmPopup.setWatchListClickHandler(this.#onWatchListBtnClick);
    this.#filmPopup.setWatchedClickHandler(this.#onWatchedBtnClick);
    document.addEventListener('keydown', this.#onEscKeyDown);
    render(this.#filmPopup, this.#siteBodyElement);
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
