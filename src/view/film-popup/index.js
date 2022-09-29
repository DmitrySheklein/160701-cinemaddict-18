import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import createFilmsPopupTemplate from './film-popup-view';

export default class FilmsPopup extends AbstractStatefulView {
  _state = [];

  constructor(film, comments) {
    super();
    this._state = {
      film: FilmsPopup.parseFilmToState(film),
      comments: FilmsPopup.parseCommentsToState(comments),
      newComment: {
        comment: '',
        emotion: '',
      },
      scrollPosition: 0,
    };
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmsPopupTemplate(this._state.film, this._state.comments, this._state.newComment);
  }

  static parseFilmToState = (film) => ({ ...film });

  static parseStateToFilm = (state) => ({ ...state });

  static parseCommentsToState = (comments) => [...comments];

  static parseStateToComments = (state) => [...state];

  setCommentsFormSubmitHandler = (callback) => {
    this._callback.commentsFormSubmit = callback;
    this.element
      .querySelector('.film-details__new-comment')
      .addEventListener('submit', this.#commentsFormSubmitHandler);
  };

  #commentsFormSubmitHandler = (evt) => {
    evt.preventDefault();
    console.log('submit');
    this._callback.commentsFormSubmit(FilmsPopup.parseStateToComments(this._state));
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('change', this.#commentsInputHandler);
    this.element
      .querySelectorAll('.film-details__emoji-item[type="radio"]')
      .forEach((input) => input.addEventListener('change', this.#emotionsInputHandler));
    this.element
      .querySelectorAll('.film-details__comment-delete')
      .forEach((btn) => btn.addEventListener('click', this.#removeCommentBtnHandler));
  };

  #removeCommentBtnHandler = (evt) => {
    const removedId = evt.target.closest('[data-id]')?.dataset.id;

    if (removedId) {
      this.updateElement({
        comments: this._state.comments.filter((el) => el.id !== removedId),
      });
    }
  };

  #emotionsInputHandler = (evt) => {
    const emotion = evt.target.value;

    this.updateElement({
      newComment: {
        ...this._state.newComment,
        emotion,
      },
    });
  };

  #commentsInputHandler = (evt) => {
    const value = evt.target.value;

    this.updateElement({
      newComment: {
        ...this._state.newComment,
        comment: value,
      },
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setCommentsFormSubmitHandler(this._callback.commentsFormSubmit);
  };

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  setFavotiteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this._state.film);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick(this._state.film);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick(this._state.film);
  };
}
