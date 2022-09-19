import { Random, ArrayEnhanced, generatePerson } from '../util';
import { emotions, description, names, surnames } from './const';

const generateCommentText = () => new ArrayEnhanced(...description).randomLength().join(' ');
const generateComment = () => ({
  comment: generateCommentText(),
  emotion: Random.itemFromArray(emotions),
  author: generatePerson(names, surnames),
  date: Random.date(),
});
const getCommentsCount = (films) =>
  films.reduce((count, film) => (count += film.comments.length), 0);

const generateComments = (films) => {
  const commentsCount = getCommentsCount(films);

  return Array.from({ length: commentsCount }, (_value, index) => {
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};
export { generateComments };
