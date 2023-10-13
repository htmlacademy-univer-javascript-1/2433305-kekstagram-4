import { getRandomInt, getRandomArrayElement, namesExamples, commentsExamples } from './utils.js';

export const generateComments = () => {
  const comments = [];
  const numComments = getRandomInt(0, 30);
  for (let i = 0; i <= numComments - 1; i++) {
    const comment = {
      id: i,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomArrayElement(commentsExamples),
      name: getRandomArrayElement(namesExamples),
    };
    comments.push(comment);
  }
  return comments;
};
