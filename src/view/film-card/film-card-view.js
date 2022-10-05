import createFilmCardControls from './film-card-controls-view';
import { HumanizeDate } from '../../util';

const createFilmsCardTemplate = ({ filmInfo, comments, userDetails }) => {
  const {
    title,
    totalRating,
    release: { date },
    description,
    genre,
    poster,
    runtime,
  } = filmInfo;

  const commentsText = `${comments.length} comment${comments.length > 1 ? 's' : ''}`;
  const cutLongDescription = (descriptionText) => {
    const MAX_DESCRIPTION_LENGTH = 140;

    if (descriptionText.length >= MAX_DESCRIPTION_LENGTH) {
      let newStr = descriptionText.slice(0, MAX_DESCRIPTION_LENGTH - 1);
      newStr += '...';

      return newStr;
    }

    return descriptionText;
  };

  return `
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${HumanizeDate.FilmReleaseYear(date)}</span>
        <span class="film-card__duration">${HumanizeDate.FilmDuration(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${cutLongDescription(description)}</p>
      <span class="film-card__comments">${commentsText}</span>
    </a>
    ${createFilmCardControls(userDetails)}
  </article>`;
};

export default createFilmsCardTemplate;
