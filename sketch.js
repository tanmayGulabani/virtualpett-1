//Create variables here
var dog, happyDog, database, foodS, foodStock

function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png")
  dog1Image=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);

  dog=createSprite(250,350,10,60);
  dog.addImage(dogImage);
  dog.scale=0.2;

  database=firebase.database();
  var foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  
}


function draw() {  
  background("green");
  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog1Image);
  }
  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage);
  }

  textSize(20)
  fill(225)
  text("Note: Press UP ARROW to feed DRAGO milk ", 50,50);

  drawSprites();

}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



