import { render, remove, replace } from '../framework/render';
import FilmsCard from '../view/film-card';
import FilmPopupPresenter from './film-popup-presenter';

export default class FilmPresenter {
  #container = null;
  #film = null;
  #filmComponent = null;
  #commentsModel = null;

  constructor(container, commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
  }

  init = (film) => {
    this.#film = film;
    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmsCard(this.#film);
    this.#filmComponent.setClickHandler(this.#onFilmCardClick);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#container);

      return;
    }

    if (this.#container.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  #onFilmCardClick = (film) => new FilmPopupPresenter(this.#commentsModel).init(film);

  destroy = () => {
    remove(this.#filmComponent);
  };
}
