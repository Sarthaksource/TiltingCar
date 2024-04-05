class Controls{
	constructor(type)
	{
		this.forward = false;
		this.left = false;
		this.right = false;
		this.reverse = false;

		this.tiltLeft = false;
		this.tiltRight = false;

		switch(type)
		{
		case "KEYS":
			this.#keyboardListener();
			break;
		case "DUMMY":
			this.forward = true;
			break;
		case "TILT":
			this.forward = true;
			this.#tiltCar();
			break;
		}
	}

	#keyboardListener()
	{
		document.onkeydown = (event)=>{
			switch(event.key){
			case "ArrowLeft":
				this.left = true;
				break;
			case "ArrowRight":
				this.right = true;
				break;
			case "ArrowUp":
				this.forward = true;
				break;
			case "ArrowDown":
				this.reverse = true;
				break;
			}
			// console.table(this);
		}

		document.onkeyup = (event)=>{
			switch(event.key){
			case "ArrowLeft":
				this.left = false;
				break;
			case "ArrowRight":
				this.right = false;
				break;
			case "ArrowUp":
				this.forward = false;
				break;
			case "ArrowDown":
				this.reverse = false;
				break;
			}
			// console.table(this);
		}
	}

	#tiltCar() {
		window.addEventListener("deviceorientation", (event) => {
			let dir = event.alpha;
			let tiltFB = event.beta;
			let tiltLR = event.gamma;

			document.getElementById('alpha').textContent = Math.ceil(dir);
			document.getElementById('beta').textContent = Math.ceil(tiltFB);
			document.getElementById('gamma').textContent = Math.ceil(tiltLR);

			if (tiltFB >= 20 && tiltFB <= 100) {
				if (tiltLR > 0){
					console.log("Right");
					this.tiltRight = true;
					this.tiltLeft = false;
				}
				else if (tiltLR < 0) {
					console.log("Left");
					this.tiltLeft = true;
					this.tiltRight = false;
				}
				else {
					this.tiltLeft = false;
					this.tiltRight = false;
				}
			}
		});
	}
}
