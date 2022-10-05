import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};
const sortFilmsDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmA.filmInfo.release.date).diff(dayjs(filmB.filmInfo.release.date));
};
const sortFilmsRating = (filmA, filmB) => {
  const ratingA = Number(filmA.filmInfo.totalRating);
  const ratingB = Number(filmB.filmInfo.totalRating);

  if (ratingA > ratingB) {
    return -1;
  }
  if (ratingB > ratingA) {
    return 1;
  }

  return 0;
};

export { sortFilmsDate, sortFilmsRating };
