
import { updateTotalLikes } from '../utils/like.js'; 
import { getMediaById } from '../utils/media.js';
//import {media} from '../utils/media.js';
//import {media} from '../utils/media.js';
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

             // Ajouter un événement au clic pour ouvrir la lightbox
           /* mediaImg.addEventListener('click', () => {
                const index = mediaSorted.indexOf(i); // Trouve l'index du média
                openLightbox(this.src, 'image', index);
                console.log(mediaImg);
            });
            return mediaImg;*/
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
// Fonction pour ouvrir la lightbox
function openLightbox(src, mediaType) {
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');

     // (masquer les deux éléments)
    // lightboxImg.style.display = 'none';
     //lightboxVideo.style.display = 'none';
    
    if (mediaType === 'image') {
        lightboxImg.src = src; // Afficher l'image
        lightboxImg.style.display = 'block'; // Afficher l'image dans la lightbox
    } else if (mediaType === 'video') {
        lightboxVideo.src = src; // Afficher la vidéo
        lightboxVideo.style.display = 'block'; // Afficher la vidéo dans la lightbox
    }

    lightbox.classList.add('active-lightbox'); // Affiche la lightbox
    //i = index; // Met à jour l'index courant ici
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    // Retire la classe pour masquer la lightbox
    lightbox.classList.remove('active-lightbox');
     // Réinitialiser les sources des médias
     lightboxImg.src = '';
     lightboxVideo.src = '';
     lightboxVideo.pause(); // Mettre la vidéo en pause lorsqu'on ferme la lightbox
}
  
  // Événement pour fermer la lightbox en cliquant sur la croix
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);

// Fonction pour mettre à jour la lightbox
/*function updateLightbox() {
   
 }*/
  

// Affiche le média suivant
function getNextMedia() {
    const mediaSorted = getMediaById(); // Récupère le tableau trié
    console.log('Ce tableau est passé à la méthode next : ', mediaSorted);
    let currentIndex = -1;
    console.log(currentSrc);

    // Parcours du tableau mediaSorted pour trouver l'image actuelle
    for (let i = 0; i < mediaSorted.length; i++) {
        const sortedFilePath = mediaSorted[i].image ? `assets/media/Marcel/${mediaSorted[i].image}` : undefined; // Chemin complet de l'image dans mediaSorted
        console.log('Comparaison de:', sortedFilePath, 'avec', currentSrc);

        // Comparaison du chemin complet de l'image
        if (sortedFilePath === currentSrc) {
            currentIndex = i;
            break; 
        }
        console.log(currentIndex);   }

    // Vérifier s'il y a un média suivant
    if (currentIndex !== -1 && currentIndex + 1 < mediaSorted.length) {
        const nextMedia = mediaSorted[currentIndex + 1]; // Récupère le média suivant
        
        if (nextMedia) {
            const newSrc = `assets/media/Marcel/${nextMedia.image}`;
                openLightbox(newSrc, 'image');
                currentSrc = newSrc; // Met à jour currentSrc pour l'image suivante
            }
            else if (nextMedia.video) {
                const newSrc = `assets/media/Marcel/${nextMedia.video}`;
                openLightbox(newSrc, 'video');
                currentSrc = newSrc; // Met à jour currentSrc pour la vidéo suivante
         
    } else {
        console.log('Pas de média suivant');
    }
}
}
//Affiche le média précédent
function getPreviousMedia() {
        const mediaSorted = getMediaById(); // Récupère le tableau trié
        console.log('Ce tableau est passé à la méthode next : ', mediaSorted);
        let currentIndex = -1;
        console.log(currentSrc);
    
        // Parcours du tableau mediaSorted pour trouver l'image actuelle
        for (let i = 0; i < mediaSorted.length; i++) {
            const sortedFilePath = mediaSorted[i].image ? `assets/media/Marcel/${mediaSorted[i].image}` : undefined;
            console.log('Comparaison de:', sortedFilePath, 'avec', currentSrc);
    
            // Comparaison du chemin complet de l'image
            if (sortedFilePath === currentSrc) {
                currentIndex = i;
                break; // Sort de la boucle une fois la correspondance trouvée
            }
            console.log(currentIndex);   }
    
        // Vérifier s'il y a un média précédent
        if (currentIndex > 0) {
            const previousMedia = mediaSorted[currentIndex - 1]; // Récupère le média suivant
            console.log('limage precedente est la,',previousMedia);
            // S'assurer que nextMedia existe avant de l'utiliser
            if (previousMedia) {
                const newSrc = `assets/media/Marcel/${previousMedia.image}`;
                    openLightbox(newSrc, 'image');
                    currentSrc = newSrc; // Met à jour currentSrc pour l'image suivante
                }
                else if (previousMedia.video) {
                    const newSrc = `assets/media/Marcel/${previousMedia.video}`;
                    openLightbox(newSrc, 'video');
                    currentSrc = newSrc; // Met à jour currentSrc pour la vidéo suivante
             
        } else {
            console.log('Pas de média suivant');
        }
    }
    }
// Ajouter des événements sur les boutons "Next" et "Previous"
document.getElementById('next-btn').addEventListener('click', getNextMedia);
document.getElementById('prev-btn').addEventListener('click', getPreviousMedia);

 

//document.getElementById('next-btn').onclick = getNextMedia;
