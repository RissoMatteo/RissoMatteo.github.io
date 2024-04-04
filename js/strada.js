// Variabili per le immagini
let sImg, mImg, car1Img, car2Img, persoImg, vintoImg;
// Posizione del primo e secondo sfondo per lo scorrimento
let x1 = 0;
let x2;
// Velocità di scorrimento della strada e oggetti
let scrollSpeed = 6;
// Giocatore e array per le macchine
let player;
let cars = [];
// Punteggio
let score = 0;
// Stato del gioco (true = in gioco, false = menu o schermate di vittoria/sconfitta)
let inGame = false;
// Intervallo di tempo per la creazione delle macchine e prossimo frame di spawn
let carSpawnInterval = 400;
let nextCarSpawnFrame = carSpawnInterval;
// Flag per alternare la creazione di Car1 e Car2 in modo che non arrivino contemporaneamente
let createCar1 = true;
// Visibilità del giocatore (perchè quando viene chiamata la schermata vinto/perso rimaneva il giocatore sopra)
let playerVisible = true;
//gestisce quando la macchina puo muoversi (perchè quando viene chiamata la schermata vinto/perso rimaneva la macchina sopra)
let inMovimento = true; 
// Coordinate rendere cliccabile l'intera schermata vinto/perso
let xMin = 0;
let xMax = 1228;
let yMin = 0;
let yMax = 700;

// Caricamento delle immagini
function preload() {
    sImg = loadImage("img/sfondo.jpeg");
    mImg = loadImage("img/player.png");
    car1Img = loadImage("img/car11.png");
    car2Img = loadImage("img/car22.png");
    persoImg = loadImage("img/perso.png");
    vintoImg = loadImage("img/vinto.png");
    menu.preloadMenu();
}

// Inizializzazione della finestra
function setup() {
    createCanvas(1229, 1200);
    x2 = width;
    player = new Player();
    menu.setupMenu();
}

// Ciclo principale del gioco
function draw() {
    if (!inGame) {
        // Se il gioco non è attivo, mostra il menu
        menu.drawMenu();
    } else {
        // Se il gioco è attivo, mostra il gioco
        image(sImg, x1, 0, width, height);
        image(sImg, x2, 0, width, height);

        // Scorrimento della strada di sfondo
        x1 -= scrollSpeed;
        x2 -= scrollSpeed;

        // Verifica se lo sfondo si è spostato completamente e lo riporta indietro
        if (x1 < -width) {
            x1 = width;
        }
        if (x2 < -width) {
            x2 = width;
        }

        // Controlla i tasti, se premuti incrementa il movimento in modo che il giocatore si sposti senza alzare il dito dal tasto
        if (keyIsDown(UP_ARROW)) {
            player.y -= scrollSpeed;
        }
        if (keyIsDown(DOWN_ARROW)) {
            player.y += scrollSpeed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            player.x += scrollSpeed;
        }
        if (keyIsDown(LEFT_ARROW)) {
            player.x -= scrollSpeed;
        }

        // Aggiunge nuove macchine in base a un frame rate specifico
        if (frameCount >= nextCarSpawnFrame) {
            // Alterna tra Car1 e Car2
            if (createCar1) {
                cars.push(new Car1());
            } else {
                cars.push(new Car2());
            }
            createCar1 = !createCar1;
            nextCarSpawnFrame += carSpawnInterval / scrollSpeed;  
            //divido il valore per la velocita di gioco in modo che le auto 
            //vengano spownate a intervalli regolari nonostante la velocita
        }

        // Gestisce le collisioni tra il giocatore e le macchine Car1
        for (let i = cars.length - 1; i >= 0; i--) {
            if(inMovimento)
                cars[i].move();
                cars[i].show();

            // Se c'è una collisione, mostra la schermata di sconfitta
            if (checkCollision(cars[i], player)) {
                playerVisible = false;
                inMovimento = false;
                noLoop();
                perso();
            }

            // Se il punteggio raggiunge 300, mostra la schermata di vittoria
            if (score == 300) {
                playerVisible = false;
                inMovimento = false;
                noLoop();
                vinto();
            }

            // Rimuove le macchine uscite dallo schermo e incrementa il punteggio di 10 alla volta
            if (cars[i].x < -cars[i].r) {
                cars.splice(i, 1);
                score += 10;
            }
        }

        // Mostra il giocatore se è visibile
        if (playerVisible) {
            player.show();
        }

        // Visualizza il punteggio nello schermo
        textSize(32);
        fill(255);
        text('Punteggio: ' + score, 20, 50);
    }
}

// Funzione chiamata quando un tasto è premuto
function keyPressed() {
    // Gestisce il movimento del giocatore e la chiamata di resetGame se è premuto "esc"
    if (keyCode == UP_ARROW) {
        player.y -= scrollSpeed;
    } else if (keyCode == DOWN_ARROW) {
        player.y += scrollSpeed;
    } else if (keyCode == RIGHT_ARROW) {
        player.x += scrollSpeed;
    } else if (keyCode == LEFT_ARROW) {
        player.x -= scrollSpeed;
    } else if (keyCode == ESCAPE) {
        resetGame();
    }
}

// Funzione chiamata quando il mouse è cliccato
function mouseClicked() {
    // Gestisce il clic sul menu o il clic per ricominciare dopo la sconfitta
    if (!inGame) {
        menu.mouseClickedMenu();
    }
    if (!playerVisible) {
        if (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax) {
            resetGame();
        }
    }
}

// Funzione chiamata quando il gioco è perso
function perso() {
    background(persoImg);
}

// Funzione chiamata quando il gioco è vinto
function vinto() {
    background(vintoImg);
}

// Funzione per resettare il gioco
function resetGame() {
    playerVisible = true;
    inMovimento = true;
    inGame = false;
    score = 0;
    cars = [];
    x1 = 0;
    x2 = width;
    nextCarSpawnFrame = frameCount + carSpawnInterval;
    createCar1 = true;
    loop();
}
