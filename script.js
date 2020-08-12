const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// unsplash api
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${config.API_KEY || secrets.API_KEY}&count=${count}`;

// Helper functions
function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
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
  } catch(err) {
    console.log(err);
  }
}

getPhotos();