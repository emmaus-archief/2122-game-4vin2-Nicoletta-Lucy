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
var spelStatus = SPELEN;

const BAAN_LINKS_X = 300;
const BAAN_MIDDEN_X = 600;
const BAAN_RECHTS_X = 900;
var spelerX = BAAN_LINKS_X; // x-positie van speler
var spelerY = 600; // y-positie van speler
var metroLinksY = 100;
var metroMiddenY = -200;
var metroRechtsY = 0;

var keyLosVorigeKeer = 0;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (spelerX === BAAN_LINKS_X && keyIsDown(39)){ // pijl rechts
    spelerX = BAAN_MIDDEN_X;
  }
  if(keyIsDown === BAAN_RECHTS_X &&(37)){
    
    spelerX = BAAN_MIDDEN_X;
  }

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

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen metro
  if (spelerX - vijandX < 50 &&
      spelerX - vijandX >-50 &&
      spelerY - vijandY < 50 &&
      spelerY - vijandY > -50) {
      console.log('botsing')
      }
  

  // botsing kogel tegen metro

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  background('blue');

  // vijand
  round(random(1, 3));
  rect(200, metroLinksY, 200, 300);
  rect(550, metroMiddenY, 200, 300);
  rect(1000, metroRechtsY, 200, 300);
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
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm

  }
}
