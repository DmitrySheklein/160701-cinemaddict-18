const StatusMap = {
  'All movies': 'There are no movies in our database',
  'Watchlist': 'There are no movies to watch now',
  'History': 'There are no watched movies now',
  'Favorites': 'There are no favorite movies now',
};
const MAX_COMMENTS_COUNT = 5;
const NavigationType = {
  ALL: {
    id: 'all',
    name: 'All movies',
  },
  WATCHLIST: {
    id: 'watchlist',
    name: 'Watchlist',
  },
  HISTORY: {
    id: 'history',
    name: 'History',
  },
  FAVORITES: {
    id: 'favorites',
    name: 'Favorites',
  },
};
const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export { StatusMap, MAX_COMMENTS_COUNT, NavigationType, SortType };
