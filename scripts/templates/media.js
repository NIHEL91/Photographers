
import { updateTotalLikes } from '../pages/like.js'; 
///Création les élements des photgraphes
export function mediaTemplate(data) {
    const {  title, image, likes } = data;

    const picture = `assets/media/Marcel/${image}`;
    // Variable pour stocker les likes actuels dans le fichier jison
    let existLikes = likes;

    function getPhotoCardDOM() {

        //Price
        const article = document.createElement( 'article' );
                // Création de la balise figure
        const figure = document.createElement( 'figure' );
        figure.classList.add('media-figure'); // Ajoute une classe pour appliquer le CSS

        //Création de la balise image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.classList.add('image-media'); // Ajoute une classe pour appliquer le CSS

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

        figure.appendChild(img);
        figure.appendChild(text);
        article.appendChild(figure);

        return (article);
    }
    return { title, image, likes, getPhotoCardDOM }
}