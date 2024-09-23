
import { updateTotalLikes } from '../utils/like.js'; 
///Création les élements des photgraphes
export function mediaTemplate(data) {
    const {  title, image,video, likes} = data;
    let media ;
    if ( image) {
        media = new Image(image);
    } else if (video) {
        media = new Video(video);
    } else {
    throw new Error("Type de média non supporté");
}
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
    return { title, image,video, likes, getPhotoCardDOM }
}

 let Image = function(image) {
    this.src = `assets/media/Marcel/${image}`;
    this.getDOM = function() {
            let mediaImg = document.createElement( 'img' );
            mediaImg.setAttribute("src", this.src);
            mediaImg.classList.add('image-media'); // Ajoute une classe pour appliquer le CSS

             // Ajouter un événement au clic pour ouvrir la lightbox
            mediaImg.addEventListener('click', () => {
            openLightbox(this.src,'image');
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
                openLightbox(this.src,'video');
            });
            return mediaVid;
        }
    }
// Fonction pour ouvrir la lightbox
function openLightbox(src, mediaType) {
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
     // Réinitialiser la lightbox (masquer les deux éléments)
     lightboxImg.style.display = 'none';
     lightboxVideo.style.display = 'none';
    if (mediaType === 'image') {
        lightboxImg.src = src; // Afficher l'image
        lightboxImg.style.display = 'block'; // Afficher l'image dans la lightbox
    } else if (mediaType === 'video') {
        lightboxVideo.src = src; // Afficher la vidéo
        lightboxVideo.style.display = 'block'; // Afficher la vidéo dans la lightbox
    }

    lightbox.classList.add('active-lightbox'); // Affiche la lightbox
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
 


 

