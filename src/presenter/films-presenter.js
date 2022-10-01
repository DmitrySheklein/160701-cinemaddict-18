import { render, remove } from '../framework/render';
import NavigationView from '../view/navigation-view';
import { generateNavigation } from '../mock/navigation';
import FilmsListSection from '../view/films-list/films-list-section-view';
import FilmsListContainer from '../view/films-list/films-list-container-view';
import FilmsListTitle from '../view/films-list/films-list-title-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import SortView from '../view/sort-view';
import { StatusMap } from '../main-const';
import FilmPresenter from './film-presenter';
import { SortType, UserAction, UpdateType } from '../main-const';
import { sortFilmsDate, sortFilmsRating } from '../util';
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

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentFilmSort = SortType.DEFAULT;
  #filmPopupPresenter = null;

  constructor(mainContainer, filmsModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel = commentsModel;
    this.#filmPopupPresenter = new FilmPopupPresenter(this.#commentsModel, this.#handleFilmChange);
  }

  get films() {
    switch (this.#currentFilmSort) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortFilmsDate);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortFilmsRating);
    }
    return this.#filmsModel.films;
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    if (this.films.length) {
      this.#renderNavigation();
      this.#renderSort();
    }
    render(this.#filmsListSection, this.#mainContainer);
    if (!this.films.length) {
      this.#renderFilmsListTitle({ titleText: StatusMap['All movies'] });

      return;
    }

    this.#renderFilmsListTitle({ titleText: 'All movies. Upcoming', hidden: true });
    this.#renderFilmsList();
  };

  #renderFilms = (films) => films.forEach(this.#renderFilm);

  #renderFilmsList = () => {
    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, this.#renderedFilmCount));

    render(this.#filmsListContainer, this.#filmsListSection.element);
    this.#renderFilms(films);

    if (this.#renderedFilmCount < filmsCount) {
      this.#renderShowMoreBtn();
    }
  };

  #renderNavigation = () => {
    const filmsNavigation = generateNavigation(this.#filmsModel.films);

    render(new NavigationView(filmsNavigation), this.#mainContainer);
  };

  #renderFilmsListTitle = (config) => {
    render(new FilmsListTitle(config), this.#filmsListSection.element);
  };

  #onSortChange = (sortType) => {
    if (this.#currentFilmSort === sortType) {
      return;
    }

    this.#currentFilmSort = sortType;
    this.#clearFilmsBoard();
    this.#renderFilmsList();
  };

  #renderSort = () => {
    render(this.#sortView, this.#mainContainer);
    this.#sortView.setSortTypeHandler(this.#onSortChange);
  };

  #renderShowMoreBtn = () => {
    render(this.#filmsShowMoreBtn, this.#filmsListSection.element);

    this.#filmsShowMoreBtn.setClickHandler(this.#onFilmsShowMoreBtnClick);
  };

  #onFilmsShowMoreBtnClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(
      filmsCount,
      this.#renderedFilmCount + FILM_COUNT_PER_STEP,
    );
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmsCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmsCount;

    if (this.#renderedFilmCount >= filmsCount) {
      remove(this.#filmsShowMoreBtn);
    }
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsListContainer.element,
      this.#filmPopupPresenter,
      this.#handleViewAction,
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
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

    if (this.#filmPopupPresenter?.currentFilm) {
      this.#filmPopupPresenter.init(updatedFilm);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  };
}
