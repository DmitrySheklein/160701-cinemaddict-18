import AbstractView from '../../framework/view/abstract-view';

const createFilmsListSectionTemplate = (isExtra) =>
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}"></section>`;

export default class FilmsListSection extends AbstractView {
  #isExtra = null;

  constructor(isExtra = false) {
    super();
    this.#isExtra = isExtra;
  }

  get template() {
    return createFilmsListSectionTemplate(this.#isExtra);
  }
}
