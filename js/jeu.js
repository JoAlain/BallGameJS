window.addEventListener('load', init);
let canvas, ctx, width, height;
let tableauxDesBalles = []; 
let tableauxDesBlocs = []; 
var particles = [];
function init() {
  
  initFPS();
  
  canvas = document.querySelector("#myCanvas");
  width = canvas.width;
  height = canvas.height; 

  ctx = canvas.getContext('2d');

  creerLesEcouteurs();
  jeu.initGame();
  requestAnimationFrame(mainLoop);
}

function mainLoop(time) {
	measureFPS(time);
	ctx.clearRect(0, 0, width, height);
	switch(jeu.gameState){
		case 1:
			jeu.resumeGame();
			break;
		case 2:
			jeu.gameOver();
			break;
		case 3:
			jeu.pauseGame();
	}
	requestAnimationFrame(mainLoop);
}
function Particle ()
  {
    this.scale = 1.0;
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.color = "#000";
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;
    this.useGravity = false;
      
    this.update = function(ms)
    {
      // shrinking
          
      this.scale -= this.scaleSpeed * ms / 1000.0;
          
      if (this.scale <= 0)
      {
              // particle is dead, remove it
              removeFromArray(particles, this);
              
      }
      
      // moving away from explosion center
      this.x += this.velocityX * ms/1000.0;
      this.y += this.velocityY * ms/1000.0;
          
          // and then later come downwards when our
      // gravity is added to it. We should add parameters 
          // for the values that fake the gravity
          if(this.useGravity) {
              this.velocityY += Math.random()*4 +4;
          }
    };
    
    this.draw = function(ctx)
    {
      // translating the 2D context to the particle coordinates
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);
      
      // drawing a filled circle in the particle's local space
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
      //ctx.closePath();
      
      ctx.fillStyle = this.color;
      ctx.fill();
      
      ctx.restore();
    };
  }

  function randomFloat (min, max)
  {
    return min + Math.random()*(max-min);
  }

  function removeFromArray(array, object) {
      var idx = array.indexOf(object);
      if (idx !== -1) {
          array.splice(idx, 1);
      }
      return array;
  }
  function createBasicExplosion(x, y)
  {
    // creating 4 particles that scatter at 0, 90, 180 and 270 degrees
    for (var angle=0; angle<360; angle+=90)
    {
      var particle = new Particle();
      
      // particle will start at explosion center
      particle.x = x;
      particle.y = y;
      
      particle.color = "#FF0000";
      
      var speed = 50.0;
      
      // velocity is rotated by "angle"
      particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
      particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
      
      // adding the newly created particle to the "particles" array
      particles.push(particle);
    }
  }
  function createExplosion(x, y, color)
  {
    var minSize = 10;
    var maxSize = 30;
    var count = 10;
    var minSpeed = 60.0;
    var maxSpeed = 200.0;
    var minScaleSpeed = 1.0;
    var maxScaleSpeed = 4.0;
    
    for (var angle=0; angle<360; angle += Math.round(360/count))
    {
      var particle = new Particle();
      
      particle.x = x;
      particle.y = y;
      
            // size of particle
      particle.radius = randomFloat(1, 3);
      
      particle.color = color;
      
            // life time, the higher the value the faster particle 
            // will die
      particle.scaleSpeed = randomFloat(0.3, 0.5);
          
            // use gravity
          particle.useGravity = true;
      
      var speed = randomFloat(minSpeed, maxSpeed);
      
      particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
      particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
      
      particles.push(particle);
    }
    
  }
  // Delta = time between two consecutive frames,
  // for time-based animation
  function updateAndDrawParticules(delta) {
     for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      
      particle.update(delta);
      particle.draw(ctx);
     }
  }

  function startDoubleExplosion(x, y) {
    createExplosion(x, y, "#525252");
    // On peut multiplier la densité en générant plusieurs 
    // explositons de couleurs différentes...
    //console.log("mandalo explosion");
    createExplosion(x, y, "#FFA318");
    //createExplosion(x, y, "green");
    //sound.play('blast');

  }

  function timer(currentTime) {
    var delta = currentTime - oldTime;
    oldTime = currentTime;
    return delta;
 
  }
  // SOUND WITH HOWLER JS
  /*var sound = new Howl({
    urls: ['audio/sounds.mp3', 'audio/sounds.ogg'],
    sprite: {
      blast: [0, 2000],
      laser: [3000, 700],
      winner: [5000, 9000]
    }
  });*/

