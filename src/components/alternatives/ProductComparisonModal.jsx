import { motion, AnimatePresence } from 'framer-motion'
import { X, DollarSign, Leaf, MapPin, ExternalLink, TrendingDown } from 'lucide-react'
import Button from '../shared/Button'

const ProductComparisonModal = ({ isOpen, onClose, product, originalQuery }) => {
    if (!isOpen || !product) return null

    // Use AI-provided estimated prices or fallbacks
    const sustainablePrice = product.sustainablePrice || 5.99
    const conventionalPrice = product.conventionalPrice || 8.49

    const priceDiff = conventionalPrice - sustainablePrice
    const savings = Math.abs(priceDiff).toFixed(2)
    const isCheaper = priceDiff > 0

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-neutral-dark/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] shadow-2xl relative z-10 flex flex-col md:flex-row"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20"
                    >
                        <X size={24} />
                    </button>

                    {/* Left Panel: Comparison & Details */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="inline-block px-3 py-1 bg-primary-light/10 text-primary-main rounded-full text-sm font-bold mb-4">
                            {product.carbonSavings || 'Eco Choice'}
                        </div>
                        <h2 className="text-3xl font-display font-bold text-neutral-dark mb-2">{product.name}</h2>
                        <p className="text-neutral-mid mb-8">{product.description}</p>

                        {/* Price Comparison Block */}
                        <div className="bg-neutral-light/30 rounded-2xl p-6 mb-8 border border-neutral-light">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <DollarSign size={20} className="text-accent-warning" />
                                Price Comparison
                            </h3>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs text-neutral-mid uppercase tracking-wider mb-1">Sustainable</p>
                                    <p className="text-2xl font-bold text-primary-main">${sustainablePrice}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full mb-1 ${isCheaper ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100'}`}>
                                        {isCheaper ? `Save $${savings}` : `Extra $${savings}`}
                                    </span>
                                    <div className="w-full h-1 bg-neutral-light rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-primary-light" />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-neutral-mid uppercase tracking-wider mb-1">Conventional</p>
                                    <p className="text-2xl font-bold text-neutral-mid line-through">${conventionalPrice}</p>
                                </div>
                            </div>
                        </div>

                        {/* Impact Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-primary-light/5 rounded-2xl border border-primary-light/20">
                                <Leaf size={24} className="text-primary-main mb-2" />
                                <p className="text-sm text-neutral-mid">Carbon Saved</p>
                                <p className="text-xl font-bold text-primary-deep">2.5 kg</p>
                            </div>
                            <div className="p-4 bg-accent-info/5 rounded-2xl border border-accent-info/20">
                                <TrendingDown size={24} className="text-accent-info mb-2" />
                                <p className="text-sm text-neutral-mid">Water Saved</p>
                                <p className="text-xl font-bold text-accent-info">140 L</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Embedded Map */}
                    <div className="flex-1 bg-neutral-light relative min-h-[400px] md:min-h-auto">
                        <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(product.name + ' near me')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            title="Store Map"
                        ></iframe>
                        <div className="absolute bottom-6 left-6 right-6">
                            <a
                                href={`https://www.google.com/maps/search/${encodeURIComponent(product.name)}+near+me`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full shadow-lg gap-2">
                                    Open in Google Maps <ExternalLink size={18} />
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default ProductComparisonModal
