import { render, remove } from '../framework/render';
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
  #filmsShowMoreBtn = null;
  #sortView = null;
  #filmListTitle = null;

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
    const films = this.films;
    const filmsCount = films.length;

    if (filmsCount) {
      this.#renderSort();
    }
    render(this.#filmsListSection, this.#mainContainer);
    if (!filmsCount) {
      this.#renderFilmsListTitle({ titleText: StatusMap['All movies'] });

      return;
    }

    this.#renderFilmsListTitle({ titleText: 'All movies. Upcoming', hidden: true });

    render(this.#filmsListContainer, this.#filmsListSection.element);
    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmCount)));

    if (this.#renderedFilmCount < filmsCount) {
      this.#renderShowMoreBtn();
    }
  };

  #renderFilms = (films) => films.forEach(this.#renderFilm);

  #renderFilmsListTitle = (config) => {
    this.#filmListTitle = new FilmsListTitle(config);
    render(this.#filmListTitle, this.#filmsListSection.element);
  };

  #onSortChange = (sortType) => {
    if (this.#currentFilmSort === sortType) {
      return;
    }

    this.#currentFilmSort = sortType;
    this.#clearFilmsBoard();
    this.#renderFilmsBoard();
  };

  #renderSort = () => {
    this.#sortView = new SortView(this.#currentFilmSort);
    this.#sortView.setSortTypeHandler(this.#onSortChange);

    render(this.#sortView, this.#mainContainer);
  };

  #renderShowMoreBtn = () => {
    this.#filmsShowMoreBtn = new FilmsShowMoreBtn();
    this.#filmsShowMoreBtn.setClickHandler(this.#onFilmsShowMoreBtnClick);
    render(this.#filmsShowMoreBtn, this.#filmsListSection.element);
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

  #clearFilmsBoard = ({ resetRenderedFilmCount = false, resetSortType = false } = {}) => {
    const filmsCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#filmsShowMoreBtn);
    remove(this.#sortView);
    remove(this.#filmListTitle);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentFilmSort = SortType.DEFAULT;
    }
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
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderFilmsBoard();
        break;
    }
  };
}
