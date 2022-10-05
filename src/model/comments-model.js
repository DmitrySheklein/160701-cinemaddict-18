import { TransformKeysObject } from '../util';
import Observable from '../framework/observable';
import { nanoid } from 'nanoid';
import { Random, generatePerson } from '../util';
import { names, surnames } from '../mock/const';
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
      throw new Error("Can't load film comments");
    }
  };

  addComment = (updateType, { newCommentPart, filmId }) => {
    const newCommentId = nanoid();
    const newComment = {
      ...newCommentPart,
      id: newCommentId,
      author: generatePerson(names, surnames),
      date: Random.date(),
    };
    this.#allComments.push(newComment);

    const film = this.#filmsModel.films.find((el) => el.id === filmId);
    if (film) {
      const newFilm = { ...film, comments: [...film.comments, newCommentId] };
      this.#filmsModel.updateFilm(UpdateType.PATCH, newFilm);
    }

    this._notify(updateType, newComment);
  };

  deleteComment = (updateType, commentId) => {
    this.#allComments = this.#allComments.filter((comment) => comment.id !== commentId);
    this._notify(updateType, commentId);
  };

  #adaptToClient = (comment) => {
    const adaptedComment = new TransformKeysObject(comment).toCamelCase();

    return adaptedComment;
  };
}
