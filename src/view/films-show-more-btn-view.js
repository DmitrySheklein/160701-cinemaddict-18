import AbstractView from '../framework/view/abstract-view';

const createFilmsShowMoreBtnTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class FilmsShowMoreBtn extends AbstractView {
  get template() {
    return createFilmsShowMoreBtnTemplate();
  }
}
