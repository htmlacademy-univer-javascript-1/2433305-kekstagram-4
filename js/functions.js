const polyndromCheck = (string) => (string.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '').reverse())

const lengthCheck = (string, length) => {return string.length >= length;};
