import { Random, ArrayEnhanced } from '../util';

const generatePosterImage = () => {
  const images = [
    '/public/images/posters/made-for-each-other.png',
    '/public/images/posters/popeye-meets-sinbad.png',
    '/public/images/posters/sagebrush-trail.jpg',
    '/public/images/posters/santa-claus-conquers-the-martians.jpg',
    '/public/images/posters/the-dance-of-life.jpg',
    '/public/images/posters/the-great-flamarion.jpg',
    '/public/images/posters/the-man-with-the-golden-arm.jpg',
  ];
  return images[Random.int(0, images.length - 1)];
};
const generateDescription = () => {
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
  const descriptionArray = description.split('.').map((el) => `${el}.`.trim());
  const randArray = new ArrayEnhanced(...descriptionArray).randomLength();

  return randArray;
};

const generateFilmCard = () => ({
  title: '',
  img: generatePosterImage(),
  ratio: 0,
  year: 0,
  description: generateDescription(),
});

export { generateFilmCard };
