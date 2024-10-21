document.addEventListener('DOMContentLoaded', function() {
    const blackBall = document.getElementById('blackBall');
    const linesContainer = document.getElementById('linesContainer');
    const timerElement = document.getElementById('timer'); // Élément pour afficher le timer
    const gameMessage = document.getElementById('gameMessage'); // Message de jeu
    let lineCreated = false; // Variable de contrôle pour suivre si la ligne a déjà été créée
    let seconds = 0; // Temps écoulé en secondes
    let Perdu = false; // Variable pour suivre si le joueur a perdu
    let interval = 1000;
    let timerInterval;
    let test = false
    let timer;
    // Fonction pour mettre à jour le timer
    function updateTimer() {
        seconds++; // Incrémenter le nombre de secondes
        const minutes = Math.floor(seconds / 60); // Calculer le nombre de minutes
        const remainingSeconds = seconds % 60; // Calculer le nombre de secondes restantes

        // Mettre à jour le texte du timer avec le format MM:SS
        timerElement.textContent = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

        // Arrêter le timer si la condition est remplie (par exemple, si le joueur a perdu)
        if (Perdu) {
            stopTimer();
        }
    }

    // Fonction pour démarrer le timer
    function startTimer() {
        seconds = 0; // Réinitialiser le nombre de secondes
        timerElement.textContent = "0:00"; // Réinitialiser l'affichage du timer
        //Perdu = false; // Réinitialiser l'état du jeu
        timer = setInterval(updateTimer, 1000); // Lancer le timer et stocker l'ID
    }

    // Fonction pour arrêter le timer
    function stopTimer() {
        clearInterval(timer); // Arrêter le timer avec l'ID stocké
    }
    
    /*function Interval() {
        if (interval >= 725) {
            interval -= 100;
            console.log(interval);
            // Arrêter et redémarrer le setInterval avec le nouveau délai
            clearInterval(timerInterval);
            timerInterval = setInterval(createLines, interval);
        } else {
            interval = 725;
        }
    }*/
    // Fonction pour démarrer le jeu
    function startGame() {
        // Créer une ligne à gauche et une ligne à droite
        startTimer();
        //resetTimer();
        function createLines() {
            if(Perdu == true  ) {
                clearInterval(lines);
                return;
            }
            moveLinesDown(); // Lancement du déplacement des lignes
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const lineHeight = 10; // Hauteur de la ligne en pixels
            const spaceBetweenLines = windowWidth * 0.2; // Espace entre les lignes à 20% de la fenêtre
            const lineWidthFirst = Math.random() * 80; // Largeur de la première ligne (entre 0 et 80)
            const lineWidthSecond = windowWidth - lineWidthFirst - spaceBetweenLines; // Largeur de la deuxième ligne
            
            // Créer les éléments de ligne gauche et droite
            const leftLine = document.createElement('div');
            const rightLine = document.createElement('div');
            
            // Appliquer les classes CSS et les styles aux lignes
            leftLine.classList.add('line');
            rightLine.classList.add('line');
            leftLine.style.height = lineHeight + 'px';
            rightLine.style.height = lineHeight + 'px';
            if (Math.random() * 10 > 5) {
                leftLine.style.width = lineWidthFirst + 'px';
                rightLine.style.width = lineWidthSecond + 'px';
            }else {
                leftLine.style.width = lineWidthSecond + 'px';
                rightLine.style.width = lineWidthFirst + 'px'; 
            }
            // Positionner les lignes
            leftLine.style.left = '0';
            rightLine.style.right = '0';
            
            // Ajouter les lignes au conteneur
            linesContainer.appendChild(leftLine);
            linesContainer.appendChild(rightLine);
            
            // Déplacement des lignes vers le bas
            function moveLinesDown() {
                let lineTopPosition = 0; // Position verticale initiale
                
                function step() {
                    if(seconds<30){
                        lineTopPosition += 1 + seconds /7 ;
                    }else{
                        lineTopPosition +=5
                    }
                    rightLine.style.top = lineTopPosition + 'px'; // Mise à jour de la position de la ligne droite
                    leftLine.style.top = lineTopPosition + 'px'; // Mise à jour de la position de la ligne gauche
                    // Continuer l'animation jusqu'à ce que les lignes atteignent le bas de la fenêtre
                    if (lineTopPosition < windowHeight) {
                        requestAnimationFrame(step);
                    } else {
                        // Suppression des lignes une fois qu'elles atteignent le bas de la fenêtre
                        leftLine.remove();
                        rightLine.remove();
                    }
                }
                
                requestAnimationFrame(step);
            }
        }
        
        function displayPopup() {
            const popup = document.getElementById('popup');
            const timeElapsedParagraph = document.getElementById('timeElapsed');
            const minutes = Math.floor(seconds / 60); // Calculer le nombre de minutes
            const remainingSeconds = seconds % 60; // Calculer le nombre de secondes restantes
            const timeSurvived = minutes + ":" + remainingSeconds ; // Temps écoulé depuis le début du jeu
            const phrase = "Votre temps est : "; // Phrase désirée
            timeElapsedParagraph.textContent = phrase + timeSurvived; // Mettre à jour le texte du paragraphe
            popup.style.display = 'block'; // Afficher la popup
        }
       /* function resetTimer() {
            seconds = 0; // Réinitialiser le nombre de secondes
            timerElement.textContent="0:00" ;
        }*/
        
        const lines = setInterval(createLines, 800);
        
        // Fonction pour détecter la collision entre le rond noir et une ligne
        function detectCollision() {
            if(Perdu == true) {
                clearInterval(collision);
                clearInterval(timer); // Arrêter le minuteur avec l'ID stocké
                return;
            }
            const blackBallRect = blackBall.getBoundingClientRect(); // Récupérer les coordonnées du rond noir
            
            // Parcourir toutes les lignes dans le conteneur
            const lines = document.querySelectorAll('.line');
            lines.forEach(function(line) {
                const lineRect = line.getBoundingClientRect(); // Récupérer les coordonnées de la ligne
                // Vérifier s'il y a une collision entre le rond noir et la ligne
                if (
                    blackBallRect.left < lineRect.right &&
                    blackBallRect.right > lineRect.left &&
                    blackBallRect.top < lineRect.bottom &&
                    blackBallRect.bottom > lineRect.top
                    ) {
                        //moveLinesDown();
                        const minutes = Math.floor(seconds / 60); // Calculer le nombre de minutes
                        const remainingSeconds = seconds % 60; // Calculer le nombre de secondes restantes
                        const timeSurvived = minutes + ' minutes ' + remainingSeconds + ' secondes'; // Temps écoulé depuis le début du jeu
                        Perdu = true;
                        displayPopup();
                    }
                });
            }
            
            // Appeler la fonction de détection de collision toutes les 100 milliseconds
            const collision = setInterval(detectCollision, 100);
            
            // Suivre la souris avec la boule noire
            document.addEventListener('mousemove', function(event) {
                const mouseX = event.clientX;
                const mouseY = event.clientY;
                
                blackBall.style.left = mouseX - (blackBall.offsetWidth / 2) + 'px';
                blackBall.style.top = mouseY - (blackBall.offsetHeight / 2) + 'px';
                
                detectCollision(); // Appeler la fonction pour détecter la collision à chaque mouvement de la souris
            });
        }
        
        // Démarrer le jeu au clic sur la fenêtre
        window.addEventListener('click', function() {
            // Vérifier si le jeu a déjà été démarré pour éviter de le redémarrer à chaque clic
            if(test==false){
                startGame();
                test=true;
            }
        });
        document.getElementById('restartButton').addEventListener('click', function() {
            location.reload(); // Recharger la page
        });
    });
    