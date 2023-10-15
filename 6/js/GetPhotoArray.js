import { MAX_LENGHT_ARRAY_PHOTOS, getRandomInt, getRandomArrayElement, namesExamples, commentsExamples } from './utils.js';

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

export const getPhotoArray = () => {
  const photos = [];
  for (let i = 1; i <= MAX_LENGHT_ARRAY_PHOTOS; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Description of Photo ${i}`,
      likes: getRandomInt(15, 200),
      comments: generateComments(),
    };
    photos.push(photo);
  }
  return photos;
};
