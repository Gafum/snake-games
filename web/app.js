// Definition
const areaWidth = 18;

let area = [];

const directionEnum = ['up', 'down', 'left', 'right'];

let direction = directionEnum[0];


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

function gameOver() {
   alert('Game Over!');
   document.location.reload();
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
   let newIndex = indexOfMaxValue;
   if (direction == directionEnum[3]) {
      if (indexOfMaxValue % areaWidth == areaWidth - 1) {
         gameOver();
      }
      newIndex = indexOfMaxValue + 1;
   } else if (direction == directionEnum[2]) {
      if (indexOfMaxValue % areaWidth == 0) {
         gameOver();
      }
      newIndex = indexOfMaxValue - 1;
   } else if (direction == directionEnum[0]) {
      newIndex = indexOfMaxValue - areaWidth;
      if (newIndex < 0) {
         gameOver();
      }
   } else if (direction == directionEnum[1]) {
      newIndex = indexOfMaxValue + areaWidth;
      if (newIndex >= areaWidth * areaWidth) {
         gameOver();
      }
   }

   area[newIndex] = Math.max(...area) + 1; //move head
   removeTail(); //remove tail
}

// Input
document.addEventListener('keydown', (e) => {
   switch (e.key) {
      case 'ArrowUp':
         direction = directionEnum[0];
         break;
      case 'ArrowDown':
         direction = directionEnum[1];
         break;
      case 'ArrowLeft':
         direction = directionEnum[2];
         break;
      case 'ArrowRight':
         direction = directionEnum[3];
         break;
   }
});


// Processing
start();


// Output
setInterval(() => {
   go();
   generateArea();
}, 500);
