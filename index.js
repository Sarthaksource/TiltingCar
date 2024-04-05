const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const carCtx = carCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);

// const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "TILT");

const traffic = [
	new Car(road.getLaneCenter(2), -100, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(1), -900, 30, 50, "DUMMY", 2, getRandomColor()),
	// new Car(road.getLaneCenter(1), -900, 30, 50, "DUMMY", 2, getRandomColor()),
];

animate();

function animate(time)
{
	for(let i=0; i<traffic.length; i++)
	{
		traffic[i].update(road.borders, []);
	}
	carCanvas.height = window.innerHeight;

	car.update(road.borders, traffic);

	carCtx.translate(0, -car.y+carCanvas.height*0.7);

	road.draw(carCtx);

	for(let i=0; i<traffic.length; i++)
	{
		traffic[i].draw(carCtx);
	}

	car.draw(carCtx);

	requestAnimationFrame(animate);
}