import { generateComment } from '../mock/comments';

export default class CommentsModel {
  constructor(commentsCount = 0) {
    this.comments = Array.from({ length: commentsCount }, generateComment);
  }

  getComments = () => this.comments;
}
