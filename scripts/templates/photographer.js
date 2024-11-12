 //Création les données de   la page de chaque photographe
 //Création les données de   la page de chaque photographe
 export function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');
        article.tabIndex = 0; // Rendre l'article focalisable

        // Création de la balise <a> pour le lien
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?photographerId=${id}`);
        link.classList.add('photographer-link');
        link.tabIndex = 0; // Rendre le lien focalisable

        // Création de la balise <img>
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.classList.add('image-photographer'); // Ajoute une classe pour appliquer le CSS
        img.tabIndex = -1; // Éviter la focalisation directement sur l'image

        // Création de la balise <h2> pour le nom
        const h2 = document.createElement('h2');
        h2.textContent = name;

        // Ajout de l'image et du nom à <a>
        link.appendChild(img);
        link.appendChild(h2);
        link.addEventListener('keydown', (event) => {

        if (event.key === 'Enter' || event.key === ' ') {
            link.click(); // Permettre l'ouverture du lien avec "Entrée" ou "Espace"
        }
    });
         //Création d'une div pour 
         const profil = document.createElement( 'div' );
         profil.classList.add('profil');

        // Création de la balise <span> pour la localisation
        const spanLocation = document.createElement('span');
        spanLocation.classList.add('country');
        spanLocation.textContent = `${city}, ${country}`;

        // Création de la balise <p> pour la tagline
        const ptagline = document.createElement('p');
        ptagline.textContent = tagline;

        // Création de la balise <p> pour le prix
        const pPrice = document.createElement('p');
        pPrice.textContent = `${price} €/jour`;

        // Ajout du lien et des autres éléments à l'article
        article.appendChild(link);
        //ajout de span et p à div profil
        profil.appendChild(spanLocation);
        profil.appendChild(ptagline);
        profil.appendChild(pPrice);

        //ajout de profil a l'article
        article.appendChild(profil);
        return article;
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM };

}
export function photographerHeaderTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getHeaderDOM() {
        const headerElement = document.createElement('div');
        headerElement.classList.add('detail-photographe'); // Ajoute une classe pour appliquer le CSS
        
        const detailP = document.createElement('div');
        detailP.classList.add('photographer-profil');

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
        detailP.appendChild(pLocation);

        detailP.appendChild(pTagline);
        
        buttonModal.appendChild(button);
        headerElement.appendChild(detailP);
        headerElement.appendChild(buttonModal);
        headerElement.appendChild(img);
        return headerElement;
    }
    return { name, picture, city, country, tagline, price,  getHeaderDOM };


}
