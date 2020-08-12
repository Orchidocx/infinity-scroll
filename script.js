const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let initialLoad = true;
let ready = false;
let imagesLoaded = 30;
let totalImages = 0;
let photosArray = [];
// unsplash api
let count = 5;
const API_KEY = '4BW62CughI1XO8M6TUf9vSiGr5J-DwQ4KRFx3VtP-sI';
const url = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=`;
let apiUrl = `${url}${count}`;

function imageLoaded() {
  ++imagesLoaded;
  if(imagesLoaded === totalImages) {
    ready = true;
    console.log(`ready = ${ready}`);
    loader.hidden = true;
  }
}

// Helper functions
function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function updateImageLoadCount(amount) {
  apiUrl = `${url}${amount}`;
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      'href': photo.links.html,
      'target': '_blank'
    });
    
    const img = document.createElement('img');
    setAttributes(img, {
      'src': photo.urls.regular,
      'alt': photo.alt_description,
      'title': photo.alt_description
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl, {'Accept-Version':'v1'});
    photosArray = await response.json();
    displayPhotos();
    if(initialLoad) {
      updateImageLoadCount(30);
      initialLoad = false;
    }
  } catch(err) {
    console.log(err);
  }
}

window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

getPhotos();