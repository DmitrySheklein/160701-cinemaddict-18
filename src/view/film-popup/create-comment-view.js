import { HumanizeDate } from '../../util';
import he from 'he';

const createComment = (commentItem) => {
  const { id, comment, emotion, author = '', date } = commentItem;

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
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
    `;
};

export default createComment;
