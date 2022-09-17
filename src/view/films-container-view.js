import { createElement } from '../render';

const createFilmsContainerTemplate = () => '<section class="films"></section>';

export default class FilmsContainer {
  #element = null;

  get template() {
    return createFilmsContainerTemplate();
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
