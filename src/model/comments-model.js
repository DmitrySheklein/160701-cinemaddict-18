import { generateComments } from '../mock/comments';
import Observable from '../framework/observable';
import { nanoid } from 'nanoid';
import { Random, generatePerson } from '../util';
import { names, surnames } from '../mock/const';
import { UpdateType } from '../main-const';

export default class CommentsModel extends Observable {
  #filmsModel = null;
  #allComments = [];
  #comments = [];

  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.generateComments();
  }

  generateComments() {
    this.#allComments = generateComments(this.#filmsModel.films);
  }

  get = (film) => {
    this.#comments = film.comments.map((commentId) =>
      this.#allComments.find((comment) => comment.id === commentId),
    );

    return this.#comments;
  };

  getComments = () => this.#comments;

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
}
