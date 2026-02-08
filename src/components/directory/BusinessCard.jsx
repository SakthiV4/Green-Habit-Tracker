import { motion } from 'framer-motion'
import { Star, MapPin, Leaf } from 'lucide-react'
import Button from '../shared/Button'

const BusinessCard = ({ business, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
            <div className="h-48 relative overflow-hidden">
                <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
                    <Star size={14} className="text-accent-warning fill-accent-warning" />
                    {business.rating}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider bg-primary-main/80 px-2 py-0.5 rounded-full mb-2 inline-block">
                        {business.category}
                    </span>
                    <h3 className="font-display font-bold text-xl">{business.name}</h3>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1 text-neutral-mid text-sm">
                        <MapPin size={16} />
                        {business.distance}
                    </div>
                    <div className="flex items-center gap-1 text-primary-deep font-bold text-sm">
                        <Leaf size={16} />
                        Score: {business.ecoScore}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {business.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-neutral-light text-neutral-dark px-2 py-1 rounded-md">
                            {feature}
                        </span>
                    ))}
                </div>

                <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(business.name + ' ' + (business.address || ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                >
                    <Button variant="outline" className="w-full">Get Directions</Button>
                </a>
            </div>
        </motion.div>
    )
}

export default BusinessCard
