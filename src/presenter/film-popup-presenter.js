import { render, remove, replace } from '../framework/render';
import FilmsPopup from '../view/film-popup';
import { isEsc } from '../util';
import { DEFAULT_VIEW_POPUP_DATA } from '../main-const';
import { UserAction, UpdateType } from '../main-const';

export default class FilmPopupPresenter {
  #siteBodyElement = document.body;
  #bodyHiddenClass = 'hide-overflow';
  #filmPopup = null;
  #commentsModel = null;
  #changeData = null;
  #film = null;

  #viewData = { ...DEFAULT_VIEW_POPUP_DATA };

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  get currentFilm() {
    return this.#film;
  }

  init = async (film) => {
    this.#film = film;
    const prevPopupComponent = this.#filmPopup;
    this.#checkClearComments(prevPopupComponent, this.#film);
    const comments = await this.#commentsModel.get(this.#film);
    this.#filmPopup = new FilmsPopup(
      this.#film,
      comments,
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
    document.addEventListener('keydown', this.#onEscKeyDown);

    if (prevPopupComponent === null) {
      render(this.#filmPopup, this.#siteBodyElement);

      return;
    }

    if (this.#siteBodyElement.contains(prevPopupComponent.element)) {
      replace(this.#filmPopup, prevPopupComponent);
    }

    remove(prevPopupComponent);
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

  #onCommentBtnRemoveClick = (commentsId) => {
    const updatedFilm = {
      ...this.#film,
      comments: this.#film.comments.filter((id) => id !== commentsId),
    };

    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, {
      commentsDelId: commentsId,
      updatedFilm,
    });
  };

  #onEscKeyDown = (evt) => {
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
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, { updatedFilm });
    this.init(updatedFilm);
    this.#filmPopup.setScrollPosition();
  };

  #onWatchListBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, { updatedFilm });
    this.init(updatedFilm);
    this.#filmPopup.setScrollPosition();
  };

  #onWatchedBtnClick = () => {
    const updatedFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, { updatedFilm });
    this.init(updatedFilm);
    this.#filmPopup.setScrollPosition();
  };

  #removePopup = () => {
    this.#siteBodyElement.classList.remove(this.#bodyHiddenClass);
    if (this.#filmPopup) {
      remove(this.#filmPopup);
      this.#filmPopup = null;
      this.#film = null;
    }
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#updateViewData(DEFAULT_VIEW_POPUP_DATA);
  };
}
