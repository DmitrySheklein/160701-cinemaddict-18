import { Random, ArrayEnhanced } from '../util';
import { emotions, description, names, surnames } from './const';

const generateCommentText = () => new ArrayEnhanced(...description).randomLength().join(' ');
const generatePerson = () => `${Random.itemFromArray(names)} ${Random.itemFromArray(surnames)}`;
const generateComment = (id = 0) => ({
  id: id,
  text: generateCommentText(),
  emotion: Random.itemFromArray(emotions),
  author: generatePerson(),
  date: Random.date(),
});

export { generateComment };
