export const LocationService = {
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'))
                return
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    reject(error)
                }
            )
        })
    },

    // Mock function to "find" businesses
    async findNearbyBusinesses(lat, lng) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))

        return [
            {
                id: 1,
                name: "Green Earth Grocery",
                category: "Grocery",
                rating: 4.8,
                distance: "0.8 km",
                ecoScore: 95,
                features: ["Zero Waste", "Organic", "Plastic Free"],
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 2,
                name: "EcoStyle Boutique",
                category: "Shopping",
                rating: 4.5,
                distance: "1.2 km",
                ecoScore: 88,
                features: ["Sustainable Materials", "Fair Trade"],
                image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 3,
                name: "Farm to Table Cafe",
                category: "Food",
                rating: 4.9,
                distance: "2.5 km",
                ecoScore: 92,
                features: ["Local Sourcing", "Composting", "Vegan Options"],
                image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60"
            }
        ]
    }
}
