//Grid
var CONFIG = {
  width: 40,
  height: 20,
  cellSize: 30
};

var body = document.getElementsByTagName("body");

var table = document.createElement("table");
document.body.appendChild(table);

table.cellSpacing = "0";
table.cellPadding = "0";


for (var i = 0; i < CONFIG.height; i++) {

  var tableRow = document.createElement("tr");
  table.appendChild(tableRow);


  for (var j = 0; j < CONFIG.width; j++) {
    var tableCol = document.createElement("td");
    tableRow.appendChild(tableCol);
    tableCol.width = CONFIG.cellSize + "px"
    tableCol.height = CONFIG.cellSize + "px";
  };
};

//Adding ID to cells
var tableRowsArray = document.getElementsByTagName("tr");
var colAlphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad"];

for (var i = 0; i < tableRowsArray.length; i++) {
  for (var j = 0; j < 40; j++) {
    tableRowsArray[i].children[j].id = colAlphabetArray[i] + j;
  };
};

//Snake start
var snakeStart = document.getElementById("j19");
snakeStart.style.backgroundColor = "#000";

//Snake movement
var cellArray = document.getElementsByTagName("td");
function locate() {
  for (var i = 0; i < cellArray.length; i++) {
    if (cellArray[i].style.backgroundColor === "rgb(0, 0, 0)") {
      return cellArray[i].id;
    };
  };
};

var currentPositionElTd

function currentPos() { 
  var currentPosition = locate();
  var currentPositionEl = document.getElementById(currentPosition);
 
  for (i = 0; i < cellArray.length; i++) {
    if (cellArray[i] === currentPositionEl) {
      currentPositionElTd = cellArray[i];
    };
  };
};

var direction;
var lastKeyPressed;
var started = false;
function pressKey(f) {

  if (typeof direction !== 'undefined') {
    if (direction.keyCode === 40 && f.keyCode === 38) {
      return
    };

    if (direction.keyCode === 38 && f.keyCode === 40) {
      return
    };

    if (direction.keyCode === 37 && f.keyCode === 39) {
      return
    };

    if (direction.keyCode === 39 && f.keyCode === 37) {
      return
    };
  }

  direction = f;
  if (!started) {
    window.setInterval(function(){snakeMove(direction)}, 300);
    started = true;
  };
}; 
function snakeMove(e){
  var currentPosition = locate();
  
  if (e.keyCode === 40) {
    //alert("down")
    currentPos();
    
    var currentPositionElTdId = currentPositionElTd.id;
    var currPosIdLetter = currentPositionElTdId.charAt(0);
    var currPosIdNumber1 = currentPositionElTdId.charAt(1);
    var currPosIdNumber2 = currentPositionElTdId.charAt(2);
    var currPosArrayIndex = colAlphabetArray.indexOf(currPosIdLetter);
    var newPosArrayIndex = currPosArrayIndex + 1;
    var newPositionId = colAlphabetArray[newPosArrayIndex] + currPosIdNumber1 + currPosIdNumber2;
    var newPosition = document.getElementById(newPositionId);
    
    if (newPosArrayIndex >= CONFIG.height) {
      alert("death!");
      document.location.reload(true);
      return;
    };

    newPosition.style.backgroundColor = "#000";
    currentPositionElTd.style.backgroundColor = "#FFF";

  } else if (e.keyCode === 38) {
    //alert("up")
    currentPos();

    var currentPositionElTdId = currentPositionElTd.id;
    var currPosIdLetter = currentPositionElTdId.charAt(0);
    var currPosIdNumber1 = currentPositionElTdId.charAt(1);
    var currPosIdNumber2 = currentPositionElTdId.charAt(2);
    var currPosArrayIndex = colAlphabetArray.indexOf(currPosIdLetter);
    var newPosArrayIndex = currPosArrayIndex - 1;
    var newPositionId = colAlphabetArray[newPosArrayIndex] + currPosIdNumber1 + currPosIdNumber2;
    var newPosition = document.getElementById(newPositionId);


    if (newPosArrayIndex < 0) {
      alert("death!");
      document.location.reload(true);
      return;
    };

    newPosition.style.backgroundColor = "#000";
    currentPositionElTd.style.backgroundColor = "#FFF"; 

  } else if (e.keyCode === 37) {
    //alert("left")
    currentPos();
    var currentPositionElTdId = currentPositionElTd.id;
    var currPosIdLetter = currentPositionElTdId.charAt(0);
    var currPosIdNumber1 = currentPositionElTdId.charAt(1);
    var currPosIdNumber2 = currentPositionElTdId.charAt(2);
    var currPosArrayIndex =  colAlphabetArray.indexOf(currPosIdLetter);
    var currPosNumString = currPosIdNumber1 + currPosIdNumber2;
    var currPosNum = parseInt(currPosNumString, 10);
    var newPositionId = colAlphabetArray[currPosArrayIndex] + (currPosNum - 1);
    var newPosition = document.getElementById(newPositionId);

    if (currPosNum < 1) {
      alert("death!");
      document.location.reload(true);
      return;
    };

    newPosition.style.backgroundColor = "#000";
    currentPositionElTd.style.backgroundColor = "#FFF";

  
  } else if (e.keyCode === 39) {
    //alert("right")
    currentPos();
    var currentPositionElTdId = currentPositionElTd.id;
    var currPosIdLetter = currentPositionElTdId.charAt(0);
    var currPosIdNumber1 = currentPositionElTdId.charAt(1);
    var currPosIdNumber2 = currentPositionElTdId.charAt(2);
    var currPosArrayIndex =  colAlphabetArray.indexOf(currPosIdLetter);
    var currPosNumString = currPosIdNumber1 + currPosIdNumber2;
    var currPosNum = parseInt(currPosNumString, 10);
    var newPositionId = colAlphabetArray[currPosArrayIndex] + (currPosNum + 1);
    var newPosition = document.getElementById(newPositionId);

    if (currPosNum >= CONFIG.width - 1) {
      alert("death!");
      document.location.reload(true);
      return;
    };

    newPosition.style.backgroundColor = "#000";
    currentPositionElTd.style.backgroundColor = "#FFF"; 
  } else {
    //alert(e.keyCode)
  };
  
  lastKeyPressed = e.keyCode
}; 
window.addEventListener("keydown", pressKey);

//Food
var randomCell
function generateFood() {
  for (i = 0; i < cellArray.length; i++) {
    if (cellArray[i].style.backgroundColor === "rgb(144, 238, 144)") {
      cellArray[i].style.backgroundColor = "#FFF"
    };
  };
  randomCell = cellArray[Math.floor(Math.random()*cellArray.length)];
  randomCell.style.backgroundColor = "#90EE90";
};
window.setInterval(generateFood, 7000);