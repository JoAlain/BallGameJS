class Bloc extends ObjetGraphique {
  constructor(x, y, width, height, couleur, vx, vy) {
    super(x, y, couleur, vx, vy);
    this.width = width;
    this.height = height;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    ctx.beginPath();

    ctx.fillStyle = this.couleur;
    ctx.fillRect(0, 0, this.width, this.height);
    
    ctx.restore();
    
    // Appel de la méthode héritée
    super.draw(ctx);
  }
}