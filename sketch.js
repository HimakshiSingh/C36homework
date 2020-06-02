var database;
var ref;
var drawing = [];
var dbDrawing = [];
var currentpath = [];
var endpath = [];
isDrawing = false

function setup() {

    //creating database
    database = firebase.database()
    ref = database.ref('drawing');
    createCanvas(800,400);
    ref.on("value",drawSketch,showError);

    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

}

function draw() {

  background("black");  
  stroke ("white")
  strokeWeight(5)
  noFill()

  beginShape()

  for(i=0;i<dbDrawing.length;i++){
    vertex(dbDrawing[i].x,dbDrawing[i].y)
  }

  endShape()

 
  drawSprites();
}

function mouseDragged(){
  point={
    x : mouseX,
    y : mouseY
  }
  drawing.push(point)
  database.ref('drawing').update({
    'd': drawing
  })
}

function mouseReleased(){

}

function drawSketch(data){
  dbDrawing = data.val().d;
}

function showError(){
  console.log("errorOccurred")
}

function clearDrawing(){
  drawing = [];
}