import { onDocumentKeydown } from "./utils.js";

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imgOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const regExp = /^#[0-9a-zа-яё]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validateHashtagsCount = (value) => {
  return value.trim().split(' ').length <= 5;
}

const validateHashtagsUniqueness = (value) => {
  return value.trim().split(' ').includes(value.trim()) == false;
}

const validateHashtags = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; ++i) {
    if (!regExp.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'Максимальное допустимое количество хэштегов - 5'
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUniqueness,
  'Не должно быть повторяющихся хэштегов'
);

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  'Ошибка в хештеге'
);

const validateDescription = (value) => {
  return value.trim().length <= 140;
}

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Длина описания не может быть больше 140 символов'
);

const hideOverlay = () => {
  imgOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown(closeOverlay));
}

const showOverlay = () => {
  imgOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown(closeOverlay));
}

const openOverlay = (evt) =>{
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown(closeOverlay));
  uploadInput.removeEventListener('click', openOverlay);
}

const closeOverlay = (evt) => {
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown(closeOverlay));
  uploadInput.addEventListener('click', openOverlay);
  uploadInput.value = null;
  hashtagsField.textContent = '';
  descriptionField.textContent = '';
}

uploadInput.addEventListener('change', openOverlay);
