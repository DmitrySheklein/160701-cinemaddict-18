import { createElement } from '../render';
import { humanizeFilmDurationDate } from '../util';

const createFilmsCardTemplate = ({ filmInfo }) => {
  const { title, ratio, year, description, genre, imgSrc, runtime } = filmInfo;

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${ratio}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${humanizeFilmDurationDate(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${`.${imgSrc}`}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">5 comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmsCard {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmsCardTemplate(this.film);
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
