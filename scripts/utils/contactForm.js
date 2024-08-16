
import { getPhotographers } from '../pages/index.js';
import { getQueryParams } from '../pages/photographer.js';
const modal = document.getElementById("contact_modal"); // Sélectionne la modale complète
const modalBtn = document.querySelectorAll(".contact_button"); // Bouton(s) pour ouvrir la modale
const closeStar = document.querySelector(".closeStar"); // Bouton pour fermer la modale

// Fonction pour lancer la modale de formulaire
async function displayModal() {
    const modalTitle = document.getElementById("modalTitle");

    // Récupérer le nom du photographe et l'afficher dans le titre
    // Récupérer les détails du photographe
    const { photographerId } =  getQueryParams();
    const photographersData = await getPhotographers();
    const photographer = photographersData.photographers.find(p => p.id === photographerId);

    if (photographer) {
        modalTitle.textContent = `Contactez-moi - ${photographer.name}`;
    } else {
        modalTitle.textContent = `Contactez-moi`;
    }

    
    modal.style.display = "block"; // Affiche la modale
    modal.scrollIntoView({ behavior: "smooth" }); // Fais défiler la page jusqu'à la modale
}
// Pour fermer la modale de message
function closeModal() {
    modal.style.display = "none";
  }


// Ajouter des événements pour ouvrir et fermer les modales
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal));
closeStar.addEventListener("click", closeModal); //close star

