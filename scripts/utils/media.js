
 import { mediaTemplate } from "../templates/media.js";

// Afficher les médias
export async function displayDataMedia(media) {
    const photographContainer = document.querySelector(".photographer-container");
    media.forEach((mediaItem) => {
        const mediaModel = mediaTemplate(mediaItem);
        const photoCardDOM = mediaModel.getPhotoCardDOM();
        photographContainer.appendChild(photoCardDOM);
    });
}
let mediaById = []; // Variable globale pour stocker les médias

//getter et setter
export function getMediaById() {
    return mediaById;
}

export function setMediaById(media) {
    mediaById = media;

}

// Fonction pour trier les médias
export function sortMedia(option, media) {
    mediaById = media; 
    // Tri selon l'option choisie
    if (option === "date") {
        mediaById.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "title") {
        mediaById.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (option === 'popularity') {
         mediaById.sort((a, b) => b.likes - a.likes);
    }
    // Supprime tous les médias de l'HTML avant d'afficher les nouveaux triés
    clearMedia();
    displayDataMedia(mediaById);
    // Utilise le setter pour mettre à jour le tableau trié
    setMediaById(mediaById);
    console.log('le tableau est bien trié:',mediaById);
}

// Changer le tri dynamiquement depuis le menu déroulant
const dropdown = document.querySelector('.options');
dropdown.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    sortMedia(selectedOption, mediaById);
});
// Fonction pour supprimer tous les médias dans l'HTML
export function clearMedia() {
    const mediaContainer = document.querySelector(".photographer-container");
    mediaContainer.innerHTML = ''; // Vide le contenu du conteneur
}
