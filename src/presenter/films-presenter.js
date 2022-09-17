import { render } from '../render';
import FilmsContainer from '../view/films-container-view';
import FilmsList from '../view/films-list-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import FilmsCard from '../view/film-card-view';
import FilmsPopup from '../view/film-popup';

export default class FilmsPresenter {
  #siteBodyElement = document.body;
  #filmsContainerComponent = new FilmsContainer();
  #filmsListComponent = new FilmsList();
  #filmsListContainerComponent =
    this.#filmsListComponent.element.querySelector('.films-list__container');

  #filmsContainer = null;
  #commentsModel = null;

  #films = [];

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#films = [...filmsModel.get()];
    this.#commentsModel = commentsModel;

    render(this.#filmsContainerComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsContainerComponent.element);
    this.#films.forEach((film) => render(new FilmsCard(film), this.#filmsListContainerComponent));
    render(new FilmsShowMoreBtn(), this.#filmsListComponent.element);

    const filmItem = this.#films[0];
    const comments = this.#commentsModel.get(filmItem);
    render(new FilmsPopup(filmItem, comments), this.#siteBodyElement);
  };
}
