import { render } from "../render";
import FilmsContainer from "../films-container-view";
import FilmsList from "./films-list-view";

export default class FilmsPresenter {
  filmsContainerComponent = new FilmsContainer();
  filmsListComponent = new FilmsListComponent();
  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;
    render(this.filmsContainerComponent, this.filmsContainer);
  };
}
