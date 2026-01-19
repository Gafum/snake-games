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

function go() {
   var indexOfMaxValue = area.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0); //head of the snake
   if (direction == 'right') {
      var newIndex = indexOfMaxValue + 1;
   } else if (direction == 'left') {
      var newIndex = indexOfMaxValue - 1;
   } else if (direction == 'up') {
      var newIndex = indexOfMaxValue - areaWidth;
   } else if (direction == 'down') {
      var newIndex = indexOfMaxValue + areaWidth;
   }

   area[newIndex] = Math.max(...area) + 1; //move head
   removeTail(); //remove tail
}

// Input
document.addEventListener('keydown', (e) => {
   switch (e.key) {
      case 'ArrowUp':
         direction = 'up';
         break;
      case 'ArrowDown':
         direction = 'down';
         break;
      case 'ArrowLeft':
         direction = 'left';
         break;
      case 'ArrowRight':
         direction = 'right';
         break;
   }
});


// Processing
start();


// Output
setInterval(() => {
   generateArea();
}, 1000);
