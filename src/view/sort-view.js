import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../main-const';

const createSortTemplate = (sortType = SortType.DEFAULT) => {
  const isActiveClass = (type) => (type === sortType ? 'sort__button--active' : '');

  return `
<ul class="sort">
  <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${isActiveClass(
    SortType.DEFAULT,
  )}">Sort by default</a></li>
  <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${isActiveClass(
    SortType.DATE,
  )}">Sort by date</a></li>
  <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button ${isActiveClass(
    SortType.RATING,
  )}">Sort by rating</a></li>
</ul>
`;
};

export default class SortView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  setSortTypeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
