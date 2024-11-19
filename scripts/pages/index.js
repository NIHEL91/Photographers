// Imporation de la fonction depuis le fichier photgrapher.js
import { photographerTemplate } from '../templates/photographer.js';
import { getPhotographers } from '../utils/data.js';


//afficher les phorographers
export async function displayData(photographers) {
    // on va ajouter les cartes photographes dans cette classe
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        // Crée un modèle pour chaque photographe
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        // ajouter les élements de la méthode userCardDom  à la section (photographer_section)
        photographersSection.appendChild(userCardDOM);
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

