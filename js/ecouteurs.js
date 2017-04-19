function creerLesEcouteurs() {
  // Touches, sur window
  window.addEventListener('keydown', toucheEnfoncee);
  window.addEventListener('keyup', toucheRelachee);
  
  // Ecouteurs de souris, on peut mettre sur le canvas
 canvas.addEventListener('mouseup', boutonSourisRelache); 
 canvas.addEventListener('mousedown', boutonSourisEnfonce); 
 canvas.addEventListener('mousemove', sourisDeplacee); 
}

function boutonSourisEnfonce(evt) {

}
function boutonSourisRelache(evt) {
  //console.log("bouton relache");

}
function sourisDeplacee(evt) {
  let rect = canvas.getBoundingClientRect();
  let mx = evt.clientX - rect.left;
  let my = evt.clientY - rect.top;
  if(jeu.gameState==1){
    raquette.x= mx;
  }
}
function toucheEnfoncee(evt) {
  //console.log("touche enfoncee key = " + evt.key);
  switch(evt.key) {
    case 'ArrowRight' :
      if(jeu.gameState==1){
        raquette.x = raquette.x+15;
      }

      break;
    case 'ArrowLeft' :
      if(jeu.gameState==1){
        raquette.x = raquette.x-15;
      }
      break;
    case ' ' :
      if(jeu.gameState==3){
        jeu.gameState = 1;
      }
      else{
        jeu.gameState = 3;
      }
      break;
  }
}

function toucheRelachee(evt) {
  console.log("touche relachee");
  switch(evt.key) {
    case 'Enter' :
      if(jeu.gameState==2){
        jeu.gameState = 1;
        jeu.initGame();
      }
      else{
        jeu.gameState = 3;
      }
      break;
    
  }
}
