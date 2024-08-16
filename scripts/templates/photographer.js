export function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const section = document.querySelector('.photographer_section');

        const article = document.createElement('article');

        // Création de la balise <a> pour le lien
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?photographerId=${id}`);
        link.classList.add('photographer-link');

        // Création de la balise <img>
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.classList.add('image-photographer'); // Ajoute une classe pour appliquer le CSS

        // Création de la balise <h2> pour le nom
        const h2 = document.createElement('h2');
        h2.textContent = name;

        // Ajout de l'image et du nom à <a>
        link.appendChild(img);
        link.appendChild(h2);

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
        
        // Ajout de l'article à la section
        section.appendChild(article);
        return article;
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM };
}
