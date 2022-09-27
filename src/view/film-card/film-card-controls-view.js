const createFilmCardControls = (userDetails) => {
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const activeClassName = 'film-card__controls-item--active';
  const btnClassName = 'film-card__controls-item';

  return `
<div class="film-card__controls">
    <button class="${btnClassName} film-card__controls-item--add-to-watchlist ${
  watchlist ? activeClassName : ''
}" type="button">
      Add to watchlist
    </button>
    <button class="${btnClassName} film-card__controls-item--mark-as-watched ${
  alreadyWatched ? activeClassName : ''
}" type="button">Mark as watched</button>
    <button class="${btnClassName} film-card__controls-item--favorite ${
  favorite ? activeClassName : ''
}" type="button">Mark as favorite</button>
</div>`;
};

export default createFilmCardControls;
