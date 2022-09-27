import { render, remove, replace } from '../framework/render';
import FilmsCard from '../view/film-card';
import FilmPopupPresenter from './film-popup-presenter';

export default class FilmPresenter {
  #container = null;
  #film = null;
  #filmComponent = null;
  #commentsModel = null;
  #changeData = null;

  constructor(container, commentsModel, changeData) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
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
    this.init()
  };

  #onFilmCardClick = (film) => new FilmPopupPresenter(this.#commentsModel, this.#changeData).init(film);

  destroy = () => {
    remove(this.#filmComponent);
  };
}
