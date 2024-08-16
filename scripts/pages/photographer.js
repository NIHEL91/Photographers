import { mediaTemplate } from '../templates/media.js';
import {getPhotographers} from '../pages/index.js';
import {photographerMediaTemplate} from '../utils/photographersMedia.js';

//pour récupérer le id depuis le url
export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        photographerId: parseInt(params.get('photographerId'))
    };
}

   async function getMedia() {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const media = data.media;

    const { photographerId } = getQueryParams(); // Obtenir l'ID du photographe depuis l'URL
    const mediaById = media.filter(mediaItem => mediaItem.photographerId === photographerId);

    return mediaById;
}
//afficher les données de chaque photographers
async function displayPhotographerDetails() {
    const { photographerId } = getQueryParams();
    const data = await getPhotographers();
    //La méthode .find() est une méthode des tableaux en JavaScript qui recherche le premier élément du tableau qui satisfait la condition spécifiée.
    const photographer = data.photographers.find(p => p.id === photographerId);

    if (photographer) {
        const photographHeader = document.querySelector(".photograph-header");

        // Crée un modèle pour le photographe
        const photographerModel = photographerMediaTemplate(photographer);
        const photographerCardDOM = photographerModel.getPhotographerCardDOM();

        // Ajouter les éléments de la méthode getPhotographerCardDOM à la section .photograph-header
        photographHeader.appendChild(photographerCardDOM);
    } else {
        console.error('Photographer not found');
    }
}


//afficher les medias
async function displayDataMedia( ) {
    const media = await getMedia();
    console.log(media); // Affiche les médias filtrés dans la console
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
    const {media} = await getMedia();//déstructuration d'objets (photographers)
    displayDataMedia(media); // Affiche les données des photographes
    displayPhotographerDetails();
}


    
    init();
    