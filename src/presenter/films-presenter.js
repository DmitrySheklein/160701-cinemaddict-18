import { render, remove, RenderPosition } from '../framework/render';
import FilmsContainer from '../view/films-container-view';
import FilmsListSection from '../view/films-list/films-list-section-view';
import FilmsListContainer from '../view/films-list/films-list-container-view';
import FilmsListTitle from '../view/films-list/films-list-title-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import SortView from '../view/sort-view';
import { StatusTitleMap } from '../main-const';
import FilmCardPresenter from './film-card-presenter';
import { SortType, UserAction, UpdateType, NavigationType } from '../main-const';
import { sortFilmsDate, sortFilmsRating } from '../utils/sort';
import FilmPopupPresenter from './film-popup-presenter';
import { NavigationFilter } from '../main-const';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const FILM_COUNT_PER_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class FilmsPresenter {
  #filmsContainer = new FilmsContainer();
  #filmsListSection = new FilmsListSection();
  #filmsListContainer = new FilmsListContainer();
  #loadingComponent = new LoadingView();
  #filmsShowMoreBtn = null;
  #sortView = null;
  #filmListTitle = null;

  #mainContainer = null;

  #filmsModel = null;
  #commentsModel = null;
  #navigationModel = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentFilmSort = SortType.DEFAULT;
  #navigationType = NavigationType.ALL.id;
  #filmPopupPresenter = null;
  #navigationPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(mainContainer, filmsModel, commentsModel, navigationModel, navigationPresenter) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel = commentsModel;
    this.#navigationModel = navigationModel;
    this.#navigationPresenter = navigationPresenter;
    this.#navigationModel.addObserver(this.#handleModelEvent);
    this.#filmPopupPresenter = new FilmPopupPresenter(this.#commentsModel, this.#handleViewAction);
  }

  get films() {
    this.#navigationType = this.#navigationModel.currentNav;
    const films = this.#filmsModel.films;
    const filteredFilms = NavigationFilter[this.#navigationType](films);

    switch (this.#currentFilmSort) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmsDate);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmsRating);
    }
    return filteredFilms;
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    render(this.#filmsContainer, this.#mainContainer);
    render(this.#filmsListSection, this.#filmsContainer.element);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmsCount = films.length;

    if (filmsCount) {
      this.#renderSort();
    }

    if (!filmsCount) {
      this.#renderFilmsListTitle({ titleText: StatusTitleMap[this.#navigationType] });

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

    render(this.#sortView, this.#navigationPresenter.component.element, RenderPosition.AFTEREND);
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
    const filmCardPresenter = new FilmCardPresenter(
      this.#filmsListContainer.element,
      this.#filmPopupPresenter,
      this.#handleViewAction,
    );
    filmCardPresenter.init(film);
    this.#filmPresenter.set(film.id, filmCardPresenter);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#filmsListSection.element);
  };

  #clearFilmsBoard = ({ resetRenderedFilmCount = false, resetSortType = false } = {}) => {
    const filmsCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#filmsShowMoreBtn);
    remove(this.#sortView);
    remove(this.#filmListTitle);
    remove(this.#filmsListSection);
    remove(this.#filmsListContainer);
    remove(this.#loadingComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentFilmSort = SortType.DEFAULT;
    }
  };

  #handleViewAction = async (actionType, updateType, data) => {
    this.#uiBlocker.block();
    const { from, updatedFilm, newCommentPart, deletedCommentId, filmId } = data;

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          await this.#filmsModel.updateFilm(updateType, updatedFilm);
        } catch (error) {
          switch (from) {
            case FilmCardPresenter.name:
              this.#filmPresenter.get(updatedFilm.id).setAborting();
              break;
            case FilmPopupPresenter.name:
              if (this.#filmPopupPresenter?.currentFilm) {
                this.#filmPopupPresenter.setAborting(actionType);
              }
          }
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmPopupPresenter.setDeleting(deletedCommentId);
        try {
          await this.#commentsModel.deleteComment(updateType, { deletedCommentId, filmId });
        } catch (error) {
          this.#filmPopupPresenter.setAborting(actionType);
        }

        break;
      case UserAction.ADD_COMMENT:
        this.#filmPopupPresenter.setSaving();
        try {
          await this.#commentsModel.addComment(updateType, { newCommentPart, filmId });
        } catch (error) {
          this.#filmPopupPresenter.setAborting(actionType);
        }

        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        if (this.#filmPopupPresenter?.currentFilm) {
          this.#filmPopupPresenter.init(data);
        }
        if (this.#navigationModel.currentNav !== NavigationType.ALL.id) {
          this.#handleModelEvent(UpdateType.MINOR);
        }
        break;
      case UpdateType.MINOR:
        this.#clearFilmsBoard({ resetRenderedFilmCount: true });
        this.#renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderFilmsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFilmsBoard();
        break;
    }
  };
}