function fillColorRange(range){
	let color = "white";
	switch(range){
	  case 1:
	    color="rgb(170, 22, 27)";
	    break;
	  case 2:
	    color="rgb(172, 28, 120)";
	    break;
	  case 3:
	    color="rgb(120, 32, 169)";
	    break;
	  case 4:
	    color="rgb(22, 31, 169)";
	    break;
	  case 5:
	    color="rgb(26, 102, 154)";
	    break;
      case 6:
	    color="rgb(37, 158, 104)";
	    break;
	  case 7:
	    color="rgb(36, 158, 32)";
	    break;
	}
	return color;
}

function createBloc(){
	for(let range = 1; range<8; range++){
		for(let i = 0; i < 8; i++) {
			let width = 67;
			let height = 30;
			let x = i * (width+7) +7;
			let y = 75 + (height+7)*(range-1);
			let couleur = fillColorRange(range);
			let vx = 0;
	    	let vy = 0;
			let bloc = new Bloc(x, y, width, height, couleur, vx, vy);
			tableauxDesBlocs.push(bloc);
		}
	}
}

let oldTime=0;
let timeNextStage=0;

function dessinerLesBlocs() {
  tableauxDesBlocs.forEach(function(bloc, index, tab) {
    bloc.draw(ctx);
  });
}
function createBallsByNiveau(niveau){
	creerDesBalles(2*niveau);
}
function creerDesBalles(nbBalls) {
  for(let i = 0; i < nbBalls; i++) {
    let x = Math.random() * width; 
    let y = 450;
    let rayon = 2 + Math.random() * 10; 
    let couleur = "white";
    let vx = 1+0.75 *5; 
    let vy = 1+0.75 *5;
    
    let b = new Balle(x, y, rayon, couleur, vx, vy);
    tableauxDesBalles.push(b);
  }
}

function dessinerEtDeplacerLesBalles() {
  tableauxDesBalles.forEach(function(b, index, tab) {
    b.draw(ctx);
    if(jeu.gameState=="1"){
    	b.move();
    }
    testeCollisionBalleAvecMurs(b);
  });
}

function testeCollisionBalleAvecMurs(b) {
  if(((b.x + b.rayon) > width) || ((b.x - b.rayon) < 0)) {
    b.vx = -b.vx;
  }
  if((b.y - b.rayon) < 75) {
    b.vy = -b.vy;
  }
  if(((b.y - b.rayon) < 75) && b.couleur=="red") {
    jeu.gameOver();
    createBasicExplosion(b.x, b.y);
  }
}
function testCollisionBalleAvecBlocs(b, indexBalle) {
  tableauxDesBlocs.forEach(function(bloc, index, tab) {
  	if(circRectsOverlap(bloc.x, bloc.y, bloc.width, bloc.height, b.x, b.y, b.rayon)) {
      tableauxDesBlocs.splice(index, 1);
  	  b.vy = -b.vy;
  	  if(b.couleur=="red"){
  	  	tableauxDesBalles.splice(indexBalle, 1);
        startDoubleExplosion(b.x, b.y);
        creerDesBalles(2);
        //startDoubleExplosion();
        delta = timer(100000);
       
        // Clear canvas
        //context2D.clearRect(0, 0, canvas.width, canvas.height);
    
        // Move and draw particles
        updateAndDrawParticules(delta);
  	  }
    }
  });
}

