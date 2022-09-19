import AbstractView from '../../framework/view/abstract-view';

const createFilmsListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListContainer extends AbstractView {
  get template() {
    return createFilmsListContainerTemplate();
  }
}
