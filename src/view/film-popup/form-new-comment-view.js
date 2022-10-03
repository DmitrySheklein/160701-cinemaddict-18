import createEmojiList from './emoji-list-view';

const createCommentForm = (newComment) => {
  const { emotion, comment = '' } = newComment;
  const emotionImg = emotion
    ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`
    : '';

  return `
    <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label">
            ${emotionImg}
        </div>

        <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" required>${comment}</textarea>
        </label>

        <div class="film-details__emoji-list">
        ${createEmojiList(emotion)}
        </div>
        <button type="submit" class="film-details__submit-btn">Send</button>
    </form>`;
};

export default createCommentForm;
