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

let mediaSorted = [];
export {mediaSorted};

export const media = {
    // Getter pour récupérer le tableau trié
    get sortedMedia() {
        return mediaSorted; 
    },

    // Setter pour définir le tableau trié
    set sortedMedia(sortedArray) { // sortedArray est le tableau qu'on passe pour mettre à jour mediaSorted
        mediaSorted = sortedArray; // met à jour mediaSorted avec la nouvelle valeur sortedArray
    }
};


// Trier les médias
 export  function sortMedia(option,mediaById) {
    if (option === "date") {
        mediaById.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "title") {
        mediaById.sort((a, b) => a.title.localeCompare(b.title));
    }

    clearMedia();
    displayDataMedia(mediaById);
      // Utilise le setter pour mettre à jour le tableau trié
      media.sortedMedia = mediaById;
      
    }

// Supprimer tous les médias dans l'HTML
export function clearMedia() {
    const mediaContainer = document.querySelector(".photographer-container");
    mediaContainer.innerHTML = '';
}





