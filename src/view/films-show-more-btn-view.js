import { createElement } from '../render';

const createFilmsShowMoreBtnTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class FilmsShowMoreBtn {
  #element = null;

  get template() {
    return createFilmsShowMoreBtnTemplate();
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
