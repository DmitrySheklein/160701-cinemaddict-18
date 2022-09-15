import { Random, ArrayEnhanced } from '../util';
import { FILM_CARD_COUNT, MAX_COMMENTS_COUNT } from './const';
import {
  titles,
  description,
  images,
  genre,
  countries,
  names,
  surnames,
  AgeRating,
  FilmRating,
  generatePerson,
} from './const';

const generateGenre = () => new ArrayEnhanced(...genre).randomLength();
const generateDescription = () => new ArrayEnhanced(...description).randomLength().join(' ');
const generatePersons = () =>
  Array.from({ length: Random.int(1, 5) }, generatePerson.bind(null, names, surnames));
const generateBoolean = () => Boolean(Random.int(0, 1));

const generateFilmCard = () => ({
  filmInfo: {
    title: Random.itemFromArray(titles),
    alternativeTitle: Random.itemFromArray(titles),
    imgSrc: Random.itemFromArray(images),
    ageRating: Random.int(AgeRating.MIN, AgeRating.MAX),
    director: generatePerson(names, surnames),
    writers: generatePersons(),
    actors: generatePersons(),
    totalRating: Random.float(FilmRating.MIN, FilmRating.MAX, 1),
    year: Random.int(1900, 2022),
    runtime: Random.int(30, 120),
    genre: generateGenre(),
    description: generateDescription(),
    release: {
      date: Random.date(),
      releaseCountry: Random.itemFromArray(countries).name,
    },
  },
  userDetails: {
    watchlist: generateBoolean(),
    alreadyWatched: generateBoolean(),
    watchingDate: Random.date(),
    favorite: generateBoolean(),
  },
});

const generateFilms = () => {
  const films = Array.from({ length: FILM_CARD_COUNT }, generateFilmCard);
  let totalCommentCount = 0;

  return films.map((film, index) => {
    const hasComments = Random.int(0, 1);
    const filmsCommentCount = hasComments ? Random.int(1, MAX_COMMENTS_COUNT) : 0;
    totalCommentCount += filmsCommentCount;

    return {
      ...film,
      id: String(index + 1),
      comments: Array.from({ length: filmsCommentCount }, (_value, commentIndex) =>
        String(totalCommentCount - commentIndex),
      ),
    };
  });
};

export { generateFilms };
