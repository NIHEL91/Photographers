
import { updateTotalLikes } from '../utils/like.js'; 
import { getMediaById } from '../utils/media.js';

///Création les élements des photgraphes
 function MediaFactory(data) {
    this.createMedia = function() {
        const { image, video } = data;

        let media ;
        if ( image) {
            media = new Image(image);
            } else if (video) {
            media = new Video(video);
            } else {
                    throw new Error("Type de média non supporté");
        }
        return media;

    };

}

export function mediaTemplate(data) {
        const { title, likes } = data;
        const mediaFactory = new MediaFactory(data);
        const media = mediaFactory.createMedia();  
        // Variable pour stocker les likes actuels dans le fichier jison
        let existLikes = likes;
    
    function getPhotoCardDOM() {

        const article = document.createElement( 'article' );
        // Création de la balise figure
        const figure = document.createElement( 'figure' );
        figure.classList.add('media-figure'); // Ajoute une classe pour appliquer le CSS

        //Création de la balise image
        let mediaImgVid = media.getDOM();
    
        //Création du div pour le titre et l'icon
        const text = document.createElement( 'div' );
        text.classList.add('text'); 

        //Création du titre
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;

       //div pour  l'icone et le compteur 
        const likeContainer = document.createElement('div');
        likeContainer.classList.add('like-container');

        // Compteur de likes
        const likeCount = document.createElement('span');
        likeCount.textContent = existLikes;
        likeCount.classList.add('like-count');

        // Icône de like
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-heart');
       
        
        // Ajouter un événement au clic pour incrémenter les likes
        icon.addEventListener('click', () => {
            existLikes += 1;
            likeCount.textContent = existLikes;
           updateTotalLikes();
           

     });
      
        likeContainer.appendChild(likeCount);
        likeContainer.appendChild(icon);
        text.appendChild(h2);
        text.appendChild(likeContainer);

        figure.appendChild(mediaImgVid);
        figure.appendChild(text);
        article.appendChild(figure);

        return (article);
    }
    return {  title, likes, getPhotoCardDOM }
}

let currentSrc;
let Image = function(image) {
    this.src = `assets/media/Marcel/${image}`;
    this.getDOM = function() {
            let mediaImg = document.createElement( 'img' );
            mediaImg.setAttribute("src", this.src);
            mediaImg.classList.add('image-media'); // Ajoute une classe pour appliquer le CSS

        
            mediaImg.addEventListener('click', () => {
                openLightbox(this.src, 'image');
                currentSrc = this.src; 

            });
            return mediaImg;

    }
}
    let Video = function(video) {
        this.src = `assets/media/Marcel/${video}`;
        this.getDOM = function() {
            let mediaVid = document.createElement('video');
            mediaVid.setAttribute("src", this.src);
            mediaVid.setAttribute("controls", "true"); // Ajouter des contrôles vidéo
            mediaVid.classList.add('video-media'); // Ajoute une classe pour appliquer le CSS
              // Ajouter un événement au clic pour ouvrir la lightbox
              mediaVid.addEventListener('click', () => {
                openLightbox(this.src,'video');//ajouter l'argument  type (video)
                currentSrc = this.src; 

            });
            return mediaVid;
        }
    }
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
// Fonction pour ouvrir la lightbox
function openLightbox(src, mediaType) {
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
//pour trouver l'image actuelle et remplacer la boucle for
    const mediaSorted = getMediaById();
    let currentIndex = mediaSorted.findIndex(media => {//findIndex pour trouver directement l'index courrant dans le tableau//  Cette fonction de rappel reçoit trois arguments :
        //L'élément actuel
        //L'index de l'élément
        //Le tableau lui-même
      const filePath = `assets/media/Marcel/${media.image || media.video}`;
      return filePath === currentSrc;
    });
  
    // chercher l'index du média suivante en tenant compte de la circularité
    const nextIndex = (currentIndex + 1) % mediaSorted.length;
    const nextMedia = mediaSorted[nextIndex];
    if (nextMedia) {
      const newSrc = `assets/media/Marcel/${nextMedia.image || nextMedia.video}`;
      const mediaType = nextMedia.image ? 'image' : 'video'; //opérateur ternaire,(les conditions image ou video )le média est considéré comme une image, sinon, c'est une vidéo ca remplace le if else
      openLightbox(newSrc, mediaType);     
       currentSrc = newSrc;
    }
}

//Affiche le média précédent
function getPreviousMedia() {
    const mediaSorted = getMediaById();
    let currentIndex = mediaSorted.findIndex(media => {//findIndex pour trouver directement l'index courrant dans le tableau 
      const filePath = `assets/media/Marcel/${media.image || media.video}`;
      return filePath === currentSrc;
    });
  
    // Calcul de l'index du média précédent en tenant compte de la circularité
    const previousIndex = (currentIndex - 1 + mediaSorted.length) % mediaSorted.length;//Calcul circulaire de l'index précédent
  
    const previousMedia = mediaSorted[previousIndex];
    if (previousMedia) {
      const newSrc = `assets/media/Marcel/${previousMedia.image || previousMedia.video}`;
      const mediaType = previousMedia.image ? 'image' : 'video';
      openLightbox(newSrc, mediaType);     
       currentSrc = newSrc;
    }
  }
// Ajouter des événements sur les boutons "Next" et "Previous"
document.getElementById('next-btn').addEventListener('click', getNextMedia);
document.getElementById('prev-btn').addEventListener('click', getPreviousMedia);

 

