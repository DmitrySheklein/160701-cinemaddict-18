import { render } from '../render';
import FilmsContainer from '../view/films-container-view';
import FilmsList from '../view/films-list-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import FilmsCard from '../view/film-card-view';
import FilmsPopup from '../view/film-popup';

export default class FilmsPresenter {
  #siteBodyElement = document.body;
  #bodyHiddenClass = 'hide-overflow';
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
    this.#films.forEach(this.#renderFilm);
    render(new FilmsShowMoreBtn(), this.#filmsListComponent.element);
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmsCard(film);

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#renderPopup(film);
    });
    render(filmComponent, this.#filmsListContainerComponent);
  };

  #renderPopup = (film) => {
    this.#removePopup();
    const comments = this.#commentsModel.get(film);
    const filmPopupComponent = new FilmsPopup(film, comments);
    this.#siteBodyElement.classList.add(this.#bodyHiddenClass);
    filmPopupComponent.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', () => {
        this.#removePopup();
      });

    render(filmPopupComponent, this.#siteBodyElement);
  };

  #removePopup = () => {
    this.#siteBodyElement.classList.remove(this.#bodyHiddenClass);
    this.#siteBodyElement.querySelector('.film-details')?.remove();
  };
}
