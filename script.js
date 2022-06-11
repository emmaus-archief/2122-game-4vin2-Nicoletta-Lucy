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
// var is nu een pixelgetal voor snelheid, nu getal veranderen in woord


const KEY_LINKS = 37;
const KEY_RECHTS = 39;
var keyRechtsDownToen = false;
var keyRechtsDownNu = false;
var keyLinksDownToen = false;
var keyLinksDownNu = false;

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
var blokSnelheid = 4;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */ 

var timer = function () {
  fill('white');
  textSize(80);
  textAlign(RIGHT);
  text("0", 840, 200);
}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
 
  // vijand
  metroLinksY += blokSnelheid ;
  metroMiddenY += blokSnelheid ;
  metroRechtsY += blokSnelheid ;
  //blokSnelheid = blokSnelheid * 1.01;

  // speler in x-richting
  keyRechtsDownToen = keyRechtsDownNu;
  keyRechtsDownNu = keyIsDown(KEY_RECHTS);
  if (keyRechtsDownNu===true && keyRechtsDownToen === false ) {
    if (spelerX === BAAN_MIDDEN_X) { 
       spelerX = BAAN_RECHTS_X;
    } 
    if (spelerX === BAAN_LINKS_X) {
        spelerX = BAAN_MIDDEN_X
    }
  }


 keyLinksDownToen = keyLinksDownNu;
 keyLinksDownNu = keyIsDown (KEY_LINKS);
 if (keyLinksDownNu === true && keyLinksDownToen === false) {
   if (spelerX===BAAN_MIDDEN_X) {
     spelerX = BAAN_LINKS_X;
   }
   if (spelerX === BAAN_RECHTS_X) {
     spelerX = BAAN_MIDDEN_X
   }
 };
};


/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function (rectHoogte) {
  // botsing speler tegen metro
  if (spelerX === BAAN_LINKS_X && // de botsing van de eerste (links) alien
      spelerY - metroLinksY > 0 &&
      spelerY - metroLinksY < rectHoogte) {
        spelStatus = GAMEOVER;
      }

  if ( spelerX === BAAN_RECHTS_X && // de botsing van de tweede (rechts) alien
       spelerY - metroRechtsY > 0 &&
       spelerY - metroRechtsY < rectHoogte) {
        spelStatus = GAMEOVER;
      }

  if ( spelerX === BAAN_MIDDEN_X && // de botsing van de derde (rechts) alien
      spelerY - metroMiddenY > 0 &&
      spelerY - metroMiddenY < rectHoogte) {
        spelStatus = GAMEOVER;
      }
  // botsing kogel tegen metro

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function (rectHoogte) {
  // achtergrond
  // rect(0,0,1280,720);// rode achtergond
  image(img_background,0,0,1280,720); // schermvullend plaatje op de achtergrond

  // vijand
  // fill(255,255,255);
  // round(random(1, 3));
  // Teken achtergrond van alien
  fill("blue"); // achtergrond van alien
  // rect(metroLinksX, metroLinksY, 200, rectHoogte); // linkeralien vak
  // rect(metroMiddenX, metroMiddenY, 200, rectHoogte); // middennalien vak
  // rect(metroRechtsX, metroRechtsY, 200, rectHoogte); // rechteralien vak
  image(img, metroLinksX, metroLinksY, 200, rectHoogte);
  image(img, metroMiddenX, metroMiddenY, 200, rectHoogte);
  image(img, metroRechtsX, metroRechtsY, 200, rectHoogte);
  
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
  img = loadImage('ufo.png');

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
    var rectHoogte = 200;
    beweegAlles();
    verwerkBotsing(rectHoogte);
    tekenAlles(rectHoogte);
    timer();
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
    textSize (80);
    textAlign(CENTER);
    text("game over, press space to start", 640, 360);
    if (keyIsDown(32)) {
      spelerX = BAAN_LINKS_X
      metroLinksY = 100;
      metroMiddenY = -400;
      metroRechtsY = 0;
      spelStatus = SPELEN;
    }
  }
  if (spelStatus === UITLEG) {
    // Stop hier dingen voor uitleg pagina
  }
}
