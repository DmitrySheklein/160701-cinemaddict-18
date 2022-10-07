import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import createFilmsPopupTemplate from './film-popup-view';
import { DEFAULT_VIEW_POPUP_DATA } from '../../main-const';
import { isSubmit, isCtrlEnter } from '../../utils';

export default class FilmsPopup extends AbstractStatefulView {
  constructor(film, comments, newComment, scrollPosition, updateViewData) {
    super();
    this._state = FilmsPopup.parseDataToState(film, comments, newComment, scrollPosition);
    this.updateViewData = updateViewData;
    this.#setInnerHandlers();
  }

  get currentFilm() {
    return this._state.film;
  }

  get template() {
    return createFilmsPopupTemplate(this._state);
  }

  static parseDataToState = (
    film,
    comments,
    newComment = DEFAULT_VIEW_POPUP_DATA.newComment,
    scrollPosition = DEFAULT_VIEW_POPUP_DATA.scrollPosition,
  ) => ({
    film,
    comments,
    newComment,
    scrollPosition,
    deletedCommentId: '',
    isDisabled: false,
    isSending: false,
    isDeleting: false,
  });

  static parseStateToData = (state) => {
    const newState = { ...state };

    delete newState.deletedCommentId;
    delete newState.isDisabled;
    delete newState.isSending;
    delete newState.isDeleting;
    delete newState.film;
    delete newState.scrollPosition;
    return newState;
  };

  #updateViewData = () => {
    const scrollValue = this.element.scrollTop;

    this._setState({
      scrollPosition: scrollValue,
    });
    this.updateViewData({
      newComment: this._state.newComment,
      scrollPosition: this._state.scrollPosition,
    });
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  setCommentsFormSubmitHandler = (callback) => {
    this._callback.commentsFormSubmit = callback;

    this.element
      .querySelector('form.film-details__new-comment')
      .addEventListener('keydown', this.#commentsFormSubmitHandler);
    this.element
      .querySelector('form.film-details__new-comment')
      .addEventListener('submit', this.#commentsFormSubmitHandler);
  };

  #commentsFormSubmitHandler = (evt) => {
    if (isSubmit(evt) || isCtrlEnter(evt)) {
      evt.preventDefault();
      this.#updateViewData();
      this._callback.commentsFormSubmit(FilmsPopup.parseStateToData(this._state).newComment);
    }
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentsInputHandler);
    this.element
      .querySelectorAll('.film-details__emoji-item[type="radio"]')
      .forEach((input) => input.addEventListener('change', this.#emotionsInputHandler));
  };

  setCommentRemoveHandler = (callback) => {
    this._callback.removeBtnClick = callback;
    this.element
      .querySelectorAll('.film-details__comment-delete')
      .forEach((btn) => btn.addEventListener('click', this.#removeCommentBtnHandler));
  };

  #removeCommentBtnHandler = (evt) => {
    const removedId = evt.target.closest('[data-id]')?.dataset.id;

    if (removedId) {
      this.#updateViewData();
      this._callback.removeBtnClick(removedId);
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
    this.#updateViewData();
  };

  #commentsInputHandler = (evt) => {
    const value = evt.target.value;

    this._setState({
      newComment: {
        ...this._state.newComment,
        comment: value,
      },
    });
    this.#updateViewData();
  };

  _restoreHandlers = () => {
    this.setScrollPosition();
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setCommentsFormSubmitHandler(this._callback.commentsFormSubmit);
    this.setCommentRemoveHandler(this._callback.removeBtnClick);
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

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
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
    this.#updateViewData();
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
    this.#updateViewData();
    this._callback.watchedClick(this._state.film);
  };
}
