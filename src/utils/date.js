import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(objectSupport);
dayjs.extend(relativeTime);

class HumanizeDate {
  static FilmDuration(minute) {
    return dayjs({ minute }).format('H[h] mm[m]');
  }

  static FilmReleaseYear(date) {
    return dayjs(date).format('YYYY');
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

export { HumanizeDate };
