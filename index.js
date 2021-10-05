
function App() {
    var canvas;
    var context;

    var spaceships = [];

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        spaceships.forEach(ship => ship.update());
        spaceships.forEach(ship => ship.draw());
        context.restore();

        window.requestAnimationFrame(draw);
    }

    canvas = document.getElementById('space');
    context = canvas.getContext('2d');

    var spaceship1 = new Spaceship(context, 200, 300);
    // var spaceship2 = new Spaceship(context, 400, 200);

    spaceships.push(spaceship1);
    // spaceships.push(spaceship2);

    draw();
}

window.onload = App;