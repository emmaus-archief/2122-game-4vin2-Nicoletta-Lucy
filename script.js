/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
var spelStatus = SPELEN;

const BAAN_LINKS_X = 251;
const BAAN_MIDDEN_X = 625;
const BAAN_RECHTS_X = 998;
var spelerX = BAAN_LINKS_X; // x-positie van speler
var spelerY = 600; // y-positie van speler
var metroLinksY = 100;
var metroMiddenY = -400;
var metroRechtsY = 0;
var metroLinksX = 150;
var metroMiddenX = 525;
var metroRechtsX = 900;
var keyLosVorigeKeer = 0;

var img;
var img_background;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
 

  // vijand
  metroLinksY += 4;
 metroMiddenY += 4;
 metroRechtsY += 4;

  // kogel
  if(keyIsDown(38)){
    spelerY -=10;
  }

  if(keyIsDown(40)){
    spelerY +=10;
  }

};


function keyPressed() {
  if (spelerX === BAAN_MIDDEN_X && keyCode === 39){ // pijl rechts
    spelerX = BAAN_RECHTS_X;
    
  }

  if (spelerX === BAAN_LINKS_X && keyCode === 39){ // pijl rechts
    spelerX = BAAN_MIDDEN_X;
    
  }
  
  if(spelerX === BAAN_MIDDEN_X && keyCode === 37){ // pijl links
    spelerX = BAAN_LINKS_X;
  }

  if(spelerX === BAAN_RECHTS_X && keyCode === 37){ // pijl links
    spelerX = BAAN_MIDDEN_X;
  }
}
/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen metro
  if (spelerX === BAAN_LINKS_X &&
      spelerY - metroLinksY > 0 &&
      spelerY - metroLinksY < 300) {
        spelStatus = GAMEOVER;
      }

  if ( spelerX === BAAN_RECHTS_X &&
       spelerY - metroRechtsY > 0 &&
       spelerY - metroRechtsY < 300) {
        spelStatus = GAMEOVER;
      }

  if ( spelerX === BAAN_MIDDEN_X &&
      spelerY - metroMiddenY > 0 &&
      spelerY - metroMiddenY < 300) {
        spelStatus = GAMEOVER;
      }
  // botsing kogel tegen metro

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  fill("red");
  rect(0,0,1280,720);// rode achtergond
  image(img_background,0,0,1280,720); // schermvullend plaatje op de achtergrond

  // vijand
  fill(255,255,255);
  round(random(1, 3));
  rect(metroLinksX, metroLinksY, 200, 300);
  rect(metroMiddenX, metroMiddenY, 200, 300);
  rect(metroRechtsX, metroRechtsY, 200, 300);
  image(img, metroLinksX, metroLinksY, 100, 100);
  
  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function preload() {
  img = loadImage('ufo.jpg');

  img_background = loadImage('Hyperspace.png');
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  vijandX=random(300,600);
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (metroLinksY === 900) {
      metroLinksY = 0;
    }

    if (metroMiddenY === 900) {
      metroMiddenY = 0;
    }

    if (metroRechtsY === 900) {
      metroRechtsY = 0;
    }
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    fill('blue');
    textSize (100);
    textAlign(CENTER);
    text("game over lol", 640, 360);
    if (keyIsDown(32)) {
      spelerX = BAAN_LINKS_X
      metroLinksY = 100;
      metroMiddenY = -400;
      metroRechtsY = 0;
      spelStatus = SPELEN;
    }
  }
  

  if (spelStatus === UITLEG) {

  }
}
