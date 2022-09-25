import { render, remove } from '../framework/render';
import FilmsPopup from '../view/film-popup';
import { isEsc } from '../util';

export default class FilmPopupPresenter {
  #siteBodyElement = document.body;
  #bodyHiddenClass = 'hide-overflow';
  #filmPopup = null;
  #commentsModel = null;

  constructor(commentsModel) {
    this.#commentsModel = commentsModel;
  }

  init = (film) => {
    this.#renderPopup(film);
  };

  #onEscKeyDown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.#removePopup();
    }
  };

  #renderPopup = (film) => {
    this.#removePopup();
    const comments = this.#commentsModel.get(film);
    this.#filmPopup = new FilmsPopup(film, comments);
    this.#siteBodyElement.classList.add(this.#bodyHiddenClass);
    this.#filmPopup.setCloseClickHandler(this.#removePopup);
    document.addEventListener('keydown', this.#onEscKeyDown);
    render(this.#filmPopup, this.#siteBodyElement);
  };

  #removePopup = () => {
    this.#siteBodyElement.classList.remove(this.#bodyHiddenClass);
    if (this.#filmPopup) {
      remove(this.#filmPopup);
      this.#filmPopup = null;
    }
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
