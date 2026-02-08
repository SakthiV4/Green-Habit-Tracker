import { motion } from 'framer-motion'
import { Car, Utensils, Zap, Trash2, ShoppingBag } from 'lucide-react'

const categories = [
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'waste', label: 'Waste', icon: Trash2 },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
]

const CategorySelector = ({ activeCategory, onSelect }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === cat.id
                            ? 'text-white shadow-lg scale-105'
                            : 'bg-white text-neutral-mid hover:bg-neutral-light'
                        }`}
                >
                    {activeCategory === cat.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary-main rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        <cat.icon size={18} />
                        <span className="font-medium">{cat.label}</span>
                    </span>
                </button>
            ))}
        </div>
    )
}

export default CategorySelector
