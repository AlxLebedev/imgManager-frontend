/* eslint-disable class-methods-use-this */
export default class ImageConstructor {
  constructor(imagesContainer, errorMessageElement) {
    this.imagesContainer = imagesContainer;
    this.errorMessageElement = errorMessageElement;
    this.server = 'https://img-manager-hw7.herokuapp.com';
  }

  loadImages(images) {
    for (const image of images) {
      // *****************************************
      const formData = new FormData();
      formData.append('file', image);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.server}`);

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const imageURL = `${this.server}/${xhr.response}`;
          this.add('Image Name', imageURL);
        }
      });
      xhr.send(formData);
    }
  }

  add(imageName, url) {
    const newImage = document.createElement('img');
    newImage.src = url;

    newImage.addEventListener('load', () => {
      this.errorMessageElement.classList.add('hidden');
      newImage.className = 'image-item';
      newImage.alt = imageName;

      const newImageElement = document.createElement('div');

      newImageElement.className = 'image-element';
      newImageElement.innerHTML = '<div class="remove-image">x</div>';
      newImageElement.appendChild(newImage);
      this.imagesContainer.appendChild(newImageElement);
    });

    newImage.addEventListener('error', () => {
      this.errorMessageElement.classList.remove('hidden');
    });
  }
}
