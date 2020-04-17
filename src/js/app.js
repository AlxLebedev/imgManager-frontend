import ImageConstructor from './ImageConstructor';

const imagesContainer = document.getElementsByClassName('images-container')[0];
const errorMessageElement = document.getElementById('error-message');
const selectFileButton = document.querySelector('#select-file-button');
const dragAndDropField = document.querySelector('#drag-and-drop-field');
const imageConstructor = new ImageConstructor(imagesContainer, errorMessageElement);
const server = 'https://img-manager-hw7.herokuapp.com';

dragAndDropField.addEventListener('click', () => {
  selectFileButton.value = null;
  selectFileButton.dispatchEvent(new MouseEvent('click'));
});

dragAndDropField.addEventListener('mouseover', () => {
  dragAndDropField.classList.add('dragover');
});

dragAndDropField.addEventListener('mouseout', () => {
  dragAndDropField.classList.remove('dragover');
});

dragAndDropField.addEventListener('dragover', (event) => {
  event.preventDefault();
  dragAndDropField.classList.add('dragover');
});

dragAndDropField.addEventListener('dragleave', (event) => {
  event.preventDefault();
  dragAndDropField.classList.remove('dragover');
});

dragAndDropField.addEventListener('drop', (event) => {
  event.preventDefault();
  const images = Array.from(event.dataTransfer.files);
  imageConstructor.loadImages(images);
});

selectFileButton.addEventListener('change', (event) => {
  const images = Array.from(event.currentTarget.files);
  imageConstructor.loadImages(images);
});

imagesContainer.addEventListener('click', (event) => {
  if (event.target.className === 'remove-image') {
    const imageForDelete = event.target.closest('.image-element');

    const params = new URLSearchParams();
    params.append('file', imageForDelete.querySelector('.image-item').src);

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${server}/?${params}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
      console.log(xhr.responseText);
    });
    xhr.send();

    imagesContainer.removeChild(imageForDelete);
  }
});
