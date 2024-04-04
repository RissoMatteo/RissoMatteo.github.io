class Player {
  constructor() {
      this.x = 50; // Posizione iniziale x del giocatore
      this.y = height / 2; // Posizione iniziale y del giocatore, centrata rispetto all'altezza della finestra
      this.r = 150; // Raggio del giocatore (dimensione del giocatore)
      this.collisionRadius = this.r; // Raggio utilizzato per le collisioni
  } 

  show() {
      // Utilizza l'immagine per disegnare il giocatore
      image(mImg, this.x, this.y, this.r, this.r);
  }
}

// Funzione per controllare la collisione tra due oggetti
function checkCollision(car, giocatore) {
// Restituisce true se c'è una collisione tra car e giocatore, altrimenti false
  return (
      car.x < giocatore.x + giocatore.collisionRadius &&
      car.x + car.collisionRadius > giocatore.x &&
      car.y < giocatore.y + giocatore.collisionRadius &&
      car.y + car.collisionRadius > giocatore.y
  );
}