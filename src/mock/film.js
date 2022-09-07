import { Random, ArrayEnhanced } from '../util';
import { titles, description, images, genre } from './const';

const generateGenre = () => new ArrayEnhanced(...genre).randomLength();
const generateDescription = () => new ArrayEnhanced(...description).randomLength();

const generateFilmCard = () => ({
  id: 0,
  filmInfo: {
    title: Random.itemFromArray(titles),
    alternativeTitle: Random.itemFromArray(titles),
    imgSrc: Random.itemFromArray(images),
    ratio: Random.float(0, 10, 1),
    year: Random.int(1900, 2022),
    runtime: Random.int(30, 120),
    genre: generateGenre(),
    description: generateDescription(),
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland',
    },
  },
  comments: [1, 2],
});

export { generateFilmCard };
