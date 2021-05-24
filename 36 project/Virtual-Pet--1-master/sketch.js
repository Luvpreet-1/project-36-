var dog,dogImg, activeDogImg, database, foods, foodStock;
var feed, addFood;
var  fedTIME, lastFed;
var foodObj

function preload() {

  dogImg = loadImg("images/activeDogImg.png");
  activeDog = loadImg("images/dogImg.png");

}

function setup () {

  database = firebase.database ();
  createCavas(1000,500);

  foodObj = new foodObj();

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg)
  dog.scale = 0.15

  feed = createButton("Feed the hungry dog")
  feed.position(700,95);
  feed.mousePessed(feedDog);

addFood = createButton("ADD Food");
addFood.position(800,95);
addFood.mousePessed(addFood);


}

function draw () {
  background(46,139,87);

fedTime = database.ref("FeedTime");
fedTime.on("value",function(data) {
  lastFed = data.val();

})

fill(255);
textSize(20);
if(lastFed >= 12) {
  text("LasFeed : " + lastFed % 12 +"PM",350,30);
}else if (lastFed == 0) {
  text("Last Feed : 12 AM",350,30);
}

foodObj.display();
drawSprites();

}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(activeDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({ 
  Food: foodObj.getFoodStock(),
  FeedTime: hour()
  })
}

function addFoods() {
  foods ++;
  database.ref('/').update({
  Foods: foodS

  })
}
