// Imporation de la fonction depuis le fichier photgrapher.js
import { photographerTemplate } from '../templates/photographer.js';

//Récupérer les données du fichier Json 
 export async function getPhotographers() {
    const response = await fetch("../../data/photographers.json");
    const photographers = await response.json();
    return photographers;
}

//afficher les phorographers
export async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section"); // on va ajouter les cartesphotographes dans cette classe
    photographers.forEach((photographer) => {
        // Crée un modèle pour chaque photographe
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);// ajouter les élements de la méthode userCardDom  à la section (photographer_section)
    });
}

// Fonction d'initialisation des données 
async function init() {
    // Récupère les données des photographes
    const {photographers} = await getPhotographers();//déstructuration d'objets (photographers) (pour obtenier les données)
    displayData(photographers); //(Affiche les données des photographes) 
}

// pour démarrer le processus de récupération et d'affichage
init();
    