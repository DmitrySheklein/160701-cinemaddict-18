import { createElement } from '../../render';

const createFilmsListSectionTemplate = () => '<section class="films-list"></section>';

export default class FilmsListSection {
  #element = null;

  get template() {
    return createFilmsListSectionTemplate();
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
