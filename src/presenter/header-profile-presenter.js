import { render } from '../framework/render';
import { getUserStatus } from '../utils/';
import ProfileView from '../view/profile-view';

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
    this.#renderProfile();
  };

  #renderProfile = () => {
    render(new ProfileView(this.#userStatus), this.#container);
  };

  #modelEventHandler = () => {};
}
