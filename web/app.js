// Definition
const areaWidth = 18;

let area = [];

let direction = 'right';


// Functions
function start() {
   for (let y = 0; y < areaWidth; y++) {
      for (let x = 0; x < areaWidth; x++) {
         area.push(0);
      }
   }
   // Snake position in the center
   area[areaWidth * Math.floor(areaWidth / 2) + Math.floor(areaWidth / 2)] = 2;
   area[areaWidth * Math.floor(areaWidth / 2) + Math.floor(areaWidth / 2) + areaWidth] = 1;


}

function generateArea() {
   let html = area.reduce((prev, cur, index) => {
      prev += cur.toString();
      if ((index + 1) % areaWidth == 0) prev += '<br>';
      return prev;
   }, '');


   document.querySelector('#game-spawner').innerHTML = html;
}

function removeTail() {
   area = area.map(value => value > 0 ? value - 1 : 0);
}


// Processing
start();


// Output
setInterval(() => {
   generateArea();
}, 1000);
