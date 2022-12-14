const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic 132dds2Z';
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
const NavigationFilter = {
  [NavigationType.ALL.id]: (films) => films,
  [NavigationType.WATCHLIST.id]: (films) =>
    films.filter(({ userDetails }) => userDetails.watchlist),
  [NavigationType.HISTORY.id]: (films) =>
    films.filter(({ userDetails }) => userDetails.alreadyWatched),
  [NavigationType.FAVORITES.id]: (films) => films.filter(({ userDetails }) => userDetails.favorite),
};

const StatusTitleMap = {
  [NavigationType.ALL.id]: 'There are no movies in our database',
  [NavigationType.WATCHLIST.id]: 'There are no movies to watch now',
  [NavigationType.HISTORY.id]: 'There are no watched movies now',
  [NavigationType.FAVORITES.id]: 'There are no favorite movies now',
};
const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};
const DEFAULT_VIEW_POPUP_DATA = {
  newComment: {
    comment: '',
    emotion: '',
  },
  scrollPosition: 0,
};
const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {
  END_POINT,
  AUTHORIZATION,
  UpdateType,
  UserAction,
  StatusTitleMap,
  NavigationFilter,
  NavigationType,
  SortType,
  DEFAULT_VIEW_POPUP_DATA,
};
