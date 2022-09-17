import createFilmCardControls from './film-card-controls-view';
import { HumanizeDate } from '../../util';

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

export default createFilmsCardTemplate;
