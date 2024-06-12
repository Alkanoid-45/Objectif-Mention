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

    verifierDate();
    sauvegarderSeances();
    afficherSeances();
}




function afficherSeances() {
    var seanceContainer = document.getElementById("seanceContainer");


    for (var i = 0; i < listeSeances.length; i++) {
        var seance = listeSeances[i];
        var nouvelleSeance = document.createElement("div");
        nouvelleSeance.className = "seance";
        nouvelleSeance.innerHTML = "<span class='closeBtn' onclick='supprimerSeance(" + i + ")'>&times;</span><p>Date : " + seance.date + "</p><p>Heure : " + seance.heure + "</p><p>Cours : " + seance.cours + "</p>";



        var boutonInscription = document.createElement("button");
        boutonInscription.textContent = "S'inscrire";
        boutonInscription.id = "btn_ajouter"
        boutonInscription.onclick = function(index) {
            return function() {
                inscription(index);
            };
        }(i);

        
    }
    seanceContainer.appendChild(nouvelleSeance);
    console.log(listeSeances);
}



function afficherSeancesTest() {
    for (var i = 0; i < listeSeances.length; i++) {
         // Ajout du bouton "S'inscrire"
        

        nouvelleSeance.appendChild(boutonInscription);
        // Ajout du nombre d'inscrits
        var nombreInscrits = document.createElement("span");
        nombreInscrits.textContent = "Nombre d'inscrits : " + inscriptions[i].length; // Utilisation de la longueur du tableau d'inscriptions
        nombreInscrits.id = "nombreInscrits_" + i;
        nouvelleSeance.appendChild(nombreInscrits);
    }
}



















function inscription(listeSeances, indexSeance) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block"; // Affiche la pop-up

    // Ferme la pop-up si on clique sur la croix
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
        for (var i = 0; i < listeSeances; i++) {
            inscriptions[indexSeance].splice(indexSeance, 1);
        } 
    };
    var inscriptionForm = document.getElementById("inscriptionForm");
    inscriptionForm.style.display = "block";

    if (listeSeances.length > 0 && listeSeances[indexSeance]) {
        var inscriptionForm = document.getElementById("inscriptionForm");
        inscriptionForm.style.display = "block";
        
        // Stockez l'index de la séance en cours d'inscription
        inscriptionForm.dataset.indexSeance = indexSeance;

            // Déclarez la variable spanInscrits ici
        var spanInscrits = document.getElementById("nombreInscrits_" + indexSeance);
            
        if (spanInscrits) {
                // Ajoutez l'inscription au tableau correspondant à la séance
            inscriptions[indexSeance].push({
                nom: nom,
                prenom: prenom,
                email: email,
                role: role
            });

            spanInscrits.textContent = "Nombre d'inscrits : " + inscriptions[indexSeance].length;
            
        }
        else{
            alert("Aucunne séance séléctionnée");
        }
    }
}


























function supprimerSeance(indexSeance, inscription) {
    listeSeances.splice(indexSeance, 1);
    sauvegarderSeances();
    afficherSeances();
}


function verifierDate() {
    var currentDate = new Date().toISOString().slice(0, 10);
    for (var i = 0; i < listeSeances.length; i++) {
        var seance = listeSeances[i];
        if (seance.date < currentDate) {
            listeSeances.splice(i, 1);
            sauvegarderSeances();
            afficherSeances();
            i--;
        }
    }
}


function sauvegarderSeances() {
    localStorage.setItem('seances', JSON.stringify(listeSeances));
}


function chargerSeances() {
    var seancesStockees = localStorage.getItem('seances');
    if (seancesStockees) {
        listeSeances = JSON.parse(seancesStockees);
        afficherSeances();
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



