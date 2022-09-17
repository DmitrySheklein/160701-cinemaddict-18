import { createElement } from '../render';
import { HumanizeDate } from '../util';

const createFilmCardControls = (userDetails) => {
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const activeControlClassName = 'film-card__controls-item--active';

  return `
<div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${
  watchlist ? activeControlClassName : ''
}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${
  alreadyWatched ? activeControlClassName : ''
}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${
  favorite ? activeControlClassName : ''
}" type="button">Mark as favorite</button>
</div>`;
};

const createFilmsCardTemplate = ({ filmInfo, comments, userDetails }) => {
  const { title, totalRating, year, description, genre, imgSrc, runtime } = filmInfo;

  const commentsText = `${comments.length} comment${comments.length > 1 ? 's' : ''}`;

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${HumanizeDate.FilmDuration(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${`.${imgSrc}`}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${commentsText}</span>
    </a>
    ${createFilmCardControls(userDetails)}
  </article>`;
};

export default class FilmsCard {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmsCardTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
