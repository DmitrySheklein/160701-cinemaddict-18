import createInfoTemplate from './film-info-details-view';
import createInfoControlsTemplate from './film-details-control-view';
import createComment from './create-comment-view';
import createCommentForm from './form-new-comment-view';

const createFilmsPopupTemplate = (state) => {
  const {
    film: { filmInfo, userDetails },
    comments,
    newComment,
  } = state;

  return `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${createInfoTemplate(filmInfo)}

          ${createInfoControlsTemplate(userDetails)}
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
              Comments
              <span class="film-details__comments-count">${comments.length}</span>
            </h3>

            <ul class="film-details__comments-list">
              ${comments.map(createComment).join('')}
            </ul>

              ${createCommentForm(newComment)}
          </section>
        </div>
      </div>
    </section>
    `;
};

export default createFilmsPopupTemplate;
