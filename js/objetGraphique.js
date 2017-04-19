// ICI UNE AUTRE MANIERE DE FAIRE DES OBJETS
// CLASSES ES6, attention : ne marchera pas dans
// de vieux browsers comme IE
// Opera, FF, Edge, Chrome, sans doute safari
// ca doit marcher.
// On va faire une classe "balle"

class ObjetGraphique {
  constructor(x, y, couleur, vx, vy) {
    this.x = x;
    this.y = y;
    this.couleur = couleur;
    this.vx = vx;
    this.vy = vy;
  }
  
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  
  draw(ctx) {
    // ici on peut dessiner par ex un petit cercle
    // au point x, y
    // Pour dessiner un cercle, faire comme ceci
    // j'explique après...
    ctx.save(); // bonne pratique
    ctx.translate(this.x, this.y);
    
    // On dessine en 0,0
    ctx.beginPath();
    ctx.arc(0, 0, 2,
           0, 2*Math.PI);
    ctx.fillStyle = this.couleur;
    ctx.fill();
    
    ctx.restore();
    
  }
}
