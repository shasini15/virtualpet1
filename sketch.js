var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var database
var feed,fedTime,lastFed;

//create feed and lastFed variable here
var feed , lastfed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog); 

  addfood=createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFood)
  
      
  }
  



function draw() {
  background("green");
  foodObj.display();

  //write code to read fedtime value from the database 
   fedTime = database.ref('FeedTime')
   fedTime.on("value",function(data){
     lastFed = data.val();

   })
     //write code to display text lastFed time here
     fill("black")
     textSize(15);
     if(lastFed>=12){
       text("last fed :"+lastFed %12+"PM",350,30 )
     }
     else if(lastFed==0){
     text("Last Fed:12AM",350,30)
     }else{
       text("Last Fed:"+lastFed+"AM",350,30)
     }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods);
}




  //write code here to update food stock and last fed time
 
 function feedDog(){
 dog.addImage(happyDog);

 
 var food_stock_val = foodObj.getFoodStock();
 if(food_stock_val<= 0){
foodObj.updateFoodStock(food_stock_val *0)
 }else{
  foodObj.updateFoodStock(food_stock_val -1)
 }
 }

  

//function to add food in stock
function addFood(){
 foodS++;
  database.ref('/').update({
  food:foodS
  })
}

