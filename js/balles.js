class Balle extends ObjetGraphique {
  constructor(x, y, rayon, couleur, vx, vy) {
    // appel du constructeur hérité
    super(x, y, couleur, vx, vy);
    this.rayon = rayon;
  }
  
  draw(ctx) {
    // Pour dessiner un cercle, faire comme ceci
    // j'explique après...
    ctx.save(); // bonne pratique
    ctx.translate(this.x, this.y);
    
    // On dessine en 0,0
    ctx.beginPath();
    ctx.arc(0, 0, this.rayon,
           0, 2*Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    
    ctx.restore();
    
    // Appel de la méthode héritée
    super.draw(ctx);
  }
  changeCouleur() {
    if(this.couleur=="white"){
      this.couleur="orange";
    }
    else if(this.couleur=="orange"){
      this.couleur="red";
    }
  }
}