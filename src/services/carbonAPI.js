export const EMISSION_FACTORS = {
    transport: {
        car_petrol: 0.171,      // kg CO2 per km
        car_diesel: 0.163,
        car_electric: 0.053,
        bus: 0.089,
        train: 0.041,
        bicycle: 0,
        walking: 0,
        flight_short: 0.255,    // per km (< 1500 km)
        flight_long: 0.195,     // per km (> 1500 km)
    },
    food: {
        beef: 27.0,             // kg CO2 per kg
        pork: 12.1,
        chicken: 6.9,
        fish: 6.1,
        cheese: 13.5,
        milk: 1.9,
        eggs: 4.8,
        vegetables: 2.0,
        fruits: 1.1,
        grains: 2.7,
    },
    energy: {
        electricity: 0.233,     // kg CO2 per kWh
        natural_gas: 0.185,
        heating_oil: 0.246,
        coal: 0.341,
        renewable: 0,
    },
    waste: {
        general: 0.52,          // kg CO2 per kg
        recycling: 0.02,
        compost: 0.01,
    },
    shopping: {
        clothes_new: 22.0,      // kg CO2 per item
        clothes_secondhand: 2.0,
        electronics: 150.0,
        furniture: 80.0,
        books: 1.8,
    }
}

export const COUNTRY_AVERAGES = {
    world: 4000,
    usa: 16000,
    uk: 5500,
    india: 1900,
    china: 8000,
    germany: 9000,
}

// Tree absorption: 1 tree absorbs ~21.77 kg CO2/year
export const TREE_ABSORPTION = 21.77

export const CarbonAPI = {
    calculateTransport(type, distance) {
        const factor = EMISSION_FACTORS.transport[type] || 0
        return Number((factor * distance).toFixed(2))
    },

    calculateFood(type, quantity) {
        const factor = EMISSION_FACTORS.food[type] || 0
        return Number((factor * quantity).toFixed(2))
    },

    calculateEnergy(type, consumption) {
        const factor = EMISSION_FACTORS.energy[type] || 0
        return Number((factor * consumption).toFixed(2))
    },

    calculateWaste(type, weight) {
        const factor = EMISSION_FACTORS.waste[type] || 0
        return Number((factor * weight).toFixed(2))
    },

    calculateShopping(type, quantity) {
        const factor = EMISSION_FACTORS.shopping[type] || 0
        return Number((factor * quantity).toFixed(2))
    },

    getAverageFootprint(country = 'world') {
        return COUNTRY_AVERAGES[country.toLowerCase()] || COUNTRY_AVERAGES.world
    },

    calculateTreeEquivalent(co2Amount) {
        return Number((co2Amount / TREE_ABSORPTION).toFixed(1))
    }
}
