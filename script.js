const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash Api
const count = 30;
const apiKey = "G0EJT97BMSyZit3WPHIiD6RFK0EZTh6QUw9NAyP_EQ0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
  imageLoaded++;
  console.log("image loaded");
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log(`ready =`, ready);
  }
}

//Helper function to Set attributes on Dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for Links and photos and add them to the Dom

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images:", totalImages);
  //Run function for each object in photos Array
  photosArray.forEach((photo) => {
    // Create an <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //Create alt element
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event Listners,check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //Put <img> inside the <a> elemnt,then put both inside image container elemet
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash Api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error here
  }
}

// check to see if scrolling near bottom of page,load More photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//On Load
// getPhotos();
