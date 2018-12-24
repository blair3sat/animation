const REFLECT = 100;
var two = new Two({
  fullscreen: true
}).appendTo(document.body);
two.makeCubesat = function(x, y) {
  let cubesat = two.makeGroup();
  cubesat.center = two.makeRectangle(x, y, 15, 10);
  cubesat.center.fill = "#FFFFFF";
  cubesat.center.stroke = "#000000";
  cubesat.left = two.makeWing(x - 5, y, -1);
  cubesat.right = two.makeWing(x + 5, y, 1);
  cubesat.add(cubesat.right).add(cubesat.left).add(cubesat.center);
  return cubesat;
}
two.makeWing = function(x, y, sign) {
  let theWing = two.makeGroup();
  theWing.up = two.makeLine(x, y, x + sign * 30, y + 5);
  theWing.down = two.makeLine(x, y, x + sign * 30, y - 5);
  theWing.add(theWing.down).add(theWing.up);
  return theWing;
}
two.makeIonosonde = function(x, y) {
  //Make ionosonde group, just setup
  let ionosonde = two.makeGroup();
  //Make triangle of ionosonde
  ionosonde.base = two.makePolygon(0, 0, 20, 3);
  ionosonde.base.fill = '#FFFFFF';
  ionosonde.base.stroke = 'black';
  ionosonde.base.linewidth = 4;
  //Make circle of ionosonde;
  ionosonde.circle = two.makeCircle(0, -40, 15);
  ionosonde.circle.fill = "#000000";

  ionosonde.translation.set(x, y);
  ionosonde.add(ionosonde.base).add(ionosonde.circle);
  return ionosonde;
}
var earth = two.makeCircle(window.innerWidth / 2, 5000, 4500);
earth.fill = '#AAAA00';
earth.stroke = 'green';
earth.lineWidth = 10;
var txloc = {
  x: window.innerWidth / 2 + 4500 * Math.cos(Math.PI * 17 / 36),
  y: 5000 - 4500 * Math.sin(Math.PI * 17 / 36)
};
var rxloc = {
  x: window.innerWidth / 2 + 4500 * Math.cos(Math.PI * 19 / 36),
  y: 5000 - 4500 * Math.sin(Math.PI * 19 / 36)
};
var reflection = {
  x: txloc.x,
  y: 2 * REFLECT - txloc.y
};
var tx = two.makeIonosonde(txloc.x, txloc.y);
var rx = two.makeIonosonde(rxloc.x, rxloc.y);
var allSignals = two.makeGroup();
var signalCover = two.makeRectangle(0, 0, window.innerWidth, REFLECT);
signalCover.translation.set(window.innerWidth / 2, REFLECT / 2);
signalCover.fill = "#FFFFFF";
signalCover.noStroke();
var cs = two.makeCubesat(900, 100);
var or = 4; //Outer radius of the radio wave - the distance from the center. The inner radius is four pixels inwards from this.
var rotation = Math.PI * 85 / 100;
var signalUp = undefined;
var signalDown = undefined;
everyFrame();


two.bind("update", everyFrame).play(); //Runs the animation--everyFrame updates it every frame.

function everyFrame() { //This runs every time Two.JS updates the frame.
  signalUp = updateSig(undefined, signalUp, txloc);
  signalDown = updateSig([Math.PI * 0.4, Math.PI * 0.9], signalDown, reflection);
  or += 2;
  allSignals.add(signalUp).add(signalDown);
}

function updateSig(theInfo = [Math.PI * 1.1, Math.PI * 1.6], sig, loc, color = "#000000") {
  if (or < 1700) {
    if (sig) allSignals.remove(sig);
    sig = two.makeArcSegment(loc.x, loc.y, or, or - 4, theInfo[0], theInfo[1]);
    sig.fill = color;
    sig.stroke = sig.fill;
  }
  return sig;
}
