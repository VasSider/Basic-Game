function player() {


  
 var options = {
    friction: 0.5,
    restitution: 0.1,
    //frictionAir: 0.
    density: 0.01,
    collisionFilter: {group: -1}
}
this.body=Body.circle ( (main_x+w)/2,(main_y+h)/3, 30, options);
//Body_main.setMass(this.body,19.5);
World.add(world, this.body)


this.right = function() {

 var pos = {
     x:this.body.position.x, y:this.body.position.y - 40
}
  var right_force = {
   x: 0.02, y:this.body.force.y
  }
  if (this.body.speed < 6 ) 
  Body_main.applyForce(this.body, pos, right_force);
}

this.left = function() {
  
  
var pos = {
     x:this.body.position.x, y:this.body.position.y - 40
}
  var left_force = {
   x: -0.02, y:this.body.force.y
  }
  if (this.body.speed < 6 ) 
  Body_main.applyForce(this.body, pos, left_force);
  
}


this.jump = function() {
  
  var pos = {
     x:this.body.position.x, y:this.body.position.y
}
  var force1 = {
   x:0, y:- 0.9
  }
  console.log(this.body.mass);
  Body_main.applyForce(this.body, pos, force1);
  
} 


this.show = function() {
    var angle = this.body.angle;
    var r= this.body.circleRadius;
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    //rectMode(CENTER);
    //strokeWeight(1);
    //stroke(255);
    //fill(0);
    //image(mlkia, 0, 0, round(width/5.5),  );
    image(pl,0 , 0, 60, 60);
    //ellipse(0, 0, r*2);
    //line(0, 0, 1, 0);
    
  }

}