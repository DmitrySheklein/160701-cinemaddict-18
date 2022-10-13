// import { render } from 'src/framework/render';
import { sortFilmsRating } from 'src/utils/sort';
// import { UpdateType } from 'src/main-const';
import AbstractFilmsPresenter from './abstract-films-presenter';

export default class FilmsRatedPresenter extends AbstractFilmsPresenter {
  #filmsModel = null;

  #handleViewAction = null;

  constructor({
    mainContainer,
    filmsModel,
    filmsPopupPresenter,
    handleViewAction,
    commentsModel,
    navigationModel,
    navigationPresenter,
  }) {
    super({
      mainContainer,
      filmsModel,
      filmsPopupPresenter,
      commentsModel,
      navigationModel,
      navigationPresenter,
      handleViewAction,
    });
    this.#filmsModel = filmsModel;
    this.#handleViewAction = handleViewAction;
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    const films = this.#filmsModel.films;
    const someFilmWithRating = films.some((film) => film.filmInfo.totalRating > 0);

    if (!someFilmWithRating) {
      return;
    }
    const sortedFilms = [...films]
      .sort(sortFilmsRating)
      .filter((film) => film.filmInfo.totalRating);
    this._renderFilms(sortedFilms.slice(0, 2));
  };
}
