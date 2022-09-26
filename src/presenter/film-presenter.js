import { render, remove } from '../framework/render';
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
    this.#filmComponent = new FilmsCard(this.#film);
    this.#filmComponent.setClickHandler(this.#onFilmCardClick);
    render(this.#filmComponent, this.#container);
  };

  #onFilmCardClick = (film) => new FilmPopupPresenter(this.#commentsModel).init(film);
}
