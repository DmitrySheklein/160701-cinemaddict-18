import { render } from '../render';
import FilmsContainer from '../view/films-container-view';
import FilmsList from '../view/films-list-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import FilmsCard from '../view/film-card-view';
import FilmsPopup from '../view/film-popup-view';
import { FILM_CARD_COUNT } from '../const';

export default class FilmsPresenter {
  siteBodyElement = document.body;
  filmsContainerComponent = new FilmsContainer();
  filmsListComponent = new FilmsList();
  filmsListContainerComponent = this.filmsListComponent
    .getElement()
    .querySelector('.films-list__container');

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.filmsContainer = filmsContainer;
    this.films = [...filmsModel.getFilms()];
    this.comments = [...commentsModel.getComments()];
    render(this.filmsContainerComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsContainerComponent.getElement());
    Array.from({ length: FILM_CARD_COUNT }).forEach((_el, i) =>
      render(new FilmsCard(this.films[i]), this.filmsListContainerComponent),
    );
    render(new FilmsShowMoreBtn(), this.filmsListComponent.getElement());
    render(new FilmsPopup(this.films[0]), this.siteBodyElement);
  };
}
