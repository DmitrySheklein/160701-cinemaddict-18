import { render, remove } from 'src/framework/render';
import FilmsListTitle from 'src/view/films-list/films-list-title-view';
import FilmsListSection from 'src/view/films-list/films-list-section-view';
import FilmsListContainer from 'src/view/films-list/films-list-container-view';
import FilmCardPresenter from 'src/presenter/film-card-presenter';
import { sortFilmsComments } from 'src/utils/sort';
import { UpdateType } from 'src/main-const';
const FILM_COUNT_PER_STEP = 2;

export default class FilmsCommentedPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmsListTitle = new FilmsListTitle({ titleText: 'Most commented' });
  #filmsListSection = new FilmsListSection(true);
  #filmsListContainer = new FilmsListContainer();

  #filmPopupPresenter = null;
  #filmPresenter = null;
  #handleViewAction = null;

  constructor(
    mainContainer,
    filmPresenter,
    filmsModel,
    commentsModel,
    filmsPopupPresenter,
    handleViewAction,
  ) {
    this.#mainContainer = mainContainer;
    this.#filmPresenter = filmPresenter;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filmPopupPresenter = filmsPopupPresenter;
    this.#handleViewAction = handleViewAction;
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    const films = this.#filmsModel.films;
    const someFilmWithComment = films.some((film) => film.comments.length);

    if (!someFilmWithComment) {
      return;
    }
    const sortedFilms = [...films].sort(sortFilmsComments).filter((film) => film.comments.length);

    render(this.#filmsListSection, this.#mainContainer);
    render(this.#filmsListTitle, this.#filmsListSection.element);
    render(this.#filmsListContainer, this.#filmsListSection.element);

    this.#renderFilms(sortedFilms.slice(0, FILM_COUNT_PER_STEP));
  };

  #clearFilmsBoard = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#filmsListTitle);
    remove(this.#filmsListSection);
    remove(this.#filmsListContainer);
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

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
    }
  };
}
