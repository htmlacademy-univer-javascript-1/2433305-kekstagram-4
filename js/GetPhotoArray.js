import { MAX_LENGHT_ARRAY_PHOTOS, getRandomInt } from './utils.js';
import { generateComments } from './generateComments.js';

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
