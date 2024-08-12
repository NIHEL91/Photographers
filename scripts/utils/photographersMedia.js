 //Création les données de   la page de chaque photgraphe
export function photographerMediaTemplate(data) {
        const { name, tagline, city, country, portrait } = data;
    
        const picture = `assets/photographers/${portrait}`;
    
        function getPhotographerCardDOM() {
            const headerElement = document.createElement('div');
            headerElement.classList.add('detail-photographe'); // Ajoute une classe pour appliquer le CSS

            const detailP = document.createElement('div');
            detailP.classList.add('detail');

            const buttonModal = document.createElement('div');
            buttonModal.classList.add('contact');
    
            const h1 = document.createElement('h1'); 
            h1.textContent = name;
    
            const pTagline = document.createElement('span');
            pTagline.textContent = tagline;
    
            const pLocation = document.createElement('p');
            pLocation.textContent = `${city}, ${country}`;
    
            const img = document.createElement('img');
            img.setAttribute('src', picture);
            img.setAttribute('alt', name);
            img.classList.add('image-photographe'); // Ajoute une classe pour appliquer le CSS


            // Sélectionner l'élément existant
            const button = document.querySelector('.contact_button');

            // Créer un nouvel élément avec JavaScript
            const newElement = document.createElement('div');
            newElement.appendChild(h1);



            detailP.appendChild(h1);
            detailP.appendChild(pTagline);
            detailP.appendChild(pLocation);
            
            buttonModal.appendChild(button);
            headerElement.appendChild(detailP);
            headerElement.appendChild(buttonModal);
            headerElement.appendChild(img);
           
    
            return headerElement;
        }
    
        return { getPhotographerCardDOM };
    }
    