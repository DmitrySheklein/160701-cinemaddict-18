import { emotions } from '../../mock/const';

const createEmojiList = () => emotions
  .map(
    (emotion) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`,
  )
  .join('');

export default createEmojiList;
