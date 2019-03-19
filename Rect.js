function Rect(x_pos, y_pos, x, y, options, box_image ) {
 
   
  this.body = Body.rectangle(x_pos, y_pos, x, y,options );
  World.add(world, this.body);

  this.isOffScreen = function() {
    
    return (this.body.position > height + 100);
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
}

this.show = function() {
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    imageMode(CENTER);
    strokeWeight(1);
    stroke(255);
    image(box_image, 0, 0, x, y);
    //fill(0);
    //rect(0, 0, x, y);
    pop();
  }

}