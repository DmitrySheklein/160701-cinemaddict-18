import { render, remove } from '../framework/render';
import FilmsListSection from '../view/films-list/films-list-section-view';
import FilmsListContainer from '../view/films-list/films-list-container-view';
import FilmsListTitle from '../view/films-list/films-list-title-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import SortView from '../view/sort-view';
import { StatusMap } from '../main-const';

import FilmPresenter from './film-presenter';

const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #filmsListSection = new FilmsListSection();
  #filmsListContainer = new FilmsListContainer();
  #filmsShowMoreBtn = new FilmsShowMoreBtn();
  #sortView = new SortView();

  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(mainContainer, filmsModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.get()];
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    render(this.#filmsListSection, this.#mainContainer);
    if (!this.#films.length) {
      this.#renderFilmsListTitle({ titleText: StatusMap['All movies'] });

      return;
    }
    this.#renderSort();
    this.#renderFilmsListTitle({ titleText: 'All movies. Upcoming', hidden: true });
    render(this.#filmsListContainer, this.#filmsListSection.element);
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreBtn();
    }
  };

  #renderFilms = (from, to) => {
    this.#films.slice(from, to).forEach(this.#renderFilm);
  };

  #renderFilmsListTitle = (config) => {
    render(new FilmsListTitle(config), this.#filmsListSection.element);
  };

  #renderSort = () => {
    render(this.#sortView, this.#mainContainer);
  };

  #renderShowMoreBtn = () => {
    render(this.#filmsShowMoreBtn, this.#filmsListSection.element);

    this.#filmsShowMoreBtn.setClickHandler(this.#onFilmsShowMoreBtnClick);
  };

  #onFilmsShowMoreBtnClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#filmsShowMoreBtn);
    }
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainer.element, this.#commentsModel);
    filmPresenter.init(film);
  };
}
