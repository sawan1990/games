var s;
var scl = Math.floor(window.innerWidth/30);
var framerate=15;
var frameincrement=0;
var food;
var frame=0;
var sound;
var death = false
function setup() {
    createCanvas(window.innerWidth-(window.innerWidth%scl), window.innerHeight-(window.innerHeight%scl));
    s = new snake();
    frameRate(framerate);
    pickFoodLocation();
    stroke(200);
     sound = loadSound('media/win.mp3');
}

function draw() {
    background(225);
    fill(51)
    if(s.eat()){
        pickFoodLocation();
    }
    if(!death){
        s.death();
        s.proceed();
    }
    if(!death||frame==0){
        s.draw();   
    }
    s.drawScore();
    frame = (frame+1)%4;
    fill(food.r,food.g,food.b);
    ellipse(food.x+scl/2,food.y+scl/2,scl/2);
    if (mouseIsPressed){
        s.add();
    }
    if (mouseIsPressed && death){
        death = false;
        s.reset();
    }
  
}

function pickFoodLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.r =random(220);
    food.g =random(220);
    food.b =random(220);
    food.mult(scl);
}

function keyPressed() {
    if(death){
        s.reset();
        death = false;
    } else {
        if (keyCode === UP_ARROW) {
            s.dir(0, -1);
        } else if (keyCode === DOWN_ARROW) {
            s.dir(0, 1);
        } else if (keyCode === RIGHT_ARROW) {
            s.dir(1, 0);
        } else if (keyCode === LEFT_ARROW) {
            s.dir(-1, 0);
        }
    }
}
