import { motion } from 'framer-motion'
import { Lightbulb, Leaf, ShoppingBag, Zap } from 'lucide-react'

const suggestions = [
    { icon: Leaf, text: "How can I reduce plastic usage?", color: "bg-green-100 text-green-700" },
    { icon: ShoppingBag, text: "Eco-friendly clothing brands?", color: "bg-blue-100 text-blue-700" },
    { icon: Zap, text: "Tips to save energy at home", color: "bg-yellow-100 text-yellow-700" },
    { icon: Lightbulb, text: "What is a carbon footprint?", color: "bg-purple-100 text-purple-700" },
]

const SuggestionCards = ({ onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {suggestions.map((item, index) => (
                <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelect(item.text)}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-primary-light hover:shadow-lg transition-all text-left bg-white`}
                >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                        <item.icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-neutral-dark">{item.text}</span>
                </motion.button>
            ))}
        </div>
    )
}

export default SuggestionCards
