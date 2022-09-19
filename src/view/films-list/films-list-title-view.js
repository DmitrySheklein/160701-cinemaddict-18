import AbstractView from '../../framework/view/abstract-view';

const createFilmsListTemplate = ({ titleText = '', hidden = false }) =>
  `<h2 class="films-list__title ${hidden ? 'visually-hidden' : ''}">${titleText}</h2>`;

export default class FilmsListTitle extends AbstractView {
  #titleConfig = null;

  constructor(titleConfig = {}) {
    super();
    this.#titleConfig = titleConfig;
  }

  get template() {
    return createFilmsListTemplate(this.#titleConfig);
  }
}