function testerCollisionBalles() {
  tableauxDesBalles.forEach(function(b, index, tab) {
    testCollisionBalleAvecBlocs(b, index);
    if(circRectsOverlap(raquette.x, raquette.y, raquette.width, raquette.height, b.x, b.y, b.rayon)) {
      jeu.addScore(b.rayon);

      tableauxDesBalles.splice(index, 1);
      //console.log('tableauxDesBalles.length' + tableauxDesBalles.length);
      if(tableauxDesBalles.length == 0){
        jeu.passerAuNiveauSuivant();
      }
    }
    else if(circRectsOverlap(mur.x, mur.y, mur.width, mur.height, b.x, b.y, b.rayon)) {
      if(((b.y + b.rayon) > mur.y)) {
	      b.vy = -b.vy;
	      b.changeCouleur();
	    }
    }
  });
    
}

function initGame(){
	tableauxDesBalles = []; 
	tableauxDesBlocs = []; 
	createBloc();
  createBallsByNiveau(1);
}
function displayGame(){
  mur.draw2(ctx, 65, "white");
	mur.draw(ctx);
	raquette.draw(ctx);
	jeu.drawScore(ctx);
  jeu.drawNiveau(ctx);
	dessinerLesBlocs();
	dessinerEtDeplacerLesBalles();
	testerCollisionBalles();
}
function displayGameOver(){
	mur.draw(ctx);
	raquette.draw(ctx);
	//jeu.drawScore(ctx);
  //jeu.drawNiveau(ctx);
  jeu.drawGameOver(ctx);
  jeu.drawFinalScore(ctx);
}

// Syntaxe 1 : objet "singleton"
let jeu = {
  // propriétés
  niveauEnCours:1,
  gameState:1, // 1 Play // 2 Game Over // 3 Pause
  score:0,
  resumeGame: function() {
    this.gameState=1;
    displayGame();
  },
  gameOver: function() {
    this.gameState=2;
	  displayGameOver();
  },
  pauseGame: function() {
    this.gameState=3;
    displayGame();
  },
  initGame: function() {
    this.gameState=1;
    this.score=0;
    this.niveauEnCours=1;
    initGame();
  },
  addScore: function(rayon) {
    this.score += parseInt(rayon);
  },
  passerAuNiveauSuivant: function(){
  	this.niveauEnCours++;
    //tableauxDesBlocs.splice();
    //dessinerLesBlocs();
    jeu.drawNiveauTermine(ctx);
    createBallsByNiveau(this.niveauEnCours);
  },
  drawNiveauTermine: function(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    let fontSize = 50;
    ctx.font = fontSize + 'px Courier';
    ctx.strokeStyle = "blue";
    ctx.strokeText("Niveau " + this.niveauEnCours + " terminé, appuiez sur [ESPACE] pour continuer!", 40, 200);
    ctx.restore();
  },
  drawNiveau: function(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    let fontSize = 40;
    ctx.font = fontSize + 'px Courier';
    ctx.strokeStyle = "white";
    ctx.strokeText("Niveau : "+this.niveauEnCours, 25, 35);
    ctx.restore(); 
  },
  drawScore: function(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    let fontSize = 40;
    ctx.font = fontSize + 'px Courier';
    ctx.strokeStyle = "white";
    ctx.strokeText("Score : "+this.score, 305, 35);
    ctx.restore();   
  },
  drawGameOver: function(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    let fontSize = 80;
    ctx.font = fontSize + 'px Courier';
    ctx.strokeStyle = "red";
    ctx.strokeText("GAME OVER", 80, 150);
    ctx.restore(); 
  },
  drawFinalScore: function(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    let fontSize = 25;
    ctx.font = fontSize + 'px Courier';
    ctx.strokeStyle = "white";
    ctx.strokeText("Niveau :"+this.niveauEnCours, 40, 250);
    ctx.strokeText("Meilleurs scores :"+this.score, 40, 300);
    ctx.strokeText("Appuiez sur [ENTREE] pour continuer", 40, 350);
    ctx.restore();
    creerLesEcouteurs();
  }
}
