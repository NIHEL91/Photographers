///Création les élements des photgraphes
export function mediaTemplate(data) {
    const {  title, image, likes } = data;

    const picture = `assets/media/Marcel/${image}`;

    function getPhotoCardDOM() {
        const article = document.createElement( 'article' );
                // Création de la balise figure
        const figure = document.createElement( 'figure' );
        figure.classList.add('media-figure'); // Ajoute une classe pour appliquer le CSS

        //Création de la balise image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.classList.add('image-media'); // Ajoute une classe pour appliquer le CSS
        //Création du titre
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;

       
        //icone
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-heart');


        //ajout des éléments à la balise figure
        figure.appendChild(img);
        figure.appendChild(h2);
        figure.appendChild(icon);

        // Ajout de figure à article
        article.appendChild(figure);

        return (article);
    }
    return { title, image, likes, getPhotoCardDOM }
}