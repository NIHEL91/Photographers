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
    let totalLikes= 0;
   /* export function updateTotalLikes() {
        totalLikes += 1;
        const likesCountElement = document.querySelector(".totalLikesCount");
        likesCountElement.innerHTML = `
            ${totalLikes}
            <i class="fa fa-heart"></i>
        `;
    }*/
    const media = await getMedia();
    console.log(media); // Affiche les médias filtrés dans la console
    const photographContainer = document.querySelector(".photographer-container");
    media.forEach((mediaItem) => {
        const mediaModel = mediaTemplate(mediaItem);
        const photoCardDOM = mediaModel.getPhotoCardDOM();
        photographContainer.appendChild(photoCardDOM);

        //Totalité des likes 
        totalLikes += mediaItem.likes; 
        console.log(`Total Likes: ${totalLikes}`); // Affiche le total des likes dans la console

        // Mise à jour du total des likes sur la page
        const likesCountElement = document.querySelector(".totalLikesCount");
        likesCountElement.textContent = totalLikes;
      

    });
  

    // Récupération du photographe spécifique et affichage du prix
    const data = await getPhotographers();
    const { photographerId } = getQueryParams();
    const photographer = data.photographers.find(p => p.id === photographerId);

  
    if (photographer) {
        const totalLikesCount = document.querySelector(".totalLikesCount");
        const priceElement = document.querySelector(".price");
    
        // Récupère le prix du photographe
        const price = photographer.price;
    
        // Mettez à jour le contenu du span totalLikesCount avec les likes et l'icône
        totalLikesCount.innerHTML = `
            ${totalLikes}
            <i class="fa fa-heart"></i>
        `;
    
        // Mettez à jour le contenu du span price avec le prix
        priceElement.textContent = `${price} €/jour`;
    
        console.log(`Price: ${price}€/jour`);
    } else {
        console.error('Photographer not found');
    }
    

}



//
 // Fonction d'initialisation
 async function init() {

    // Récupère les données des photographes
    const {media} = await getMedia();//déstructuration d'objets (photographers)
    displayDataMedia(media); // Affiche les données des photographes
    displayPhotographerDetails();
}


    
    init();
    