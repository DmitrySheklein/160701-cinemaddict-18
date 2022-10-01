import AbstractView from '../framework/view/abstract-view';

const createNavigationTemplate = (navigationArray) => `
<nav class="main-navigation">
  ${navigationArray
    .map(
      ({ filterId, filterName, filterCount }) =>
        `<a
           href="#${filterId}"
           class="main-navigation__item
           ${filterId === 'all' ? 'main-navigation__item--active' : ''}"
          >
          ${filterName}

          <span
            class="main-navigation__item-count"
            style="${filterId === 'all' ? 'display:none' : ''}"
          >
            ${filterCount}
          </span>
        </a>`,
    )
    .join('')}
</nav>
`;

export default class NavigationView extends AbstractView {
  #filmsNavigation = null;

  constructor(filmsNavigation) {
    super();
    this.#filmsNavigation = filmsNavigation;
  }

  get template() {
    return createNavigationTemplate(this.#filmsNavigation);
  }
}
