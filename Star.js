// sets up the Star prototype object 
function Star(context,x,y,r,points,inset,color,rotate) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.r = r;
    this.points = points;
    this.inset = inset;
    this.color = color;
}

// this function sets the fill and stroke color, based on a Star object's properties
Star.prototype.draw = function() {
    this.context.save();
    this.context.fillStyle = this.color;
    this.context.strokeStyle = "black";
    this.drawStar();
    this.context.restore();
}

// draws the star
Star.prototype.drawStar = function() {
    this.context.save();
    this.context.beginPath();
    this.context.translate(this.x, this.y);
    this.context.moveTo(0, 0 - this.r);
    for (var i = 0; i < this.points; ++i) {
        this.context.rotate(Math.PI / this.points);
        this.context.lineTo(0, 0- (this.r * this.inset));
        this.context.rotate(Math.PI / this.points);
        this.context.lineTo(0, 0 - this.r);
    }
    this.context.closePath();
    this.context.fill();
    this.context.stroke()
    ;
    this.context.restore();
}
