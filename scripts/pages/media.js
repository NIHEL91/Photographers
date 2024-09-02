import { mediaTemplate } from '../templates/media.js';
import { getPhotographers } from '../pages/index.js';
import { photographerMediaTemplate } from '../utils/photographersMedia.js';

  let mediaById = [];

// Pour récupérer le ID depuis l'URL
  export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        photographerId: parseInt(params.get('photographerId'))
    };
}

// Récupérer les médias
export async function getMedia() {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const media = data.media;
    const { photographerId } = getQueryParams(); // Obtenir l'ID du photographe depuis l'URL
    mediaById = media.filter(mediaItem => mediaItem.photographerId === photographerId);
    return mediaById;
}

// Trier les médias
export function sortMedia(option) {
    if (option === "date") {
        mediaById.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "title") {
        mediaById.sort((a, b) => a.title.localeCompare(b.title));
    }

    clearMedia();
    displayDataMedia(mediaById);
    console.log(mediaById);
}

// Supprimer tous les médias dans l'HTML
export function clearMedia() {
    const mediaContainer = document.querySelector(".photographer-container");
    mediaContainer.innerHTML = '';
}

// Afficher les médias
export async function displayDataMedia(media) {
    const photographContainer = document.querySelector(".photographer-container");
    media.forEach((mediaItem) => {
        const mediaModel = mediaTemplate(mediaItem);
        const photoCardDOM = mediaModel.getPhotoCardDOM();
        photographContainer.appendChild(photoCardDOM);
    });
}

// Afficher les détails du photographe
export async function displayPhotographerDetails() {
    const { photographerId } = getQueryParams();
    const data = await getPhotographers();
    const photographer = data.photographers.find(p => p.id === photographerId);

    if (photographer) {
        const photographHeader = document.querySelector(".photograph-header");
        const photographerModel = photographerMediaTemplate(photographer);
        const photographerCardDOM = photographerModel.getPhotographerCardDOM();
        photographHeader.appendChild(photographerCardDOM);
    } else {
        console.error('Photographer not found');
    }
}

// Fonction d'initialisation
export async function init() {
    await displayPhotographerDetails();
    const media = await getMedia();
    displayDataMedia(media);
}
