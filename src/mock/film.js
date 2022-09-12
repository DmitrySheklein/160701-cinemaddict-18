import { Random, ArrayEnhanced } from '../util';
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
} from './const';

const generateGenre = () => new ArrayEnhanced(...genre).randomLength();
const generateDescription = () => new ArrayEnhanced(...description).randomLength();
const generatePerson = () => `${Random.itemFromArray(names)} ${Random.itemFromArray(surnames)}`;
const generateBoolean = () => Boolean(Random.int(0, 1));
const generateFilmCard = () => ({
  id: 0,
  filmInfo: {
    title: Random.itemFromArray(titles),
    alternativeTitle: Random.itemFromArray(titles),
    imgSrc: Random.itemFromArray(images),
    ageRating: Random.int(AgeRating.MIN, AgeRating.MAX),
    director: generatePerson(),
    writers: Array.from({ length: Random.int(1, 5) }, generatePerson),
    actors: Array.from({ length: Random.int(1, 5) }, generatePerson),
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
  comments: Array.from({ length: Random.int(0, 10) }, (_el, i) => i),
  userDetails: {
    watchlist: generateBoolean(),
    alreadyWatched: generateBoolean(),
    watchingDate: Random.date(),
    favorite: generateBoolean(),
  },
});

export { generateFilmCard };
