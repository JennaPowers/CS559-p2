// sets up the Spaceship prototype object
function Spaceship(context, x, y) {
    this.width = 100;
    this.height = 200;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.rightShooter = 0;
    this.leftShooter = 0;
    this.context = context;

    this.beginningYPos = y;
}
/* this function draws each part of the spaceship, while performing various context
translations, rotations, and scales */
Spaceship.prototype.draw = function() {

    this.context.save();

    /* context repeatedly translates in the negative y direction to 
    mimic a spaceship shooting off */
    this.context.translate(this.x, this.y);

    // sets the fill and stroke color for the spaceship body, and draws it
    this.context.fillStyle = "#7164b0";
    this.context.strokeStyle = "#7164b0";

    this.drawRocketBody();

    /* context saves, sets the fill and stroke color for the spaceship flames, 
    draws it, then context restores */
    this.context.save();
    this.context.fillStyle = "#fcae47";
    this.context.strokeStyle = "#d65b36";
    this.context.save();
    this.context.translate(0, this.height * 0.5);
    this.drawFlames();
    this.context.restore();
   
    /* context saves, sets the fill color for the spaceship head, draws it, then 
    context restores */
    this.context.save();
    this.context.fillStyle = "#abb2d6";
    this.context.translate(0, this.height * -0.5);
    this.drawRocketHead();
    this.context.restore();

    /* context saves, sets the fill color for the spaceship wings, draws the opposite 
    facing wings, then context restores */
    this.context.save();
    this.context.fillStyle = "#253069";
    this.context.translate(this.width * -0.5, this.height * 0.5);
    this.drawWing();
    this.context.translate(this.width, 0);
    this.context.scale(-1,1);
    this.drawWing();
    this.context.restore();

    /* context saves, sets the fill and stroke colors for the rotating shooter objects, 
    draws them, then context restores */
    this.context.save();
    this.context.fillStyle = "#7dd1c9";
    this.context.strokeStyle = "black";
    this.context.translate(this.width * -0.5 -50, this.height * 0.5);
    this.context.rotate(this.rightShooter);
    this.drawShooter();
    this.context.restore();

    // same as above but rotates the shooter in an opposite direction
    this.context.save();
    this.context.fillStyle = "#906eba";
    this.context.strokeStyle = "black";
    this.context.translate(this.width * -0.5 -50, this.height * 0.5);
    this.context.rotate(-this.leftShooter);
    this.drawShooter();
    this.context.restore();

    // same as above but rotates the shooter in an opposite direction
    this.context.save();
    this.context.fillStyle = "#7dd1c9";
    this.context.strokeStyle = "black";
    this.context.translate(this.width * 0.5 + 50, this.height * 0.5);
    this.context.rotate(-this.rightShooter);
    this.drawShooter();
    this.context.restore();

    // same as above but rotates the shooter in an opposite direction
    this.context.save();
    this.context.fillStyle = "#906eba";
    this.context.strokeStyle = "black";
    this.context.translate(this.width * 0.5 + 50, this.height * 0.5);
    this.context.rotate(this.leftShooter);
    this.drawShooter();
    this.context.restore();

    this.context.restore();
}

// The spaceship shooter object is formed by calling drawBlade() twice
Spaceship.prototype.drawShooter = function() {
    this.context.save();
    this.drawBlade();
    this.context.translate(-100, 0);
    this.context.scale(-1,-1);
    this.drawBlade();
    this.context.restore();
}

// draws the individual "blade" of the longer shooter object 
Spaceship.prototype.drawBlade = function() {
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.bezierCurveTo(10,30, 13,60, 30,40);
    this.context.bezierCurveTo(-5,20, -10,0, -50,0);
    this.context.fill();
    this.context.stroke();
}

// draws the triangle shaped wings attached to the spaceship body
Spaceship.prototype.drawWing = function() {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.lineTo(-50, 0);
    this.context.lineTo(0, -40);
    this.context.lineTo(0, 0);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
}

// draws the circles on the spaceship body (no purpose other than design)
Spaceship.prototype.drawCircle = function() {
    this.context.save();
    this.context.beginPath();
    this.context.arc(0, 0, 22, 0, 2 * Math.PI);
    this.context.fillStyle = "#c8eef7";
    this.context.lineWidth = 3;
    this.context.strokeStyle = "white";
    this.context.fill();
    this.context.stroke();
    this.context.restore();
}

// draws the body of the spaceship
Spaceship.prototype.drawRocketBody = function() {
    this.context.save();
    this.context.rect(this.width * -0.5, this.height * -0.5, this.width, this.height);
    this.context.fill();
    this.context.stroke();

    this.context.translate(0,40);
    this.drawCircle();
    this.context.translate(0,-80);
    this.drawCircle();

    this.context.restore();
}

// draws the spaceship head
Spaceship.prototype.drawRocketHead = function() {
    this.context.save();
    this.context.beginPath();
    this.context.arc(0, 0, this.width * 0.5, Math.PI, 0);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
}

/* draws the spaceships's flames which appear animated by calling Math.random() 
to determine length of the flame on every frame redraw */
Spaceship.prototype.drawFlames = function() {
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(this.width * -0.5,0);
    this.context.lineTo(this.width * 0.5, 0);
    this.context.lineTo(0, Math.random() * 10 + 60);
    this.context.lineTo(this.width * -0.5, 0);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
    this.context.restore();
}

/* this function updates the state of the spaceship's y-position and the context's 
rotation angle; it is called before every canvas redraw */
Spaceship.prototype.update = function() {
    this.leftShooter += 0.1;
    this.rightShooter += 0.1;
    this.y -= 3;

    if (this.y <= -200) {
        this.y = this.beginningYPos;
    }
}