import AbstractView from '../framework/view/abstract-view';
import { NavigationType } from '../main-const';

const createNavigationTemplate = (navigationArray, current = NavigationType.ALL.id) => {
  const isActiveClass = (type) => (type === current ? 'main-navigation__item--active' : '');

  return `
  <nav class="main-navigation">
    ${navigationArray
      .map(
        ({ type, name, count }) =>
          `<a
             href="#${type}"
             class="main-navigation__item
             ${isActiveClass(type)}"
            >
            ${name}

            <span
              class="main-navigation__item-count"
              style="${type === NavigationType.ALL.id ? 'display:none' : ''}"
            >
              ${count}
            </span>
          </a>`,
      )
      .join('')}
  </nav>
  `;
};

export default class NavigationView extends AbstractView {
  #filmsNavigation = null;
  #currentNav = null;

  constructor(filmsNavigation, currentNav) {
    super();
    this.#filmsNavigation = filmsNavigation;
    this.#currentNav = currentNav;
  }

  get template() {
    return createNavigationTemplate(this.#filmsNavigation, this.#currentNav);
  }

  setNavItemClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#navItemClick);
  };

  #navItemClick = (evt) => {
    evt.preventDefault();
    const el = evt.target.closest('a');

    if (el) {
      const type = el.href.split('#')[1];
      this._callback.click(type);
    }
  };
}
