import { remove, render, replace } from '../framework/render';
import { getUserStatus } from '../utils/';
import ProfileView from '../view/profile-view';
import { UpdateType } from '../main-const';
export default class HeaderProfilePresenter {
  #container = null;
  #headerProfileComponent = null;

  #filmsModel = null;
  #userStatus = null;

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmsModel = filmModel;

    this.#filmsModel.addObserver(this.#modelEventHandler);
  }

  init = () => {
    this.#userStatus = getUserStatus(this.#filmsModel.films);
    const prevHeaderProfileComponent = this.#headerProfileComponent;
    this.#headerProfileComponent = new ProfileView(this.#userStatus);

    if (prevHeaderProfileComponent === null) {
      render(this.#headerProfileComponent, this.#container);

      return;
    }

    if (this.#container.contains(prevHeaderProfileComponent.element)) {
      replace(this.#headerProfileComponent, prevHeaderProfileComponent);
    }

    remove(prevHeaderProfileComponent);
  };

  #modelEventHandler = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.init();
    }
  };
}
