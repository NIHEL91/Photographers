//Totalité des likes 
import { mediaTemplate } from '../templates/media.js';

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
    export async function calculateAndDisplayLikes(media, photographers) {
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

        const totalLikesCount = document.querySelector(".totalLikesCount");
        const priceElement = document.querySelector(".price");
        
        // Mettez à jour le contenu du span totalLikesCount avec les likes et l'icône
        totalLikesCount.innerHTML = `
            ${totalLikes}
            <i class="fa fa-heart"></i>
            `;
        
            // Mettez à jour le contenu du span price avec le prix
            priceElement.textContent = `${photographers.price} €/jour`;
      
    
        }

