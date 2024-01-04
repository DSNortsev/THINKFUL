const Queue = require("../queue/queue");

/**
 * Implement a Parking Lot.
 *
 */
class ParkingLot {
  constructor(capacity, rate) {
    this.spaces = new Array(capacity).fill("vacant");
    this.rate = rate;
    this.revenue = 0;
    this.queue = new Queue();
  }

  /**
   * Returns the number of vacant parking spaces
   * @returns {Number}
   *  the total number of spaces where the value is "vacant".
   */

  get vacantSpaces() {
    return this.spaces.reduce(
      (sum, space, index) => sum + (space === "vacant" ? 1 : 0),
      0
    );
  }

  /**
   * As cars enter the parking lot, the license plate number is entered and the car is parked in the first vacant space.
   * If the lot is full, the car is added to the queue to be parked when a spot is available.
   *
   * @param licensePlateNumber
   *  the license plate number of the car entering
   */
  enter(licensePlateNumber) {
    if (this.vacantSpaces > 0) {
      const vacantSpacesIndex = this.spaces.findIndex((space) => space === 'vacant');
      this.spaces[vacantSpacesIndex] = licensePlateNumber;
    } else {
      this.queue.enqueue(licensePlateNumber);
    }
  }

  /**
   * As a car leaves the parking lot, or the queue, the leave method is called with the license plate number of the car leaving.
   * @param licensePlateNumber
   *    *  the license plate number of the car leaving.
   */
  leave(licensePlateNumber) {
    const spaceIndex = this.spaces.findIndex((space) => space === licensePlateNumber);
    
    if (spaceIndex !== -1) {
      // Collect the parking fee and update revenue
      this.revenue += this.rate;
      this.spaces[spaceIndex] = 'vacant';
      
      // If the queue is not empty, park a car from the queue
      if (!this.queue.isEmpty()){
        this.spaces[spaceIndex] = this.queue.dequeue();
      }
    } else if (!this.queue.isEmpty()) {
      // If the car is not in the parking spaces but is in the queue, dequeue it
      if (this.queue.peek() === licensePlateNumber) {
        this.queue.dequeue();
      } else {
        const updatedQueue = new Queue();
        while (!this.queue.isEmpty()){
          const poppedLicense = this.queue.dequeue();
          if (poppedLicense !== licensePlateNumber){
            updatedQueue.enqueue(poppedLicense);
          }
        }
        this.queue = updatedQueue;
      }
    }
  }

  /**
   * Lists each space in the parking lot along with the license plate number of the car parked there, or
   * "vacant" as the license plate if the spot is vacant.
   * @returns {{licensePlateNumber: string, space: Number}[]}
   */
  get occupants() {
    return this.spaces.map((licensePlateNumber, index) => ({
      space: index + 1,
      licensePlateNumber,
    }));
  }

  /**
   * The total cumulative revenue for the parking lot. The parking rate is paid when the car leaves, it does not matter how long the car stays in the spot.
   * @returns {number}
   *  the total revenue for the parking lot.
   */
  get totalRevenue() {
    return this.revenue;
  }
}

module.exports = ParkingLot;
