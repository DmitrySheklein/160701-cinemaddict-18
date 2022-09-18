import { createElement } from '../../render';

const createFilmsListTemplate = ({ titleText = '', hidden = false }) =>
  `<h2 class="films-list__title ${hidden ? 'visually-hidden' : ''}">${titleText}</h2>`;

export default class FilmsListTitle {
  #element = null;
  #titleConfig = null;

  constructor(titleConfig = {}) {
    this.#titleConfig = titleConfig;
  }

  get template() {
    return createFilmsListTemplate(this.#titleConfig);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
