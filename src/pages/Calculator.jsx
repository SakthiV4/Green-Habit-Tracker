import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CategorySelector from '../components/calculator/CategorySelector'
import ActivityInput from '../components/calculator/ActivityInput'
import ResultsDisplay from '../components/calculator/ResultsDisplay'
import Button from '../components/shared/Button'
import BackButton from '../components/shared/BackButton'
import BackgroundGradient from '../components/shared/BackgroundGradient'
import { Trash2 } from 'lucide-react'

const Calculator = () => {
    const [activeCategory, setActiveCategory] = useState('transport')
    const [activities, setActivities] = useState([])
    const [totalCO2, setTotalCO2] = useState(0)

    // Load from local storage on mount (Phase 8 logic integrated early for usability)
    useEffect(() => {
        const saved = localStorage.getItem('activities')
        if (saved) {
            setActivities(JSON.parse(saved))
        }
    }, [])

    // Update total and save
    useEffect(() => {
        const total = activities.reduce((sum, item) => sum + item.co2, 0)
        setTotalCO2(total)
        localStorage.setItem('activities', JSON.stringify(activities))
        localStorage.setItem('totalCarbon', total.toFixed(1))
    }, [activities])

    const handleAddActivity = (activity) => {
        setActivities(prev => [activity, ...prev])
    }

    const handleDelete = (id) => {
        setActivities(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <BackgroundGradient />
            <BackButton to="/" />
            <div className="text-center mb-10">
                <h1 className="text-4xl font-display font-bold mb-4 text-neutral-dark">Carbon Calculator</h1>
                <p className="text-neutral-mid">Track your daily activities to understand your environmental impact.</p>
            </div>

            <CategorySelector activeCategory={activeCategory} onSelect={setActiveCategory} />

            <ActivityInput category={activeCategory} onAddActivity={handleAddActivity} />

            <ResultsDisplay activities={activities} totalCO2={totalCO2} />

            {/* Recent Activity List */}
            {activities.length > 0 && (
                <div className="mt-16">
                    <h3 className="font-bold text-xl mb-6">Recent Activity</h3>
                    <div className="space-y-3">
                        {activities.slice(0, 5).map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-neutral-light"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-12 rounded-full ${item.category === 'transport' ? 'bg-blue-500' :
                                        item.category === 'food' ? 'bg-green-500' :
                                            item.category === 'energy' ? 'bg-orange-500' :
                                                item.category === 'waste' ? 'bg-teal-500' : 'bg-amber-500'
                                        }`} />
                                    <div>
                                        <h4 className="font-bold capitalize">{item.type.replace(/_/g, ' ')}</h4>
                                        <p className="text-sm text-neutral-mid capitalize">{item.category} • {item.amount}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-primary-deep">{item.co2} kg</span>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-neutral-mid hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Calculator
