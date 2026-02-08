import { motion } from 'framer-motion'
import { Leaf, DollarSign, ExternalLink } from 'lucide-react'
import Button from '../shared/Button'

const AlternativeCard = ({ product, delay, onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-3xl overflow-hidden border border-neutral-light hover:shadow-xl transition-all duration-300 group"
        >
            <div className="h-48 bg-neutral-light/30 relative overflow-hidden">
                {/* Placeholder for product image */}
                <div className="absolute inset-0 flex items-center justify-center text-neutral-mid/30">
                    <Leaf size={64} />
                </div>
                <div className="absolute top-4 right-4 bg-primary-main text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.carbonSavings || 'Eco Choice'}
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary-main transition-colors">
                    {product.name}
                </h3>
                <p className="text-neutral-mid text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-neutral-dark font-medium">
                        <DollarSign size={16} className="text-accent-warning" />
                        <span>{product.priceRange || '$$'}</span>
                    </div>
                    <div className="text-xs text-primary-deep bg-primary-light/20 px-2 py-1 rounded-md">
                        Reduced Impact
                    </div>
                </div>

                <Button
                    onClick={onSelect}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 group-hover:bg-primary-main group-hover:text-white group-hover:border-primary-main"
                >
                    Compare Price & Find <ExternalLink size={16} />
                </Button>
            </div>
        </motion.div>
    )
}

export default AlternativeCard
