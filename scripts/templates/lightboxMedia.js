import { getMediaById } from '../utils/media.js';

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');

let currentIndex = -1;
// Fonction pour ouvrir la lightbox
 export function openLightbox(src, mediaType) {
    const mediaSorted = getMediaById();
    currentIndex = mediaSorted.findIndex(media => {
        const filePath = `assets/media/${media.image || media.video}`;
        return filePath === src;
    });
    const currentMedia = mediaSorted[currentIndex];

    // Mettre à jour le titre avec le titre du média courant
    const lightboxTitle = document.getElementById('lightbox-title');
    lightboxTitle.textContent = currentMedia.title;

    // Mettre à jour l'affichage de la lightbox
    updateLightbox(src, mediaType);
    lightbox.classList.add('active-lightbox'); // Affiche la lightbox
}


// Fonction pour fermer la lightbox
function closeLightbox() {
    // Retire la classe pour masquer la lightbox
    lightbox.classList.remove('active-lightbox');
 
     lightboxImg.src = '';
     lightboxImg.style.display = 'none'; // Masquer l'image

     lightboxVideo.src = '';
     lightboxVideo.style.display = 'none'; // Masquer la vidéo

     lightboxVideo.pause(); // Mettre la vidéo en pause lorsqu'on ferme la lightbox
}

// Événement pour fermer la lightbox en cliquant sur la croix
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);

// Fonction pour mettre à jour la lightbox
function updateLightbox(src, mediaType) {
    if (mediaType === 'image') {
        lightboxImg.src = src; // Afficher l'image
        lightboxImg.style.display = 'block'; // Afficher l'image dans la lightbox
        lightboxVideo.style.display = 'none'; // Masquez l'image

    } else if (mediaType === 'video') {
        lightboxVideo.src = src; // Afficher la vidéo
        lightboxVideo.style.display = 'block'; // Afficher la vidéo dans la lightbox     
        lightboxVideo.controls = true; // Ajout de l'attribut controls


        lightboxImg.style.display = 'none'; // Afficher l'image dans la lightbox

    }
}

// Affiche le média suivant
function getNextMedia() {
    const mediaSorted = getMediaById();
  
    const nextIndex = (currentIndex + 1) % mediaSorted.length;
    currentIndex = nextIndex;
    const nextMedia = mediaSorted[currentIndex];
    if (nextMedia) {
      const newSrc = `assets/media/${nextMedia.image || nextMedia.video}`;
      const mediaType = nextMedia.image ? 'image' : 'video'; //opérateur ternaire,(les conditions image ou video )le média est considéré comme une image, sinon, c'est une vidéo ca remplace le if else
      updateLightbox(newSrc, mediaType);
    }
}

// Affiche le média précédent
function getPreviousMedia() {
    const mediaSorted = getMediaById();
    const previousIndex = (currentIndex - 1 + mediaSorted.length) % mediaSorted.length;
    currentIndex = previousIndex;
    const previousMedia = mediaSorted[currentIndex];
    if (previousMedia) {
      const newSrc = `assets/media/${previousMedia.image || previousMedia.video}`;
      const mediaType = previousMedia.image ? 'image' : 'video'; //opérateur ternaire,(les conditions image ou video )le média est considéré comme une image, sinon, c'est une vidéo ca remplace le if else
      updateLightbox(newSrc, mediaType);

    }
}


// Ajouter des événements sur les boutons "Next" et "Previous"
document.getElementById('next-btn').addEventListener('click', getNextMedia);
document.getElementById('prev-btn').addEventListener('click', getPreviousMedia);

//accécibilité de lightbox 
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            getPreviousMedia(); // Fonction à définir pour afficher l'image précédente
        } else if (event.key === 'ArrowRight') {
            getNextMedia(); // Fonction à définir pour afficher l'image suivante
        } else if (event.key === 'Escape') {
            closeLightbox(); // Fonction à définir pour fermer la Lightbox
        }
    }
});


