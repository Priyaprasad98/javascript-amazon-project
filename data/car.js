class Car {
  #brand;
  #model;
  #speed = 0;
  isOpenTrunk = false;

  constructor(carDetail) {
    this.#brand = carDetail.brand;
    this.#model = carDetail.model;
  }

  displayInfo() {
    const trunkStatus = this.isOpenTrunk ? "open" : "closed";
    console.log(`${this.#brand} ${this.#model}  ${this.#speed} ${trunkStatus}`);
  }

  go() {
    if (!this.isOpenTrunk) {
      this.#speed += 5;
    }

    // Limit the speed to 200.
    if (this.#speed > 200) {
      this.#speed = 200;
    }
  }

  brake() {
    this.#speed -= 5;

    // Limit the speed to 0.
    if (this.#speed < 0) {
      this.#speed = 0;
    }
  }

  openTrunk() {
    if (this.#speed === 0) {
      this.isOpenTrunk = true;
    }
  }

  closeTrunk() {
    this.isOpenTrunk = false;
  }
}
let obj1 = new Car({ brand: "Toyoto", model: "Corolla" });

// obj1.go();
// obj1.brake();
// obj1.brake();
// obj1.openTrunk();
// obj1.go();
// obj1.displayInfo();

let obj2 = new Car({ brand: "Tesla", model: "Model 3" });
//console.log(obj1);

class RaceCar extends Car {
  acceleration;

  constructor(carDetail) {
    super(carDetail);
    this.acceleration = carDetail.acceleration;
  }

  go() {
    this.#speed += this.acceleration;

    // Limit the speed to 200.
    if (this.speed > 300) {
      this.speed = 300;
    }
  }
  openTrunk() {
    console.log("Race cars do not have a trunk.");
  }

  closeTrunk() {
    console.log("Race cars do not have a trunk.");
  }
}

let raceCarObj = new RaceCar({ brand: "McLaren", model: "F1", acceleration: 20 });
raceCarObj.go();
//raceCarObj.closeTrunk();
//raceCarObj.openTrunk();
raceCarObj.displayInfo();
