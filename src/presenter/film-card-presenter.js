import { render, remove, replace } from '../framework/render';
import FilmsCard from '../view/film-card';
import { UserAction, UpdateType } from '../main-const';

export default class FilmCardPresenter {
  #container = null;
  #film = null;
  #filmComponent = null;
  #changeData = null;
  #filmPopupPresenter = null;

  constructor(container, popupPresenter, changeData) {
    this.#container = container;
    this.#filmPopupPresenter = popupPresenter;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;
    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmsCard(this.#film);
    this.#filmComponent.setClickHandler(this.#onFilmCardClick);
    this.#filmComponent.setFavoriteClickHandler(this.#onFavoriteBtnClick);
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
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, { updatedFilm });
  };

  #onWatchListBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    };

    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, { updatedFilm });
  };

  #onWatchedBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, { updatedFilm });
  };

  #onFilmCardClick = (film) => {
    const currentFilm = this.#filmPopupPresenter?.currentFilm;
    if (currentFilm?.id !== film.id) {
      this.#filmPopupPresenter.init(film);
    }
  };

  destroy = () => {
    remove(this.#filmComponent);
  };
}
