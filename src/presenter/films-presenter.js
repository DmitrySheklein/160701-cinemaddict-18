import { render, remove } from '../framework/render';
import NavigationView from '../view/navigation-view';
import { generateNavigation } from '../mock/navigation';
import FilmsListSection from '../view/films-list/films-list-section-view';
import FilmsListContainer from '../view/films-list/films-list-container-view';
import FilmsListTitle from '../view/films-list/films-list-title-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import SortView from '../view/sort-view';
import { StatusMap } from '../main-const';
import { updateItem } from '../util';
import FilmPresenter from './film-presenter';
import FilmPopupPresenter from './film-popup-presenter';

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
  #filmPresenter = new Map();
  #filmPopupPresenter = null;

  constructor(mainContainer, filmsModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmPopupPresenter = new FilmPopupPresenter(this.#commentsModel, this.#handleFilmChange);
  }

  init = () => {
    this.#films = [...this.#filmsModel.get()];
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    if (this.#films.length) {
      this.#renderNavigation();
      this.#renderSort();
    }
    render(this.#filmsListSection, this.#mainContainer);
    if (!this.#films.length) {
      this.#renderFilmsListTitle({ titleText: StatusMap['All movies'] });

      return;
    }

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

  #renderNavigation = () => {
    const filmsNavigation = generateNavigation(this.#filmsModel.get());

    render(new NavigationView(filmsNavigation), this.#mainContainer);
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
    const filmPresenter = new FilmPresenter(
      this.#filmsListContainer.element,
      this.#filmPopupPresenter,
      this.#handleFilmChange,
    );
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #clearFilmsBoard = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#filmsShowMoreBtn);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };
}
