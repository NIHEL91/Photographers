import { init, sortMedia } from '../pages/media.js';

// Ajoute un écouteur d'événements pour le changement de sélection dans la liste déroulante
document.querySelector(".options").addEventListener("change", function(event) {
    const selectedOption = event.target.value;
    sortMedia(selectedOption);
});

// Initialiser la page
init();
