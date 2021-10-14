var happydogImg, dogImg,dog
var database;
var feedtimeRef
var lastFed
var foodS, foodStock;
var feedfood,addfood;
var foodObj;
function preload()
{
	dogImg= loadImage("dogImg.png")
  happydogImg= loadImage("dogImg1.png")
  //milk=loadImage("Milk.png")
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 400);

  foodObj=new Food()

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  dog= createSprite(800,230,30,30)
  dog.addImage(dogImg)
  dog.scale=1.5
  
  feedfood = createButton('Feed the Dog');
  feedfood.mousePressed(feedDog)
  feedfood.position(400,75)

  addfood= createButton('Add Food');
  addfood.mousePressed(addFoods);
  addfood.position(500,75)

  
 
}


function draw() {  
background(46,139,87)
foodObj.display()
 
  feedtimeRef=database.ref('FeedTime')
  feedtimeRef.on("value",function(data){
    lastFed=data.val()
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30)
  }
  else if (lastFed==0){
    text("Last Feed :12 AM",350,30)
  }
  else{
    text("Last Feed : "+ lastFed+ "AM",350,30)
  }
  drawSprites()
}

function readStock(data){
foodS= data.val()
foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(happydogImg);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
  Food:foodS
  })
}