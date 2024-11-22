// Sélection des éléments du DOM
const modal = document.getElementById("contact_modal"); // Sélectionner la modale complète
const modalBtn = document.querySelectorAll(".contact_button"); // Bouton(s) pour ouvrir la modale
const closeStar = document.querySelector(".closeStar"); // Bouton pour fermer la modale
const myForm = document.getElementById("myForm"); // Le formulaire
const overlay = document.getElementById("overlay");
const firstField = document.getElementById("first");

// Fonction pour lancer la modale de formulaire
export async function displayModal() {
    //fais défiler jusqu'a la modale (l'afficher )
    overlay.style.display = "block"; // Affiche l'overlay
    modal.style.display = "block";
    modal.scrollIntoView({ behavior: "smooth"});
    firstField.focus(); // Place le focus sur le premier champ du formulaire
    document.addEventListener("keydown");

}
// Fonction pour fermer la modale
function closeModal() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none"; // Masque l'overlay
  modal.style.display = "none"; // Masque la modale

}

// Retire l'écouteur de la touche Échap aprés la fermeture du modale 
document.addEventListener("keydown", EscapeKey);

// Gère la fermeture avec la touche Échap
function EscapeKey(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}
// Réinitialise les champs du formulaire
function resetForm() {
    myForm.reset(); 

}

// Ajouter des événements pour ouvrir la modale
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal));


export function setupForm(photographer) {
  //afficher le nom du photographe dans la modale de formulaire 
    const modalTitle = document.getElementById("modalTitle");
    modalTitle.innerHTML = `<span>Contactez-moi</span><br><span>${photographer.name}</span>`;

    // Ajouter des événements pour fermer la modale
    closeStar.addEventListener("click", closeModal);
    // Ajouter un écouteur d'événements pour soumettre le formulaire									 
    myForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le formulaire de se soumettre automatiquement

    // Récupérer les valeurs des champs du formulaire
    const firstName = document.getElementById("first").value;
    const lastName = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;


    console.log("Prénom :", firstName);
    console.log("Nom :", lastName);
    console.log("Email :", email);
    console.log("Message :", message);

    // Vérifier que les champs obligatoires ne sont pas vides
    // Expression régulière pour valider les emails
    const regex = /^[^.-].*@[a-z0-9.-]+\.[a-z]{2,}$/;   

    // Valider le champ prénom
    if (firstName ==="") {
      document.getElementById('errorFirst').style.display = 'block';
      document.getElementById('first').style.border = '2px solid red'; // Applique la bordure rouge
    }
      // Valider le champ nom
    if (lastName === ""){
      document.getElementById('errorLast').style.display = 'block';
      document.getElementById('last').style.border = '2px solid red'; // Applique la bordure rouge
    }
    // Valider le champ email
    
    if (!regex.test(email)) {
      document.getElementById('errorEmail').style.display = 'block';
      document.getElementById('email').style.border = '2px solid red'; // Applique la bordure rouge
    }

    else {
    // Après la soumission, réinitialiser le formulaire et fermer la modale
    closeModal();
    resetForm();
    }
});
	
}													   
						
												   
				 
   
						   
											 
	 
											

					   
				  
					 
					
	 

   