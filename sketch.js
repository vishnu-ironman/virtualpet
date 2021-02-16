var dog,sadDog,happyDog;
var foodObj;
var foodS,foodStock;
var feedTime,lastFed,feed,addFood;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  f = loadImage("f.jpg")
}

function setup() {

  database = firebase.database()
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(f);

   foodObj.display();

   feedTime = database.ref('FeedTime')
   feedTime.on("value",function(data){
     lastFed = data.val();
   })

   fill("cyan");
   textSize(15);

   if(lastFed >= 12){
     text("Last Fed:" + lastFed%12 +"pm",350,30);
   }else if (lastFed === 0){
     text("Last Fed: 12 Am",350,30);
   }else{
     text("Last Fed:"+ lastFed + "am",350,30);
   }



  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}


