import { createElement } from '../render';

const createFilmsListTemplate = (filterStatus = 'All movies') => {
  const StatusMap = {
    'All movies': 'There are no movies in our database',
    'Watchlist': 'There are no movies to watch now',
    'History': 'There are no watched movies now',
    'Favorites': 'There are no favorite movies now',
  };

  if (!StatusMap[filterStatus]) {
    return '<div></div>';
  }

  return `<h2 class="films-list__title">${StatusMap[filterStatus]}</h2>`;
};

export default class FilmsListTitle {
  #element = null;
  #filterStatus = null;

  constructor(filterStatus) {
    this.#filterStatus = filterStatus;
  }

  get template() {
    return createFilmsListTemplate(this.#filterStatus);
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
