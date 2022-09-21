import AbstractView from '../framework/view/abstract-view';

const createFilmsShowMoreBtnTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class FilmsShowMoreBtn extends AbstractView {
  get template() {
    return createFilmsShowMoreBtnTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
