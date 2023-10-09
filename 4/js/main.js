const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getPhotoArray = () =>{
  for (let i = 1; i <= 25; i++) {
    const photo = {
        id: i,
        url: `photos/${i}.jpg`,
        description: `Description of Photo ${i}`,
        likes: getRandomInt(15, 200),
        comments: generateComments()
    };
    photos.push(photo);
  }
  console.log(photos);
}

const generateComments = () =>{
  let comments = [];
  const numComments = getRandomInt(0,30);
  for (let i=0; i <= numComments - 1; i++){
    const comment = {
      id: i,
      avatar: "img/avatar-" + getRandomInt(1, 6) + ".svg",
      message: getRandomArrayElement(commentsExamples),
      name: getRandomArrayElement(namesExamples)
    };

    comments.push(comment);
  }
  return comments;
}

let photos = [];

const namesExamples = ["Саша","Оля","Андрей","Вика","Коля","Дима","Юля","Леша","Арсений","Валя", "Костя", "Вероника", "Алина"];

const commentsExamples = ["Всё отлично!",
"В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
"Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
"Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
"Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
