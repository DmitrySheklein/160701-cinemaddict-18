import { render, remove, replace } from '../framework/render';
import FilmsPopup from '../view/film-popup';
import { isEsc } from '../utils';
import { DEFAULT_VIEW_POPUP_DATA } from '../main-const';
import { UserAction, UpdateType } from '../main-const';

export default class FilmPopupPresenter {
  static name = 'popup';
  #siteBodyElement = document.body;
  #bodyHiddenClass = 'hide-overflow';
  #filmPopup = null;
  #commentsModel = null;
  #currentComments = [];
  #changeData = null;
  #film = null;

  #viewData = { ...DEFAULT_VIEW_POPUP_DATA };

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get currentFilm() {
    return this.#film;
  }

  saveState = () => {
    const scrollValue = this.#filmPopup.scrollPositionElement;

    this.#updateViewData({
      ...this.#viewData,
      scrollPosition: scrollValue,
    });
  };

  init = async (film) => {
    this.#film = film;
    const prevPopupComponent = this.#filmPopup;
    this.#checkClearComments(prevPopupComponent, this.#film);
    this.#currentComments = await this.#commentsModel.get(this.#film);
    this.#filmPopup = new FilmsPopup(
      this.#film,
      this.#currentComments,
      this.#viewData.newComment,
      this.#viewData.scrollPosition,
      this.#updateViewData,
    );
    this.#siteBodyElement.classList.add(this.#bodyHiddenClass);
    this.#filmPopup.setCommentRemoveHandler(this.#onCommentBtnRemoveClick);
    this.#filmPopup.setCommentsFormSubmitHandler(this.#onCommentsFormSubmit);
    this.#filmPopup.setCloseClickHandler(this.#removePopup);
    this.#filmPopup.setFavoriteClickHandler(this.#onFavoriteBtnClick);
    this.#filmPopup.setWatchListClickHandler(this.#onWatchListBtnClick);
    this.#filmPopup.setWatchedClickHandler(this.#onWatchedBtnClick);
    document.addEventListener('keydown', this.#documentEscHandler);

    if (prevPopupComponent === null) {
      render(this.#filmPopup, this.#siteBodyElement);

      return;
    }

    if (this.#siteBodyElement.contains(prevPopupComponent.element)) {
      replace(this.#filmPopup, prevPopupComponent);
      this.#filmPopup.setScrollPosition();
    }

    remove(prevPopupComponent);
  };

  setSaving = () => {
    this.#filmPopup.updateElement({
      isDisabled: true,
      isSending: true,
    });
  };

  setDeleting = (deletedCommentId) => {
    this.#filmPopup.updateElement({
      isDisabled: true,
      isDeleting: true,
      deletedCommentId,
    });
  };

  setAborting = (type) => {
    let shakedElement;
    switch (type) {
      case UserAction.ADD_COMMENT:
        shakedElement = this.#filmPopup.commentFormElement;
        break;
      case UserAction.DELETE_COMMENT:
        shakedElement = this.#filmPopup.deletedCommentElement;
        break;
      case UserAction.UPDATE_FILM:
        shakedElement = this.#filmPopup.controlBlockElement;
        break;
    }
    const resetFormState = () => {
      this.#filmPopup.updateElement({
        isDisabled: false,
        isSending: false,
        isDeleting: false,
        deletedCommentId: '',
      });
    };
    this.#filmPopup.shake.call(
      {
        element: shakedElement,
      },
      resetFormState,
    );
  };

  #handleModelEvent = (updateType, data = {}) => {
    const { newComments } = data;
    switch (updateType) {
      case UpdateType.PATCH:
        if (newComments) {
          if (this.#currentComments.length < newComments.length) {
            this.#updateViewData({
              ...this.#viewData,
              newComment: DEFAULT_VIEW_POPUP_DATA.newComment,
            });
          }
        }
    }
  };

  #checkClearComments = (popupComponent, currentFilm) => {
    const PopupComponentId = {
      prev: popupComponent?.currentFilm?.id,
      current: currentFilm.id,
    };

    if (PopupComponentId.prev !== PopupComponentId.current) {
      this.#updateViewData(DEFAULT_VIEW_POPUP_DATA);
    }
  };

  #updateViewData = (viewData) => {
    this.#viewData = { ...viewData };
  };

  #onCommentsFormSubmit = (newCommentPart) => {
    this.#changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, {
      newCommentPart,
      filmId: this.#film.id,
    });
  };

  #onCommentBtnRemoveClick = (deletedCommentId) => {
    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, {
      deletedCommentId,
      filmId: this.#film.id,
    });
  };

  #documentEscHandler = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.#removePopup();
    }
  };

  #onFavoriteBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    };

    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, {
      updatedFilm,
      from: FilmPopupPresenter.name,
    });
  };

  #onWatchListBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, {
      updatedFilm,
      from: FilmPopupPresenter.name,
    });
  };

  #onWatchedBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, {
      updatedFilm,
      from: FilmPopupPresenter.name,
    });
  };

  #removePopup = () => {
    this.#siteBodyElement.classList.remove(this.#bodyHiddenClass);
    if (this.#filmPopup) {
      remove(this.#filmPopup);
      this.#filmPopup = null;
      this.#film = null;
      this.#currentComments = null;
    }
    document.removeEventListener('keydown', this.#documentEscHandler);
    this.#updateViewData(DEFAULT_VIEW_POPUP_DATA);
  };
}
