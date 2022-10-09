import { TransformKeysObject } from '../utils/transform-keys';
import Observable from '../framework/observable';
import { UpdateType } from '../main-const';

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #commentsApiService = null;

  constructor(filmsModel, commentsApiService) {
    super();
    this.#filmsModel = filmsModel;
    this.#commentsApiService = commentsApiService;
  }

  get = async (film) => {
    const filmId = film.id;
    const filmComments = this.#allComments.find((el) => el.id === filmId);

    if (filmComments) {
      return filmComments.comments;
    } else {
      const loadedComments = await this.#loadComments(filmId);

      this.#allComments.push({
        id: filmId,
        comments: loadedComments,
      });

      return loadedComments;
    }
  };

  #loadComments = async (filmId) => {
    try {
      const comments = await this.#commentsApiService.getFilmComments(filmId);
      const adaptedComments = comments.map(this.#adaptToClient);

      return adaptedComments;
    } catch (error) {
      throw new Error('Can not load film comments');
    }
  };

  addComment = async (updateType, { newCommentPart, filmId }) => {
    try {
      const response = await this.#commentsApiService.addComment({
        filmId,
        comment: newCommentPart,
      });
      const { movie, comments } = response;

      this.#allComments = this.#allComments.map((el) => {
        if (el.id === filmId) {
          return {
            ...el,
            comments: comments.map(this.#adaptToClient),
          };
        }
        return el;
      });
      this._notify(updateType, { newComments: comments });
      this.#filmsModel.updateFilm(UpdateType.PATCH, movie, true);
    } catch (error) {
      throw new Error('Can not add comment');
    }
  };

  deleteComment = async (updateType, { deletedCommentId, filmId }) => {
    try {
      await this.#commentsApiService.deleteComment(deletedCommentId);

      this.#allComments = this.#allComments.map((el) => {
        if (el.id === filmId) {
          return {
            ...el,
            comments: el.comments.filter((comment) => comment.id !== deletedCommentId),
          };
        }
        return el;
      });
      const film = this.#filmsModel.films.find((el) => el.id === filmId);
      if (film) {
        const newFilm = {
          ...film,
          comments: film.comments.filter((id) => id !== deletedCommentId),
        };
        this.#filmsModel.updateFilm(UpdateType.PATCH, newFilm, true);
      }

      this._notify(updateType);
    } catch (error) {
      throw new Error('Can not delete comment');
    }
  };

  #adaptToClient = (comment) => {
    const adaptedComment = new TransformKeysObject(comment).toCamelCase();

    return adaptedComment;
  };
}
