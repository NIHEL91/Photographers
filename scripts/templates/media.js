
import { updateTotalLikes } from '../utils/like.js'; 
import { openLightbox } from '../templates/lightboxMedia.js';

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
        mediaImgVid.tabIndex = 0; // Rendre focalisable

        
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
        likeCount.setAttribute('aria-label', `Nombre de likes pour ${title}`);


        // Icône de like
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-heart');
        icon.setAttribute('aria-label', `Aimer ${title}`);
        icon.tabIndex = 0; // Rendre focalisable

       
        //Ajouter un événement au clic pour incrémenter les likes
        icon.addEventListener('click', () => {
            if (!icon.classList.contains('liked')) {
                
            existLikes += 1;
            likeCount.textContent = existLikes;
            icon.classList.add('liked');
            updateTotalLikes();

            } });
            
           icon.addEventListener('keydown', (e) => {
            if (e.key=== 'Enter') {
                existLikes += 1;
                likeCount.textContent = existLikes;
               updateTotalLikes();
            }
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

let Image = function(image) {
    this.src = `assets/media/${image}`;
    this.getDOM = function() {
            let mediaImg = document.createElement( 'img' );
            mediaImg.setAttribute("src", this.src);
            mediaImg.classList.add('image-media'); // Ajoute une classe pour appliquer le CSS

            mediaImg.addEventListener('click', () => {
                openLightbox(this.src, 'image');

            });
            return mediaImg;

    }
}
let Video = function(video) {
    this.src = `assets/media/${video}`;
    this.getDOM = function() {
        let mediaVid = document.createElement('video');
        mediaVid.setAttribute("src", this.src);
        mediaVid.setAttribute("controls", "true"); // Ajouter des contrôles vidéo
        mediaVid.classList.add('video-media'); // Ajoute une classe pour appliquer le CSS
        // Ajouter un événement au clic pour ouvrir la lightbox
        mediaVid.addEventListener('click', () => {
            openLightbox(this.src,'video');//ajouter l'argument  type (video)
        });
        return mediaVid;
    }
}