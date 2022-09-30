import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import createFilmsPopupTemplate from './film-popup-view';

export default class FilmsPopup extends AbstractStatefulView {
  constructor(film, comments, newComment, scrollPosition, updateViewData) {
    super();
    this._state = FilmsPopup.parseDataToState(film, comments, newComment, scrollPosition);
    this.updateViewData = updateViewData;
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmsPopupTemplate(this._state);
  }

  static parseDataToState = (film, comments, newComment, scrollPosition) => ({
    film,
    comments,
    newComment,
    scrollPosition,
  });

  static parseStateToData = (state) => {
    const newState = { ...state };

    delete newState.film;
    delete newState.scrollPosition;
    return newState;
  };

  #updateViewData = () => {
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
      .addEventListener('submit', this.#commentsFormSubmitHandler);
  };

  #commentsFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.commentsFormSubmit(FilmsPopup.parseStateToData(this._state).newComment);
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('scroll', this.#onScroll);
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentsInputHandler);
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#commentsInputKeyDownHandler);
    this.element
      .querySelectorAll('.film-details__emoji-item[type="radio"]')
      .forEach((input) => input.addEventListener('change', this.#emotionsInputHandler));
  };

  #onScroll = (evt) => {
    const scrollValue = evt.target.scrollTop;
    //TODO правильно ли обновлять стейт
    this._setState({ scrollPosition: scrollValue });
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
      this.updateElement({
        comments: this._state.comments.filter((el) => el.id !== removedId),
      });
      this._callback.removeBtnClick(FilmsPopup.parseStateToData(this._state).comments);
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

  #commentsInputKeyDownHandler = (evt) => {
    //TODO сделать закрытие по Control + Enter
    // if (evt.key === 'Enter' && evt.key === 'Control') {
    if (evt.key === 'Enter') {
      this.#commentsFormSubmitHandler(evt);
    }
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
