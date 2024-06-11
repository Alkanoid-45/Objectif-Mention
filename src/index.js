var USER_ID = "NZuC-8ONb93muw6BP"; // Remplacez par votre identifiant d'utilisateur Email.js
var SERVICE_ID = "service_3y4q2xc"; // Remplacez par votre identifiant de service Email.js
var TEMPLATE_ID = "template_mvy8wc1";

let listeSeances = [];


chargerSeances();

function ajouterSeance(){
    var dateInput = document.getElementById("dateInput").value;
    var heureInput = document.getElementById("heureInput").value;
    var choixCours = document.getElementById("choixCours").value;
    var choixClasse = document.getElementById("classeInput").value;
    var nbInscrit = 0;

    if (!dateInput  || !heureInput || !choixCours || !choixClasse) {
        alert("Veuillez fournir toutes les information.");
        return;
    }

    var nouvelleSeance = {
        date: dateInput,
        heure: heureInput,
        cours: choixCours,
        classe: choixClasse,
        inscris: nbInscrit
    };

    listeSeances.push(nouvelleSeance);
    sauvegarderSeances();
    chargerSeances();
}



function sauvegarderSeances() {
    localStorage.setItem('seances', JSON.stringify(listeSeances));
}



function chargerSeances() {
    var seancesStockees = localStorage.getItem('seances');
    if (seancesStockees) {
        listeSeances = JSON.parse(seancesStockees);
        console.log(listeSeances);
        //afficherSeances();
    }
}














function envoyerEmailConfirmation(nom, prenom, email, role, dateSeance, heureSeance, nomCours,classe) {
    emailjs.init(USER_ID);

    var templateParams = {
        nom: nom,
        prenom: prenom,
        email: email,
        role: role,
        dateSeance: dateSeance,
        heureSeance: heureSeance,
        nomCours: nomCours,
        classe: classe,

    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log("E-mail envoyé avec succès", response);
        }, function(error) {
            console.log("Erreur lors de l'envoi de l'e-mail", error);
        });
}


function isValidEmail(email) {
    // Vérifie si la chaîne '@stpbb.org' est présente dans le paramètre 'email'
    console.log(email)
    return email.includes('@stpbb.org');
}