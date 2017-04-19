// Syntaxe 1 : objet "singleton"
let mur = {
  // propriétés
  x:0,
  y:850,
  width:600,
  height:10,
  couleur:"white",
  
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
  },
  draw2: function(ctx, ynew, color) {
      ctx.save();
  
      ctx.translate(this.x, ynew);
  
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, this.width, 2);
   
      ctx.restore();    
  }

}
