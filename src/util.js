import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

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
    return array[Random.int(0, array.length - 1)];
  }

  static date() {
    return dayjs(new Date(new Date() - Math.random() * 1e12)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
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
const humanizeFilmDurationDate = (minute) => dayjs({ minute }).format('H[h] mm[m]');
const humanizeFilmReleaseDate = (date) => dayjs(date).format('M MMM YYYY');

export { Random, ArrayEnhanced, humanizeFilmDurationDate, humanizeFilmReleaseDate };
