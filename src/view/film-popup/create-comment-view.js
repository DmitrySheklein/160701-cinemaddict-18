import { HumanizeDate } from '../../utils/date';
import he from 'he';

const createComment = (commentItem = {}, { isDeleting, isDisabled, deletedCommentId }) => {
  const { id, comment, emotion, author = '', date } = commentItem;
  const isDeletedId = deletedCommentId === id;
  if (!id || !emotion || !comment) {
    return '';
  }
  return `
    <li class="film-details__comment" data-id="${id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${HumanizeDate.FromNow(date)}</span>
        <button
          class="film-details__comment-delete"
          ${isDisabled && isDeletedId ? 'disabled' : ''}
        >
          ${isDeleting && isDeletedId ? 'Deleting...' : 'Delete'}
        </button>
      </p>
    </div>
  </li>
    `;
};

export default createComment;
