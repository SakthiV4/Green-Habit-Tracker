import { useState, useEffect } from 'react'
import { MapPin, Search } from 'lucide-react'
import { TamboAI } from '../services/tamboAI'
import BusinessCard from '../components/directory/BusinessCard'
import Button from '../components/shared/Button'

const Directory = () => {
    const [businesses, setBusinesses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    // Mock city list for suggestions
    const commonCities = [
        "New York, USA", "London, UK", "Berlin, Germany",
        "Tokyo, Japan", "Sydney, Australia", "Paris, France",
        "Mumbai, India", "Chennai, India", "Bangalore, India",
        "Toronto, Canada", "San Francisco, USA"
    ]

    const filteredSuggestions = commonCities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
    )

    const handleSearch = async (location) => {
        setIsLoading(true)
        setSearchQuery(location)
        setShowSuggestions(false)
        try {
            // Use AI to generate realistic results for THIS location
            const results = await TamboAI.findLocalBusinesses(location)
            setBusinesses(results)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    // Load initial results (default or could be empty)
    useEffect(() => {
        handleSearch("New York, USA")
    }, [])

    const handleUseLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser')
            return
        }

        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords
            try {
                // OpenStreetMap Nominatim API (Free & High Precision)
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                const data = await res.json()

                // Extract precise location (Village > Town > City > Suburb)
                const address = data.address || {}
                const city = address.village || address.town || address.city || address.suburb || address.county || "Unknown Location"
                const country = address.country || ""
                const fullLocation = `${city}, ${country}`

                handleSearch(fullLocation)
            } catch (error) {
                console.error("Geo Error:", error)
                handleSearch("Chennai, India") // Fallback
            }
        }, () => {
            alert('Unable to retrieve your location')
            setIsLoading(false)
        })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-display font-bold text-neutral-dark mb-4">Green Directory</h1>
                <p className="text-neutral-mid max-w-xl mx-auto mb-8">
                    Support local, eco-friendly businesses near you. Enter your city to find hidden gems.
                </p>

                <div className="max-w-md mx-auto relative z-20">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowSuggestions(true)
                            }}
                            placeholder="Enter your city..."
                            className="w-full py-4 pl-12 pr-12 rounded-2xl border border-neutral-light focus:ring-2 focus:ring-primary-main outline-none shadow-sm"
                        />
                        <Search className="absolute left-4 top-4 text-neutral-mid" size={20} />
                        <button
                            onClick={handleUseLocation}
                            title="Use my location"
                            className="absolute right-2 top-2 bottom-2 p-2 bg-neutral-light/50 hover:bg-neutral-light rounded-xl text-primary-main transition-colors"
                        >
                            <MapPin size={22} className="fill-current" />
                        </button>
                    </div>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-light overflow-hidden">
                            {filteredSuggestions.map((city, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSearch(city)}
                                    className="w-full text-left px-5 py-3 hover:bg-neutral-light/50 transition-colors flex items-center gap-2 text-neutral-dark"
                                >
                                    <MapPin size={16} className="text-primary-main" />
                                    {city}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="w-12 h-12 border-4 border-primary-light border-t-primary-main rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-neutral-mid animate-pulse">Finding eco-friendly spots in {searchQuery}...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {businesses.map((biz, idx) => (
                        <BusinessCard key={idx} business={biz} delay={idx * 0.1} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Directory
