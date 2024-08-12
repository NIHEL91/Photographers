//Création les élements des photgraphes
export function photographerTemplate(data) {
    const {id, name, portrait,city,country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?photographerId=${id}`);
        
        link.classList.add('photographer-link');
        const article = document.createElement( 'article' );
        //balise image
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.classList.add('image-photographer'); // Ajoute une classe pour appliquer le CSS
        
        //name
        const h2 = document.createElement( 'h2' );
        //country and city
        const spanLocation = document.createElement( 'span' );
        spanLocation.classList.add('country');

        const ptagline = document.createElement( 'p' );
        //Price
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = `${price} €/jour`;
        
        ptagline.textContent = tagline;
        spanLocation.textContent = `${city}, ${country}`;  
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        article.appendChild(spanLocation);

        article.appendChild(ptagline);
        article.appendChild(pPrice);
        link.appendChild(article);
        return (link);
    }
   
    return { name, picture, city, country,tagline, price, getUserCardDOM  }
}