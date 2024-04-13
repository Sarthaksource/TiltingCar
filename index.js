const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const carCtx = carCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);

// const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "TILT");

let yPosition = -100;


const traffic=[];
function addRandomTraffic(distance){
	const cantCars=Math.floor(Math.random()*3);
	for(let i=0;i<cantCars;i++){
		const lane=Math.floor(Math.random()*3);
		traffic.push(new Car(road.getLaneCenter(lane), -(car.y*-1+distance), 30, 50,"DUMMY",2,getRandomColor()));
	}
}
addRandomTraffic(300);

function deleteOldTraffic(){
	for(let i=0;i<traffic.length;i++){
		if(car.y < traffic[i].y-300){
			traffic.splice(i,1);
		}
	}
}

animate();

function animate(time)
{
	deleteOldTraffic();

	if(parseInt(car.y)%(100*Car.getMaxSpeedValue()) == 0)
		addRandomTraffic(800);

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
