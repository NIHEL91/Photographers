import { mediaTemplate } from '../templates/media.js';

let mediaArray = [];

export async function getMedia() {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    console.log (data);
    return data;
}

//afficher les medias
async function displayDataMedia( media) {
    const photographContainer = document.querySelector(".photographer-container");



    media.forEach((mediaItem) => {
        const mediaModel = mediaTemplate(mediaItem);
        const photoCardDOM = mediaModel.getPhotoCardDOM();
        photographContainer.appendChild(photoCardDOM);
    });
}
 // Fonction d'initialisation
 async function init() {

    // Récupère les données des photographes
    const {media} = await getMedia();
    mediaArray = media;
    displayDataMedia(mediaArray); 


}

//systéme de trie par date te titre 
// Variable pour stocker les médias

document.getElementsByClassName("options").addEventListener("change", (event) => {
    sortMedia(event.target.value);
});

function clearMedia() {
    const mediaContainer = document.getElementsByClassName("photographer-container");
    mediaContainer.innerHTML = '';
}

function sortMedia(option) {
    let sortedMedia = [];

    if (option === "date") {
        sortedMedia = mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "title") {
        sortedMedia = mediaArray.sort((a, b) => a.title.localeCompare(b.title));
    }

    clearMedia();
    displaySortedMedia(sortedMedia);
}

function displaySortedMedia(mediaArray) {
    mediaArray.forEach(media => {
        displayMedia(media);
    });
}

    
init();
    