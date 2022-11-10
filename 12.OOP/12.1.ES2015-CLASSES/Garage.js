class Garage {

    constructor(capacity = 0) {
        this.capacity = capacity
        this.vehicles = []
    }

    add(vehicle) {
        if(!(vehicle instanceof Vehicle)) {
            return 'Only vehicles are allowed in here!'
        }

        if(this.vehicles.length === this.capacity) {
            return `Sorry, we're full.`
        }

        this.vehicles.push(vehicle)  
        
        return 'Vehicle added!'
    }
}