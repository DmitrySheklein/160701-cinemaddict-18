import { render } from 'src/framework/render';
import FilmsListTitle from 'src/view/films-list/films-list-title-view';
import FilmsListSection from 'src/view/films-list/films-list-section-view';
import FilmsListContainer from 'src/view/films-list/films-list-container-view';
import FilmCardPresenter from '../film-card-presenter';
import { sortFilmsRating } from 'src/utils/sort';

const FILM_COUNT_PER_STEP = 2;

export default class FilmsRatedPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #filmsListTitle = new FilmsListTitle({ titleText: 'Top rated' });
  #filmsListSection = new FilmsListSection(true);
  #filmsListContainer = new FilmsListContainer();

  #filmPopupPresenter = null;
  #filmPresenter = null;
  #handleViewAction = null;

  constructor(mainContainer, filmPresenter, filmsModel, filmsPopupPresenter, handleViewAction) {
    this.#mainContainer = mainContainer;
    this.#filmPresenter = filmPresenter;
    this.#filmsModel = filmsModel;
    this.#filmPopupPresenter = filmsPopupPresenter;
    this.#handleViewAction = handleViewAction;
  }

  init = () => {
    const films = this.#filmsModel.films;
    const someFilmWithRating = films.some((film) => film.filmInfo.totalRating > 0);

    if (!someFilmWithRating) {
      return;
    }
    const sortedFilms = [...films]
      .sort(sortFilmsRating)
      .filter((film) => film.filmInfo.totalRating);

    render(this.#filmsListSection, this.#mainContainer);
    render(this.#filmsListTitle, this.#filmsListSection.element);
    render(this.#filmsListContainer, this.#filmsListSection.element);

    this.#renderFilms(sortedFilms.slice(0, FILM_COUNT_PER_STEP));
  };

  #renderFilms = (films) => films.forEach(this.#renderFilm);

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(
      this.#filmsListContainer.element,
      this.#filmPopupPresenter,
      this.#handleViewAction,
    );
    filmCardPresenter.init(film);
    this.#filmPresenter.set(film.id, filmCardPresenter);
  };
}
