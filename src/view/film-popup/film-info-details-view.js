import { humanizeFilmDurationDate, humanizeFilmReleaseDate } from '../../util';

const createInfoTemplate = (filmInfo) => {
  const {
    title,
    alternativeTitle,
    imgSrc,
    ageRating,
    director,
    totalRating,
    writers,
    actors,
    runtime,
    description,
    genre,
    release: { date: releaseDate, releaseCountry },
  } = filmInfo;

  return `
    <div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="${imgSrc}" alt="">
  
      <p class="film-details__age">${ageRating}+</p>
    </div>
  
    <div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${title}</h3>
          <p class="film-details__title-original">${alternativeTitle}</p>
        </div>
  
        <div class="film-details__rating">
          <p class="film-details__total-rating">${totalRating}</p>
        </div>
      </div>
  
      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${writers}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${actors}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${humanizeFilmReleaseDate(releaseDate)}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${humanizeFilmDurationDate(runtime)}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${releaseCountry}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Genre${genre.length > 1 ? 's' : ''}</td>
          <td class="film-details__cell">
            ${genre.map((el) => `<span class="film-details__genre">${el}</span>`).join('')}
          </td>
        </tr>
      </table>
  
      <p class="film-details__film-description">
        ${description}
      </p>
    </div>
  </div>
    `;
};

export default createInfoTemplate;
