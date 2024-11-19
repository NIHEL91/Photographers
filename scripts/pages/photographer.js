import { getMediaById, sortMedia, setMediaById, displayDataMedia} from '../utils/media.js';
import { getPhotographers } from '../utils/data.js';
import { photographerTemplate } from '../templates/photographer.js';
import { calculateAndDisplayLikes } from '../utils/like.js';
import { setupForm } from '../utils/contactForm.js';


// Récupérer les médias
export async function getMediaByIdFromJson() {
    const { media } =  await getPhotographers();
    const { photographerId } = getQueryParams(); // Obtenir l'ID du photographe depuis l'URL
    const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);
    console.log('Affichage media :', filteredMedia);
    // Utiliser la fonction setter pour mettre à jour mediaById
    setMediaById(filteredMedia);
    return filteredMedia;
}

// Pour récupérer le ID depuis l'URL
export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        photographerId: parseInt(params.get('photographerId'))
    };
}

// Ajoute un écouteur d'événements pour le changement de sélection dans la liste déroulante
document.querySelector(".options").addEventListener("change", function(event) {
    const selectedOption = event.target.value;
    const media = getMediaById();
    sortMedia(selectedOption, media);
});


// Afficher les détails du photographe
export async function displayPhotographerDetails() {
    const { photographerId } = getQueryParams();  // Récupérer l'ID du photographe depuis l'URL
    const data = await getPhotographers();  // Récupérer les données des photographes
    const photographer = data.photographers.find(p => p.id === photographerId);  // Trouver le photographe par son ID
    if (photographer) {
        const photographHeader = document.querySelector(".photograph-header");
        const photographerHeaderModel = photographerTemplate(photographer); // Modèle spécifique au photographe
        const photographerHeaderDOM = photographerHeaderModel.getHeaderDOM();  // Récupérer le DOM du modèle
        photographHeader.appendChild(photographerHeaderDOM);  // Ajouter le contenu au DOM
    } else {
        console.error('Photographer not found');
    }
    return photographer;
}


// Fonction d'initialisation
export async function init() {
    const photographer = await displayPhotographerDetails(); // Récupération du photographe 
    setupForm(photographer);
    const media = await getMediaByIdFromJson(); // Récupération des médias  
    displayDataMedia(media); // Affichage des médias
    calculateAndDisplayLikes(media, photographer); // Passez l'objet 'photographer' ici
}

init(); 
