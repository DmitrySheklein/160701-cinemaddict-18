import { remove, render, replace } from '../framework/render';
import { NavigationType, UpdateType } from '../main-const';
import { NavigationFilter } from '../util';
import NavigationView from '../view/navigation-view';

export default class NavigationPresenter {
  #navigationContainer = null;
  #navigationModel = null;
  #filmsModel = null;

  #navigationComponent = null;

  constructor(navigationContainer, navigationModel, filmsModel) {
    this.#navigationContainer = navigationContainer;
    this.#navigationModel = navigationModel;
    this.#filmsModel = filmsModel;

    this.#navigationModel.addObserver(this.#hanlerModelEvent);
    this.#filmsModel.addObserver(this.#hanlerModelEvent);
  }

  get navigations() {
    const films = this.#filmsModel.films;

    return [
      {
        type: NavigationType.ALL.id,
        name: NavigationType.ALL.name,
        count: NavigationFilter[NavigationType.ALL.id](films).length,
      },
      {
        type: NavigationType.WATCHLIST.id,
        name: NavigationType.WATCHLIST.name,
        count: NavigationFilter[NavigationType.WATCHLIST.id](films).length,
      },
      {
        type: NavigationType.HISTORY.id,
        name: NavigationType.HISTORY.name,
        count: NavigationFilter[NavigationType.HISTORY.id](films).length,
      },
      {
        type: NavigationType.FAVORITES.id,
        name: NavigationType.FAVORITES.name,
        count: NavigationFilter[NavigationType.FAVORITES.id](films).length,
      },
    ];
  }

  init = () => {
    const navigations = this.navigations;
    const prevNavComponent = this.#navigationComponent;

    this.#navigationComponent = new NavigationView(navigations, this.#navigationModel.currentNav);
    this.#navigationComponent.setNavItemClick(this.#handlerNavigationTypeChange);

    if (prevNavComponent === null) {
      render(this.#navigationComponent, this.#navigationContainer);

      return;
    }

    replace(this.#navigationComponent, prevNavComponent);
    remove(prevNavComponent);
  };

  #hanlerModelEvent = () => {
    this.init();
  };

  #handlerNavigationTypeChange = (navItem) => {
    if (this.#navigationModel.currentNav === navItem) {
      return;
    }
    this.#navigationModel.setNavigation(UpdateType.MAJOR, navItem);
  };
}
