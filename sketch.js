//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var foodObj;
var btnFeed,btnAddfeed;
var fedTime,lastFed;
var milk;


function preload()
{
  //load images here
  dogImg=loadImage("Images/dogImg.png");
  dogImg1=loadImage("Images/dogImg1.png")
  milk=loadImage("Images/milk.png")
}

function setup() {
  database=firebase.database();
  createCanvas(800, 500);
  dog=createSprite(400,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

  btnFeed=createButton("FEED THE DOG");
  btnFeed.position(400,100);
  btnFeed.mousePressed(feedDog);
  
  btnAddfeed=createButton("ADD FOOD");
  btnAddfeed.position(600,100);
  btnAddfeed.mousePressed(addFood);
}


function draw() {  
background(46,139,87);

if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogImg1);
}

  drawSprites();
  database.ref("lastFed").on("value",(data)=>{
    lastFed=data.val();
  })
  fill(255);
  textSize(15);
  if(lastFed>=12){
    text("LAST FED: "+lastFed%12+"PM",350,30)
  }else if(lastFed===0){
    text("LAST FED: 12 AM",350,30);
  }else{
    text("LAST FED: "+lastFed+"AM",350,30);
  }
  display()
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaning : "+ foodS,400,200);
  textSize(13);
  text("NOTE-press UP_ARROW Key to feed the dog")

}

function readStock(data){
  foodS=data.val();
  console.log(foodS);
}

//function writeStock(x){
  //if(x<=0){
   // x=0
  //}else{
   // x=x-1;
  //}
  //console.log(x)
  //database.ref('/').set({
   // Food:x
 // })
//}
function feedDog(){
  dog.addImage(dogImg1);
  if(foodS>0){
    database.ref("/").update({
      Food:foodS-1,
      lastFed:hour(),
    })
  }
  
}

function addFood(){
  if(foodS<30){
    database.ref("/").update({
      Food:foodS+1
    })
  }
  
}

function display(){
  var x = 80,y=100;
 imageMode(CENTER);
 if(foodS!=0){
   for (var i=0;i<foodS;i++){
     if(i%10===0){
       x=80;
       y+=50
     }
     image(milk,x,y,50,50);
     x+=30
   }
 }
}


