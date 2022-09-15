const createInfoControlsTemplate = (userDetails) => {
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const activeClass = 'film-details__control-button--active';

  return `
    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${
  watchlist ? activeClass : ''
}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${
  alreadyWatched ? activeClass : ''
}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${
  favorite ? activeClass : ''
}" id="favorite" name="favorite">Add to favorites</button>
    </section>
    `;
};

export default createInfoControlsTemplate;
