import { createElement } from '../render';
import createInfoTemplate from './film-popup/film-info-details-view';
import createInfoControlsTemplate from './film-popup/film-details-control-view';
import createEmojiList from './film-popup/emoji-list-view';
import createComment from './film-popup/create-comment-view';

const createFilmsPopupTemplate = ({ filmInfo, userDetails }, comments) => `
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
  
          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label"></div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
  
            <div class="film-details__emoji-list">
              ${createEmojiList()}
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>
  `;

export default class FilmsPopup {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createFilmsPopupTemplate(this.film, this.comments);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
