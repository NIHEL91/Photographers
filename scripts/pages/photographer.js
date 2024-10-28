import { getMediaById, sortMedia, setMediaById} from '../utils/media.js';
import { getPhotographers } from '../pages/index.js';
import { photographerTemplate } from '../templates/photographer.js';
import { displayDataMedia } from '../utils/media.js';
import { calculateAndDisplayLikes } from '../utils/like.js';
import { setupForm } from '../utils/contactForm.js';

//let mediaById = [];

// Récupérer les médias
export async function getMedia() {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const media = data.media;
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
    const { photographerId } = getQueryParams();
    const data = await getPhotographers();
    const photographer = data.photographers.find(p => p.id === photographerId);

    if (photographer) {
        const photographHeader = document.querySelector(".photograph-header");
        const photographerModel = photographerTemplate(photographer);
        const photographerCardDOM = photographerModel.getHeaderDOM();
        photographHeader.appendChild(photographerCardDOM);
        //const modalTitle = document.getElementById("modalTitle");
        //modalTitle.innerHTML = `<span>Contactez-moi</span><br><span>${photographer.name}</span>`;
    
        
    } else {
        console.error('Photographer not found');
    }
    return photographer;
}


// Fonction d'initialisation


export async function init() {
    
    const media = await getMedia(); // Récupération des médias
    const photographer = await displayPhotographerDetails(); // Récupération du photographe
    calculateAndDisplayLikes(media, photographer); // Passez l'objet 'photographer' ici
    displayDataMedia(media); // Affichage des médias
    setupForm();


}
init(); 
