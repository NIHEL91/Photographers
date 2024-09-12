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

// Trier les médias
export function sortMedia(option,mediaById) {
    if (option === "date") {
        mediaById.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "title") {
        mediaById.sort((a, b) => a.title.localeCompare(b.title));
    }

    clearMedia();
    displayDataMedia(mediaById);
}

// Supprimer tous les médias dans l'HTML
export function clearMedia() {
    const mediaContainer = document.querySelector(".photographer-container");
    mediaContainer.innerHTML = '';
}





