import { render, remove } from 'src/framework/render';
import FilmsListSection from 'src/view/films-list/films-list-section-view';
import FilmsListContainer from 'src/view/films-list/films-list-container-view';
import FilmsListTitle from 'src/view/films-list/films-list-title-view';
import FilmsShowMoreBtn from 'src/view/films-show-more-btn-view';
import FilmCardPresenter from 'src/presenter/film-card-presenter';

const FILM_COUNT_PER_STEP = 2;

export default class AbstractFilmsPresenter {
  _renderedFilmCount = FILM_COUNT_PER_STEP;
  #mainContainer = null;
  #filmsListContainer = new FilmsListContainer();
  #filmsListTitle = null;
  #filmsListSection = null;
  #filmsShowMoreBtn = null;

  #filmCardPresenter = new Map();
  #filmPopupPresenter = null;

  #filmsModel = null;
  #commentsModel = null;

  #handleViewAction = null;

  constructor({
    mainContainer,
    filmsModel,
    filmsPopupPresenter,
    commentsModel,
    navigationModel,
    navigationPresenter,
    handleViewAction,
  }) {
    if (new.target === AbstractFilmsPresenter) {
      throw new Error('Can not instantiate AbstractFilmsPresenter, only concrete one.');
    }
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filmPopupPresenter = filmsPopupPresenter;
    this.#handleViewAction = handleViewAction;
  }

  _renderFilms = (films) => films.forEach(this._renderFilm);

  _renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(
      this.#filmsListContainer.element,
      this.#filmPopupPresenter,
      this.#handleViewAction,
    );
    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  _renderFilmsListTitle = (config) => {
    this.#filmsListTitle = new FilmsListTitle(config);
    render(this.#filmsListTitle, this.#filmsListSection.element);
  };

  _renderListSection = (config) => {
    this.#filmsListSection = new FilmsListSection(config);
    render(this.#filmsListSection, this.#mainContainer);
  };

  _renderShowMoreBtn = () => {
    this.#filmsShowMoreBtn = new FilmsShowMoreBtn();
    this.#filmsShowMoreBtn.setClickHandler(this.#onFilmsShowMoreBtnClick);
    render(this.#filmsShowMoreBtn, this.#filmsListSection.element);
  };

  #onFilmsShowMoreBtnClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmsCount = Math.min(
      filmsCount,
      this._renderedFilmCount + FILM_COUNT_PER_STEP,
    );
    const films = this.films.slice(this._renderedFilmCount, newRenderedFilmsCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmsCount;

    if (this._renderedFilmCount >= filmsCount) {
      remove(this.#filmsShowMoreBtn);
    }
  };
}
