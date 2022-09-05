import { createElement } from '../render';

const createFilmsShowMoreBtnTemplate = () =>
  `<button class="films-list__show-more">Show more</button>`;

export default class FilmsShowMoreBtn {
  getTemplate() {
    return createFilmsShowMoreBtnTemplate();
  }
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
