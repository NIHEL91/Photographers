//Totalité des likes 
import {getMedia} from '../pages/media.js';
import { mediaTemplate } from '../templates/media.js';
import {getQueryParams} from '../pages/media.js';
import { getPhotographers } from '../pages/index.js';


let totalLikes= 0;

   export function updateTotalLikes() {
        totalLikes += 1;
        const likesCountElement = document.querySelector(".totalLikesCount");
        likesCountElement.innerHTML = `
            ${totalLikes}
            <i class="fa fa-heart"></i>
        `;
    }
    // Fonction pour calculer et afficher les likes
    async function calculateAndDisplayLikes() {
        // Attendre que les médias soient récupérés
        const media = await getMedia();
        const photographContainer = document.querySelector(".photographer-container");

        media.forEach((mediaItem) => {
            const mediaModel = mediaTemplate(mediaItem);
            const photoCardDOM = mediaModel.getPhotoCardDOM();
            photographContainer.appendChild(photoCardDOM);
            totalLikes += mediaItem.likes; 
            console.log(`Total Likes: ${totalLikes}`);

            // Mise à jour du total des likes sur la page
            const likesCountElement = document.querySelector(".totalLikesCount");
            likesCountElement.textContent = totalLikes;
        });

        // Récupération du photographe spécifique et affichage du prix
        const data = await getPhotographers();
        const { photographerId } = getQueryParams();
        const photographer = data.photographers.find(p => p.id === photographerId);

        if (photographer) {
            const totalLikesCount = document.querySelector(".totalLikesCount");
            const priceElement = document.querySelector(".price");
        
            // Récupère le prix du photographe
            const price = photographer.price;
        
            // Mettez à jour le contenu du span totalLikesCount avec les likes et l'icône
            totalLikesCount.innerHTML = `
                ${totalLikes}
                <i class="fa fa-heart"></i>
            `;
        
            // Mettez à jour le contenu du span price avec le prix
            priceElement.textContent = `${price} €/jour`;
            console.log(`Price: ${price}€/jour`);
        } else {
            console.error('Photographer not found');
        }
}

calculateAndDisplayLikes();
