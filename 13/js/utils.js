export const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const onDocumentKeydown = (evt, closingFunc) => {
  if (evt.key === "Escape") {
    closingFunc(evt);
  }
};

export const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];