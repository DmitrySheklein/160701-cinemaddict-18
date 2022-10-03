import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../main-const';

const createSortTemplate = (sortType = SortType.DEFAULT) => {
  const isActiveClass = (type) => (type === sortType ? 'sort__button--active' : '');

  return `
<ul class="sort">
  ${Object.values(SortType)
    .map(
      (value) =>
        `<li>
          <a
            href="#"
            data-sort-type="${value}"
            class="sort__button ${isActiveClass(value)}"
          >
          Sort by ${value}
          </a>
        </li>`,
    )
    .join('')}
</ul>`;
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
