import AbstractView from '../../framework/view/abstract-view';

const createFilmsListSectionTemplate = () => '<section class="films-list"></section>';

export default class FilmsListSection extends AbstractView {
  get template() {
    return createFilmsListSectionTemplate();
  }
}
