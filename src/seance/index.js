var USER_ID = "NZuC-8ONb93muw6BP"; // Remplacez par votre identifiant d'utilisateur Email.js
var SERVICE_ID = "service_3y4q2xc"; // Remplacez par votre identifiant de service Email.js
var TEMPLATE_ID = "template_mvy8wc1";

let listeSeances = [];
let vara;

chargerSeances();
afficherSeances();

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
    //seanceContainer.innerHTML = "";

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
                seance.inscris++;
                inscription(index);
                vara = i;
                console.log(vara);
            };
        }(i);

        var nombreInscrits = document.createElement("span");
        nombreInscrits.textContent = "Nombre d'inscrits : " + listeSeances[i].inscris; // Utilisation de la longueur du tableau d'inscriptions
        nombreInscrits.id = "nombreInscrits_" + i;

        nouvelleSeance.appendChild(nombreInscrits);
        nouvelleSeance.appendChild(boutonInscription);
        seanceContainer.appendChild(nouvelleSeance);
    }
    
    console.log(listeSeances);
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


function validerInscription() {
    resetInscriptionForm()
    var indexSeance = vara;
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var email = document.getElementById("email").value;
    var role = document.getElementById("role").value;

    /*
    if (!isValidEmail(email)) {
        document.getElementById("emailError").textContent = "Veuillez entrer un e-mail valide.";
        alert("Please enter a valid email.");
        return;
    } else {
        document.getElementById("emailError").textContent = "";
    }
    
    
    if (!nom || !prenom || !email || !role) {
        alert("Veuillez remplir tous les champs.");
        return;
    }*/

    // Vous pouvez utiliser ces informations comme bon vous semble, par exemple, les stocker dans un tableau ou un objet
    // ici, je les affiche simplement dans la console
    console.log("Inscription validée pour la séance " + indexSeance + ":");
    console.log("Nom: " + nom);
    console.log("Prénom: " + prenom);
    console.log("Rôle: " + role);
    console.log("Email: " + email);
    console.log(listeSeances);
    var seance = listeSeances[indexSeance];
    console.log(seance);
    var heureSeance = seance.heure;
    var dateSeance = seance.date;
    var nomCours = seance.cours;
    var classe =  seance.classe;


    envoyerEmailConfirmation(nom, prenom, email, role, dateSeance, heureSeance, nomCours,classe);

    // Réinitialiser le formulaire
    var msg_warn = "Un mail de confirmation vous à été envoyer à l'adresse mail suivante : " + email
    alert(msg_warn)
    console.log(msg_warn);
    
    return;
}





// Fonction pour réinitialiser le formulaire d'inscription
function resetInscriptionForm() {
    var inscriptionForm = document.getElementById("inscriptionForm");
    inscriptionForm.style.display = "none";
    inscriptionForm.dataset.indexSeance = "";
    document.getElementById("nom").value = "";
    document.getElementById("prenom").value = "";
    document.getElementById("role").value = "";
    document.getElementById("email").value = "";
}


function afficherFormulaire() {
    document.getElementById("inscriptionForm").style.display = "block";
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
    console.log(email)
    return email.includes('@stpbb.org');
}

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { connectAuthEmulator, connectDatabaseEmulator } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB7sBpiLf9tHIGU0kfjBjNwvNc_SGkERKU",
    authDomain: "objectif-mention-stpaul.firebaseapp.com",
    databaseURL: "https://objectif-mention-stpaul-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "objectif-mention-stpaul",
    storageBucket: "objectif-mention-stpaul.appspot.com",
    messagingSenderId: "71537034897",
    appId: "1:71537034897:web:839b20ad1db3cd29662130",
    measurementId: "G-5KF1FJ1HKB"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");
connectDatabaseEmulator(getDatabase(app), "localhost", 9000);


createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

const txtloginEmail = document.querySelector('#lemail')
const txtloginPwd = document.querySelector('#lpassword')
const txtsEmail = document.querySelector('#semail')
const txtsPwd = document.querySelector('#spassword')
const btnSignIn = document.querySelector('#btnSignIn')
const btnLogin = document.querySelector('#btnLogin')


// Login using email/password
const loginEmailPassword = async () => {
    const loginEmail = txtloginEmail.value
    const loginPassword = txtloginPwd.value
  
    // step 1: try doing this w/o error handling, and then add try/catch
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
}
const createAccount = async () => {
    const email = txtsEmail.value
    const password = txtsPwd.value
  
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    }
    catch(error) {
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    } 
  }// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user)
        showApp()
        showLoginState(user)
  
        hideLoginError()
        hideLinkError()
      }
      else {
        showLoginForm()
        lblAuthState.innerHTML = `You're not logged in.`
      }
    })
  }
  
  // Log out
  const logout = async () => {
    await signOut(auth);
  }
  
  btnLogin.addEventListener("click", loginEmailPassword) 
  btnSignIn.addEventListener("click", createAccount)
  btnLogout.addEventListener("click", logout)

  connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();