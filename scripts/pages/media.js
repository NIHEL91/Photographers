import { mediaTemplate } from '../pages/photographer.js';


async function getMedia() {
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
    const {media} = await getMedia();//déstructuration d'objets (photographers)
    displayDataMedia(media); // Affiche les données des photographes

}


    
    init();
    