var Engine=Matter.Engine;
var World=Matter.World;
var Runner=Matter.Runner;
var Body=Matter.Bodies;
var Body_main=Matter.Body;
var boxes=[];
var world;  
var engine;
var ground;
var Player;
var box_options;
var box_static_options;
var collision_detector_jump;
var collision_detector_lose;

var touch = false;
var rotateDirection;



var w; //aspect ratio 3:2
var h;
var main_x;
var main_y;


function preload() {
 jump_sound=loadSound('jump.mp3');
 jump_sound.setVolume(0.1);
 hit_wood_sound=loadSound('hit_wood.mp3');
 hit_wood_sound.setVolume(0.3);
 hit_static_sound=loadSound('hit_static.mp3');
 hit_static_sound.setVolume(0.3);
 hit_pipe_sound=loadSound('hit_pipe.mp3');
 hit_pipe_sound.setVolume(0.3);
}





function setup () {
  var density=displayDensity();
  pixelDensity(density);
 
 //640,320
 w=windowHeight*3/2;
 h=windowHeight;
 
  var canvas = createCanvas(windowWidth, windowHeight);
  main_x = (windowWidth - w) / 2;
  main_y = (windowHeight - h) / 2;
  //canvas.position(x, y);
  background(135, 73, 255);
  
  
  
  engine=Engine.create();
  world=engine.world;
  bg = loadImage("bg.png");
  wood=loadImage("wood.jpg");
  pl=loadImage("gear.svg");    
  static_box_image=loadImage("static_box_image.jpg");
  pipe=loadImage("pipe.svg");

  
  //runner = Runner.create();
  //Runner.run(runner, engine);

  var opt_ground = {
    isStatic : true, 
    friction :   0.5, 
    frictionStatic: 1, 
    restitution : 0.4, 
    collisionFilter: { category: 0x0001, mask:0x1}
}   
  box_options = {
    friction: 0.3,
    restitution: 0.4,
    collisionFilter: {category: 0x0002, mask:0x1}
                  }
                   
  box_static_options = {
    friction: 0.5, 
    restitution: 0.3,
    density : 0.005,
       collisionFilter : { category: 0x0001, mask:0x1} 
                }




ground=Body.rectangle(main_x+w/2, main_y+h, w, h/7, opt_ground);
wall1=Body.rectangle(main_x, main_y+h / 2, 1, h, opt_ground);
wall2=Body.rectangle(main_x+w, main_y+h/2, 1, h, opt_ground);


Player = new player();
World.add(world, ground);
World.add(world, wall1);
World.add(world, wall2);
//Engine.run(engine);

collision_detector_lose=false;
}


function draw() {
  background(135, 73, 255);
  imageMode(CORNER);
  if (deviceOrientation != 'portrait') { 
  if (focused) {    
  image(bg,main_x , main_y, w, h); 
  var x_positioning =  round(random(main_x+30,main_x+w-30));
  var y_positioning = main_y+100;
  var box_width = 100;
  var box_height = 100;
  var pipe_width = 25;
  var pipe_height = 70;
  
  
  var box_static_width = 70;
  var box_static_height = 70;
  
  collision_detector_jump=false;
  
  
  
  
    Engine.update(engine);
    
   

   var i=0;
  if (( frameCount % 60==0) && (collision_detector_lose==false)){
    if (frameCount % 300==0) {
    boxes.push(new Rect(x_positioning, y_positioning, box_static_width, box_static_height, box_static_options, static_box_image));
      
  } else if (round(random(1,6))==5) {
   
    boxes.push(new Rect(x_positioning, y_positioning, pipe_width, pipe_height, box_options, pipe )); } else
    
    boxes.push(new Rect(x_positioning, y_positioning, box_width, box_height, box_options, wood ));
   
  }
  

  for (var i=0; i < boxes.length; i++) {
    boxes[i].show();
    
    if ((Matter.SAT.collides(boxes[i].body, Player.body).collided==true) && ((Player.body.position.y + 28) < (boxes[i].body.position.y - 35)) && (collision_detector_lose==false))  {
       collision_detector_jump=true; } 
   if ((Matter.SAT.collides(boxes[i].body, Player.body).collided==true) && ((Player.body.position.y - 20) > (boxes[i].body.position.y + 35)) && (collision_detector_lose==false)) {  
       collision_detector_lose=true;
       
       
     if (boxes[i].body.area == box_static_width*box_static_height) { 
        hit_static_sound.play();  } else 
     if  (boxes[i].body.area == box_width*box_height) {        
        hit_wood_sound.play(); } else 
        hit_pipe_sound.play();
       }
  
       
       

    if (boxes[i].isOffScreen()) {  
      boxes[i].removeFromWorld();
      boxes.splice(i, 1);
      i--;
    }
         
  }

    Player.show();
   
    
   
    if (radians(rotationY) > 0) {
      rotateDirection = 'clockwise' }  
    else if (radians(rotationY) < 0) {
      rotateDirection = 'counter-clockwise' }
    
    
   if (collision_detector_lose==false) { 
  if ((keyIsDown(RIGHT_ARROW)) || (rotateDirection == 'clockwise')) 
    Player.right();
    
  if ((keyIsDown(LEFT_ARROW))  || (rotateDirection == 'counter-clockwise')) 
    Player.left();
      
   if (((keyIsDown(32)) || (touch == true)) && ((collision_detector_jump==true) || (Matter.SAT.collides(ground, Player.body).collided==true))) {    
    jump_sound.play();
    Player.jump();
    touch = false;
     }
   } 
    
    if (collision_detector_lose==true) {
     
      
     if (round(Player.body.speed)==0)  {
      blendMode(MULTIPLY);    
      
       
      
 }

}

  } //else//portrait image

  } //else //pause menu 

}

function touchStarted() {
  touch = true;
}
  
  

 