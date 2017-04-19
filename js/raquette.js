// Syntaxe 1 : objet "singleton"
let raquette = {
  // propriétés
  x:300,
  y:850,
  width:100,
  height:10,
  couleur:"black",
  
  move: function(x, y) {
      this.x = x;
      this.y = y;
  }, 
  
  draw: function(ctx) {
      ctx.save();
  
      ctx.translate(this.x, this.y);
  
      ctx.fillStyle = this.couleur;
      ctx.fillRect(0, 0, this.width, this.height);
   
      ctx.restore();    
  }
}
