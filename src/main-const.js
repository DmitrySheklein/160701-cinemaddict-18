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
  DELETE_COMMENT: 'ADD_COMMENT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  UpdateType,
  UserAction,
  StatusMap,
  MAX_COMMENTS_COUNT,
  NavigationType,
  SortType,
  DEFAULT_VIEW_POPUP_DATA,
};
