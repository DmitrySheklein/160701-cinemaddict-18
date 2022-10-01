import Observable from '../framework/observable';
import { NavigationType } from '../main-const';

export default class NavigationModel extends Observable {
  #currentNav = NavigationType.ALL.id;

  get currentNav() {
    return this.#currentNav;
  }

  setNavigation = (updateType, nav) => {
    this.#currentNav = nav;
    this._notify(updateType, nav);
  };
}
