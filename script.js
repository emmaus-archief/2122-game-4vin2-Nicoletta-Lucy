/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
// const voor de basis dingen
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
var spelStatus = SPELEN;
// var is nu een pixelgetal voor snelheid, nu getal veranderen in woord

// voor het bewegen van de speler
const KEY_LINKS = 37;
const KEY_RECHTS = 39;
var keyRechtsDownToen = false;
var keyRechtsDownNu = false;
var keyLinksDownToen = false;
var keyLinksDownNu = false;

// banen waarin je kunt bewegen
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

// foto's en de snelheid van de aliens
var img;
var img_background;
var blokSnelheid = 4;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */ 

var timer = function () { // de tijd meten voor je highscore
  fill('white');
  textSize(80);
  textAlign(RIGHT);
  text("0", 840, 200);
}

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // vijand
  metroLinksY += blokSnelheid ;
  metroMiddenY += blokSnelheid ;
  metroRechtsY += blokSnelheid ;

  // snelheid van de vijanden
  if (keyIsDown (KEY_LINKS)) {
    blokSnelheid = blokSnelheid + 0.8;
    }

  // speler in x-richting als je rechter pijl indrukt
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

// speler in x-richting als je linker pijl indrukt
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




var verwerkBotsing = (rectHoogte) => {
  // botsing speler tegen alien via alle 3 de banen
  if (spelerX === BAAN_LINKS_X && // de botsing van de eerste (links) alien
    spelerY - metroLinksY > 0 &&
    spelerY - metroLinksY < rectHoogte) {
    spelStatus = GAMEOVER;
  }

  if (spelerX === BAAN_RECHTS_X && // de botsing van de tweede (midden) alien
    spelerY - metroRechtsY > 0 &&
    spelerY - metroRechtsY < rectHoogte) {
    spelStatus = GAMEOVER;
  }

  if (spelerX === BAAN_MIDDEN_X && // de botsing van de derde (rechts) alien
    spelerY - metroMiddenY > 0 &&
    spelerY - metroMiddenY < rectHoogte) {
    spelStatus = GAMEOVER;
  }
 
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function (rectHoogte) {
  image(img_background,0,0,1280,720); // schermvullend plaatje op de achtergrond
  // round(random(1, 3));
  // Teken achtergrond van alien
  fill("blue"); // achtergrond van alien
  // rect(metroLinksX, metroLinksY, 200, rectHoogte); // linkeralien vak
  // rect(metroMiddenX, metroMiddenY, 200, rectHoogte); // middennalien vak
  // rect(metroRechtsX, metroRechtsY, 200, rectHoogte); // rechteralien vak
  image(img, metroLinksX, metroLinksY, 200, rectHoogte);
  image(img, metroMiddenX, metroMiddenY, 200, rectHoogte);
  image(img, metroRechtsX, metroRechtsY, 200, rectHoogte);

  // vorm van de speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () { // kijkt of game over game over is
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function preload() {
  img = loadImage('ufo.png'); // plaatje laden voor alien

  img_background = loadImage('Hyperspace.png'); // achtergrond plaatje
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() { // een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  vijandX=random(300,600);
}
// x
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

  // teken game-over scherm
  if (spelStatus === GAMEOVER) {
    fill('blue');
    textSize (80);
    textAlign(CENTER);
    text("game over, press space to start", 640, 360);
    if (keyIsDown(32)) { // spatie om opnieuw te starten
      spelerX = BAAN_LINKS_X
      metroLinksY = 100;
      metroMiddenY = -400;
      metroRechtsY = 0;
      spelStatus = SPELEN;
    }
  }
 
  // code voor uitleg tekst
  if (spelStatus === SPELEN) {
    fill('blue');
    textSize (40);
    textAlign(RIGHT);
    text("use the arrows to play", 640, 100);
  }
}
