import { NavigationType } from './main-const';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(objectSupport);
dayjs.extend(relativeTime);

class Random {
  static int(min, max) {
    const minIsPositive = min >= 0;
    const maxIsPositive = max >= 0;

    if (!(minIsPositive && maxIsPositive)) {
      throw new Error('Диапазон может быть только положительный, включая ноль');
    }
    if (min >= max || min === max) {
      throw new Error('Значение «до» меньшее, чем значение «от», или равное ему');
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static float(min, max, fixNumberSigns = 2) {
    const minIsPositive = min >= 0;
    const maxIsPositive = max >= 0;

    if (!(minIsPositive && maxIsPositive)) {
      throw new Error('Диапазон может быть только положительный, включая ноль');
    }
    if (min >= max || min === max) {
      throw new Error('Значение «до» меньшее, чем значение «от», или равное ему');
    }
    return Number(Math.random() * (max - min) + min).toFixed(fixNumberSigns);
  }

  static itemFromArray(array) {
    if (!Array.isArray(array)) {
      throw new Error('Передан не массив');
    }
    return array[Random.int(0, array.length - 1)];
  }

  static date() {
    return dayjs(new Date(new Date() - Math.random() * 1e12)).toISOString();
  }
}

class ArrayEnhanced extends Array {
  static get [Symbol.species]() {
    return Array;
  }

  shuffle() {
    const newArray = Array.from(this);

    for (let i = newArray.length - 1; i > 0; i--) {
      const num = Math.floor(Math.random() * (i + 1));
      const buffer = newArray[num];
      newArray[num] = newArray[i];
      newArray[i] = buffer;
    }

    return newArray;
  }

  randomLength() {
    const newArray = Array.from(this);

    return this.shuffle(newArray).slice(0, Random.int(1, newArray.length - 1));
  }
}
class HumanizeDate {
  static FilmDuration(minute) {
    return dayjs({ minute }).format('H[h] mm[m]');
  }

  static FilmRelease(date) {
    return dayjs(date).format('M MMM YYYY');
  }

  static Comment(date) {
    return dayjs(date).format('YYYY/MM/DD HH:mm');
  }

  static FromNow(date) {
    return dayjs(date).fromNow();
  }
}
const generatePerson = (namesArray = [], surnamesArray = []) =>
  `${Random.itemFromArray(namesArray)} ${Random.itemFromArray(surnamesArray)}`;
const isEsc = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const NavigationFilter = {
  [NavigationType.ALL.id]: (films) => films,
  [NavigationType.WATCHLIST.id]: (films) =>
    films.filter(({ userDetails }) => userDetails.watchlist),
  [NavigationType.HISTORY.id]: (films) =>
    films.filter(({ userDetails }) => userDetails.alreadyWatched),
  [NavigationType.FAVORITES.id]: (films) => films.filter(({ userDetails }) => userDetails.favorite),
};

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

export {
  Random,
  ArrayEnhanced,
  HumanizeDate,
  generatePerson,
  isEsc,
  NavigationFilter,
  sortFilmsDate,
  sortFilmsRating,
};
