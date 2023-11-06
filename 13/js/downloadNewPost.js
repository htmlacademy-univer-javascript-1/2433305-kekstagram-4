import { onDocumentKeydown } from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imgOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const previewPicture = uploadForm.querySelector('.img-upload__preview img');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

//Validation of fieldsets
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
//End of validation of fieldsets


//Overlay controllers
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
  setDefaultScale();
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
//End of overlay controllers

//Scaling controllers
const setDefaultScale = () => {
  scaleValue.value = '100%';
  previewPicture.style.transform = 'scale(1)';
}

const onScaleBigger = (evt) => {
  const currentValue = parseInt(scaleValue.value);
  scaleValue.value = currentValue <= 75 ? `${currentValue + 25}%` : `${currentValue}%`;
  previewPicture.style.transform = `scale(${parseInt(scaleValue.value) * 0.01})`;
}

const onScaleSmaller = (evt) => {
  const currentValue = parseInt(scaleValue.value)
  scaleValue.value = currentValue >= 50 ? `${currentValue - 25}%` : `${currentValue}%`;
  previewPicture.style.transform = `scale(${parseInt(scaleValue.value) * 0.01})`
}

scaleBigger.addEventListener('click', onScaleBigger);
scaleSmaller.addEventListener('click', onScaleSmaller);
//End of scaling controllers

//Filters controllers
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function setDefaultFilter() {
  previewPicture.style.filter = 'none';
  sliderContainer.style.display = 'none';
}

function onFilterClick(evt) {
  const effect = evt.target.value;
  setDefaultFilter();
  if (effect !== 'none') {
    sliderContainer.style.display = 'block';
  }
  switch (effect) {
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      slider.noUiSlider.set(1);
      break;
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      slider.noUiSlider.set(1);
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1
      });
      slider.noUiSlider.set(100);
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      slider.noUiSlider.set(3);
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      slider.noUiSlider.set(3);
      break;
  }
}

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
  const effect = uploadForm.querySelector('.effects__radio:checked').value;
  switch (effect) {
    case 'chrome':
      previewPicture.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'sepia':
      previewPicture.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'marvin':
      previewPicture.style.filter = `invert(${effectLevelValue.value}%)`;
      break;
    case 'phobos':
      previewPicture.style.filter = `blur(${effectLevelValue.value}px)`;
      break;
    case 'heat':
      previewPicture.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
});

document.querySelectorAll('.effects__radio').forEach((li) => {
  li.addEventListener('click', onFilterClick);
});
