var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.34;
  ghost.velocityY = 10;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);
  if(gameState === "play") {
  spookySound.play()
    
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("SPACE")) {
    ghost.y = ghost.y-25;
  }
  
  if(keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x+10;
  }
  
  if(keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x-10;
  }

  //text(mouseX+","+mouseY,mouseX,mouseY);
  spawnDoor();
  

   

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end"
  }

  drawSprites();
}

if (gameState === "end"){
  background("black")
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230,250)
}



}

function spawnDoor() {
  if(frameCount%160 === 0) {
    var door = createSprite(Math.round(random(100, 400)), 50, 67, 89)
    var invisibleBlock = createSprite(200,15);
    var climber = createSprite(Math.round(random(100, 400)), 120, 67, 89)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;
    //invisibleBlock.debug = true;



  door.addImage("door",doorImg);
  door.velocityY = 1;
  doorsGroup.add(door);


  climber.addImage("climber",climberImg);
  climber.velocityY = 1;
  invisibleBlock.velocityY = 1;
  invisibleBlock.x = door.x;
  climber.x = door.x;
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);

  door.lifetime = 800;
  climber.lifetime = 800;
  invisibleBlock.lifetime = 800;

  
  }

  
}

