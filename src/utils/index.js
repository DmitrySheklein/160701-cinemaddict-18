const isEsc = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isSubmit = (evt) => evt.type === 'submit';
const isCtrlEnter = (evt) => (evt.ctrlKey || evt.metaKey) && evt.key === 'Enter';

const getUserStatus = (films) => {
  const watchedFilmsCount = films.reduce(
    (acc, film) => (acc += film.userDetails.alreadyWatched),
    0,
  );
  const UserTitle = {
    0: '',
    10: 'novice',
    20: 'fan',
    21: 'movie buff',
  };
  const statusText = Object.entries(UserTitle).reduce((acc, [key, value]) => {
    if (watchedFilmsCount > Number(key)) {
      return (acc += value);
    }
    return acc;
  }, '');

  return statusText;
};
export { isEsc, isSubmit, isCtrlEnter, getUserStatus };
