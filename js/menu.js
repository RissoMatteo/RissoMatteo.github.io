class Menu {
    constructor() {
        this.menuImage; // Immagine di sfondo del menu principale
        this.helpImage; // Immagine di sfondo per le istruzioni
        this.showInstructions = false; // per mostrare le istruzioni

        // Pulsante di avvio del gioco
        this.startButton = {
            xMin: 733,
            xMax: 1200,
            yMin: 480,
            yMax: 670
        };

        // Pulsante per visualizzare le istruzioni
        this.instructionButton = {
            xMin: 250,
            xMax: 700,
            yMin: 480,
            yMax: 670
        };

        // Pulsante per tornare al menu principale dalle istruzioni
        this.backButton = {
            xMin: 900,
            xMax: 1200,
            yMin: 40,
            yMax: 135
        };
    }

    // Carica le immagini necessarie
    preloadMenu() {
        this.menuImage = loadImage("img/menu222.jpg");
        this.helpImage = loadImage("img/help.png");
    }

    // Imposta le posizioni dei pulsanti
    setupMenu() {
        createCanvas(this.menuImage.width, this.menuImage.height);
    }

    // Disegna il menu o le istruzioni a seconda del tasto premuto
    drawMenu() {
        if (this.showInstructions) {
            image(this.helpImage, 0, 0);
        } else {
            image(this.menuImage, 0, 0);
        }
    }

    // Gestisce il clic del mouse sul menu
    mouseClickedMenu() {
        if (mouseX > this.startButton.xMin && mouseX < this.startButton.xMax && mouseY > this.startButton.yMin && mouseY < this.startButton.yMax) {
            // Avvia il gioco quando il pulsante di avvio viene cliccato
            inGame = true;
            setupGame(); // Inizializzazioni del gioco
        } else if (mouseX > this.instructionButton.xMin && mouseX < this.instructionButton.xMax && mouseY > this.instructionButton.yMin && mouseY < this.instructionButton.yMax) {
            // Mostra le istruzioni quando il pulsante delle istruzioni viene cliccato
            this.showInstructions = true;
        } else if (mouseX > this.backButton.xMin && mouseX < this.backButton.xMax && mouseY > this.backButton.yMin && mouseY < this.backButton.yMax) {
            // torna al menu principale quando il pulsante "Back" viene cliccato
            this.showInstructions = false;
        }
    }
}

// Creazione di un'istanza della classe Menu
let menu = new Menu();