import { render, remove } from '../framework/render';
import FilmsListSection from '../view/films-list/films-list-section-view';
import FilmsListContainer from '../view/films-list/films-list-container-view';
import FilmsListTitle from '../view/films-list/films-list-title-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import FilmsCard from '../view/film-card';
import FilmsPopup from '../view/film-popup';
import SortView from '../view/sort-view';
import { isEsc } from '../util';
import { StatusMap } from '../main-const';

const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #siteBodyElement = document.body;
  #bodyHiddenClass = 'hide-overflow';
  #filmsListSection = new FilmsListSection();
  #filmsListContainer = new FilmsListContainer();
  #filmsShowMoreBtn = new FilmsShowMoreBtn();

  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPopup = null;

  constructor(mainContainer, filmsModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.get()];
    this.#renderFilms();
  };

  #renderFilms = () => {
    if (!this.#films.length) {
      render(this.#filmsListSection, this.#mainContainer);
      render(
        new FilmsListTitle({ titleText: StatusMap['All movies'] }),
        this.#filmsListSection.element,
      );
    } else {
      render(new SortView(), this.#mainContainer);
      render(this.#filmsListSection, this.#mainContainer);
      render(
        new FilmsListTitle({ titleText: 'All movies. Upcoming', hidden: true }),
        this.#filmsListSection.element,
      );
      render(this.#filmsListContainer, this.#filmsListSection.element);

      this.#films.forEach((film, i) => {
        if (i < Math.min(this.#films.length, FILM_COUNT_PER_STEP)) {
          this.#renderFilm(film);
        }
      });

      if (this.#films.length > FILM_COUNT_PER_STEP) {
        render(this.#filmsShowMoreBtn, this.#filmsListSection.element);

        this.#filmsShowMoreBtn.setClickHandler(this.#onFilmsShowMoreBtnClick);
      }
    }
  };

  #onFilmsShowMoreBtnClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach(this.#renderFilm);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#filmsShowMoreBtn);
    }
  };

  #onFilmCardClick = (film) => this.#renderPopup(film);

  #renderFilm = (film) => {
    const filmComponent = new FilmsCard(film);
    filmComponent.setClickHandler(this.#onFilmCardClick);
    render(filmComponent, this.#filmsListContainer.element);
  };

  #onEscKeyDown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.#removePopup();
    }
  };

  #renderPopup = (film) => {
    this.#removePopup();
    const comments = this.#commentsModel.get(film);
    this.#filmPopup = new FilmsPopup(film, comments);
    this.#siteBodyElement.classList.add(this.#bodyHiddenClass);
    this.#filmPopup.setCloseClickHandler(this.#removePopup);
    document.addEventListener('keydown', this.#onEscKeyDown);
    render(this.#filmPopup, this.#siteBodyElement);
  };

  #removePopup = () => {
    this.#siteBodyElement.classList.remove(this.#bodyHiddenClass);
    if (this.#filmPopup) {
      remove(this.#filmPopup);
      this.#filmPopup = null;
    }
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
