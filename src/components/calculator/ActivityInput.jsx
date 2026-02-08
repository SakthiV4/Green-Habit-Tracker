import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Button from '../shared/Button'
import { EMISSION_FACTORS, CarbonAPI } from '../../services/carbonAPI'

const ActivityInput = ({ category, onAddActivity }) => {
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [preview, setPreview] = useState(0)

    // Reset form when category changes
    useEffect(() => {
        const types = Object.keys(EMISSION_FACTORS[category])
        setType(types[0])
        setAmount('')
        setPreview(0)
    }, [category])

    // Update preview
    useEffect(() => {
        if (type && amount) {
            let calc = 0
            if (category === 'transport') calc = CarbonAPI.calculateTransport(type, amount)
            else if (category === 'food') calc = CarbonAPI.calculateFood(type, amount)
            else if (category === 'energy') calc = CarbonAPI.calculateEnergy(type, amount)
            else if (category === 'waste') calc = CarbonAPI.calculateWaste(type, amount)
            else if (category === 'shopping') calc = CarbonAPI.calculateShopping(type, amount)
            setPreview(calc)
        } else {
            setPreview(0)
        }
    }, [type, amount, category])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || amount <= 0) return

        onAddActivity({
            id: Date.now(),
            category,
            type,
            amount: Number(amount),
            co2: preview,
            date: new Date().toISOString()
        })
        setAmount('')
    }

    const getUnit = () => {
        if (category === 'transport') return 'km'
        if (category === 'food') return 'kg' // Simplified for MVP
        if (category === 'energy') return 'units' // kWh etc
        if (category === 'waste') return 'kg'
        if (category === 'shopping') return 'items'
        return 'units'
    }

    // Format type label: car_petrol -> Car Petrol
    const formatLabel = (str) => str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={category} // Re-animate on category change
            onSubmit={handleSubmit}
            className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/50 shadow-sm"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div>
                    <label className="block text-sm font-medium text-neutral-mid mb-2">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-white border border-neutral-light rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-main focus:border-transparent outline-none transition-shadow"
                    >
                        {Object.keys(EMISSION_FACTORS[category] || {}).map((key) => (
                            <option key={key} value={key}>{formatLabel(key)}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-mid mb-2">Amount ({getUnit()})</label>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-white border border-neutral-light rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-main focus:border-transparent outline-none transition-shadow"
                        placeholder="0"
                    />
                </div>

                <div className="flex items-center gap-4">
                    {preview > 0 && (
                        <div className="text-right flex-1">
                            <span className="block text-xs text-neutral-mid">Est. Impact</span>
                            <span className="font-bold text-lg text-primary-deep">{preview} kg CO₂</span>
                        </div>
                    )}

                    <Button type="submit" variant="primary" className="gap-2" disabled={!amount}>
                        <Plus size={18} /> Add
                    </Button>
                </div>
            </div>
        </motion.form>
    )
}

export default ActivityInput
