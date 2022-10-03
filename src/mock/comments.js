import { Random, ArrayEnhanced, generatePerson } from '../util';
import { emotions, description, names, surnames } from './const';

const generateCommentText = () => new ArrayEnhanced(...description).randomLength().join(' ');
const generateComment = () => ({
  comment: generateCommentText(),
  emotion: Random.itemFromArray(emotions),
  author: generatePerson(names, surnames),
  date: Random.date(),
});

const getCommentsIdMap = (films) =>
  films.reduce((acc, film) => (acc = [...acc, ...film.comments]), []);
const generateComments = (films) => {
  const commentsIdMap = getCommentsIdMap(films);

  return commentsIdMap.map((id) => {
    const commentItem = generateComment();
    return {
      id,
      ...commentItem,
    };
  });
};
export { generateComments };
