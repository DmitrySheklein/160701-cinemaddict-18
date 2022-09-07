import { render } from '../render';
import FilmsContainer from '../view/films-container-view';
import FilmsList from '../view/films-list-view';
import FilmsShowMoreBtn from '../view/films-show-more-btn-view';
import FilmsCard from '../view/film-card-view';
import { FILM_CARD_COUNT } from '../const';

export default class FilmsPresenter {
  filmsContainerComponent = new FilmsContainer();
  filmsListComponent = new FilmsList();
  filmsListContainerComponent = this.filmsListComponent
    .getElement()
    .querySelector('.films-list__container');

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;
    render(this.filmsContainerComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsContainerComponent.getElement());
    Array.from({ length: FILM_CARD_COUNT }).forEach(() =>
      render(new FilmsCard(), this.filmsListContainerComponent),
    );
    render(new FilmsShowMoreBtn(), this.filmsListComponent.getElement());
  };
}
