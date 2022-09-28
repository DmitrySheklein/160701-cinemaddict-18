import { render, remove, replace } from '../framework/render';
import FilmsCard from '../view/film-card';

export default class FilmPresenter {
  #container = null;
  #film = null;
  #filmComponent = null;
  #changeData = null;
  #filmPopupPresenter = null;

  constructor(container, popupPresenter, changeData) {
    this.#container = container;
    this.#changeData = changeData;
    this.#filmPopupPresenter = popupPresenter;
  }

  init = (film) => {
    this.#film = film;
    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmsCard(this.#film);
    this.#filmComponent.setClickHandler(this.#onFilmCardClick);
    this.#filmComponent.setFavotiteClickHandler(this.#onFavoriteBtnClick);
    this.#filmComponent.setWatchListClickHandler(this.#onWatchListBtnClick);
    this.#filmComponent.setWatchedClickHandler(this.#onWatchedBtnClick);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#container);

      return;
    }

    if (this.#container.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  #onFavoriteBtnClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    });
  };

  #onWatchListBtnClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    });
  };

  #onWatchedBtnClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #onFilmCardClick = (film) => {
    const currentFilm = this.#filmPopupPresenter.currentFilm;

    if (currentFilm?.id !== film.id) {
      this.#filmPopupPresenter.init(film);
    }
  };

  destroy = () => {
    remove(this.#filmComponent);
  };
}
