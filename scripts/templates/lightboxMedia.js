import { getMediaById } from '../utils/media.js';
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const closeLightboxBtn = document.querySelector('.close-lightbox');
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
    lightbox.setAttribute('aria-hidden', 'false'); // Assurer l'accessibilité
    closeLightboxBtn.focus(); // Met le focus sur la croix pour commencer la navigation
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    // Retire la classe pour masquer la lightbox
    lightbox.classList.remove('active-lightbox');
    lightbox.setAttribute('aria-hidden', 'true'); // Accessibilité
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
        lightboxImg.style.display = 'none'; //masquer l'image a l'ouverture de video 

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
closeLightboxBtn.addEventListener('click', closeLightbox);

//accessibilité  de lightbox 
document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('active-lightbox')) {
        if (e.key === 'ArrowRight') { // Flèche droite
            getNextMedia();
        } else if (e.key === 'ArrowLeft') { // Flèche gauche
            getPreviousMedia();
        } else if (e.key === 'Escape') { // Échap
            closeLightbox();
        }
    }
});
