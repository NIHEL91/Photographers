
import { updateTotalLikes } from '../utils/like.js'; 
///Création les élements des photgraphes
export function mediaTemplate(data) {
    const {  title, image,video, likes} = data;

    let picture ='';
    if (image) {
        picture = `assets/media/Marcel/${image}`;
    } else if (video) {
        picture = `assets/media/Marcel/${video}`;
    }

    // Variable pour stocker les likes actuels dans le fichier jison
    let existLikes = likes;

    function getPhotoCardDOM() {

        //Price
        const article = document.createElement( 'article' );
                // Création de la balise figure
        const figure = document.createElement( 'figure' );
        figure.classList.add('media-figure'); // Ajoute une classe pour appliquer le CSS

        //Création de la balise image
        let mediaImgVid = '';
        if (image) {
            mediaImgVid = document.createElement( 'img' );
            mediaImgVid.setAttribute("src", picture);
            mediaImgVid.classList.add('image-media'); // Ajoute une classe pour appliquer le CSS
        }

        // Si c'est une vidéo, créer une balise video
        else if (video) {
            mediaImgVid = document.createElement('video');
            mediaImgVid.setAttribute("src", picture);
            mediaImgVid.setAttribute("controls", "true"); // Ajouter des contrôles vidéo
            mediaImgVid.classList.add('video-media'); // Ajoute une classe pour appliquer le CSS
        }
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