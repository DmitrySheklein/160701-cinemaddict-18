import { generateComments } from '../mock/comments';
import Observable from '../framework/observable';

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

  addComment = (updateType, comment) => {
    this.#allComments.push(comment);
    this._notify(updateType, comment);
  };

  deleteComment = (updateType, commentId) => {
    this.#allComments = this.#allComments.filter((comment) => comment.id !== commentId);
    this._notify(updateType, commentId);
  };
}
