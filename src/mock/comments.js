import { Random, ArrayEnhanced } from '../util';

const commentEmotions = ['smile', 'sleeping', 'puke', 'angry'];
/*
Текст комментария;
Эмоция;
Автор комментария;
Дата комментария;
Кнопка удаления.
*/
const generateComment = () => ({
  id: '',
  text: '',
  emotion: Random.itemFromArray(commentEmotions),
  author: '',
  date: '2019-05-11T16:12:32.554Z',
});

export { generateComment };
