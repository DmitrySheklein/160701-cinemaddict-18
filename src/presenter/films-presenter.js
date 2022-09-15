import { render } from '../render';
import FilmsContainer from '../view/films-container-view';
import FilmsList from '../view/films-list-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import FilmsCard from '../view/film-card-view';
import FilmsPopup from '../view/film-popup-view';

export default class FilmsPresenter {
  siteBodyElement = document.body;
  filmsContainerComponent = new FilmsContainer();
  filmsListComponent = new FilmsList();
  filmsListContainerComponent = this.filmsListComponent
    .getElement()
    .querySelector('.films-list__container');

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.filmsContainer = filmsContainer;
    this.films = [...filmsModel.get()];
    this.commentsModel = commentsModel;

    render(this.filmsContainerComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsContainerComponent.getElement());
    this.films.forEach((film) => render(new FilmsCard(film), this.filmsListContainerComponent));
    render(new FilmsShowMoreBtn(), this.filmsListComponent.getElement());

    const filmItem = this.films[0];
    const comments = this.commentsModel.get(filmItem);
    render(new FilmsPopup(filmItem, comments), this.siteBodyElement);
  };
}
