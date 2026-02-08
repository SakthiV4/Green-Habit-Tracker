import { useState } from 'react'
import ProductSearch from '../components/alternatives/ProductSearch'
import AlternativeCard from '../components/alternatives/AlternativeCard'
import ProductComparisonModal from '../components/alternatives/ProductComparisonModal'

import BackButton from '../components/shared/BackButton'
import BackgroundGradient from '../components/shared/BackgroundGradient'
import { TamboAI } from '../services/tamboAI'
import { SearchX } from 'lucide-react'

const Alternatives = () => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [lastQuery, setLastQuery] = useState('')

    const handleSearch = async (query) => {
        setIsLoading(true)
        setHasSearched(true)
        setLastQuery(query)

        // Call Tambo AI
        try {
            const alternatives = await TamboAI.generateAlternatives(query)
            setResults(alternatives)
        } catch (error) {
            console.error("Search failed", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <BackgroundGradient />
            <BackButton to="/" />
            <div className="text-center mb-10">
                <h1 className="text-4xl font-display font-bold text-neutral-dark mb-4">Find Sustainable Alternatives</h1>
                <p className="text-neutral-mid max-w-xl mx-auto">
                    Searching for a product? Let our AI suggest eco-friendly swaps that save money and the planet.
                </p>
            </div>

            <ProductSearch onSearch={handleSearch} isLoading={isLoading} />

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((product, idx) => (
                    <AlternativeCard
                        key={idx}
                        product={product}
                        delay={idx * 0.1}
                        onSelect={() => setSelectedProduct(product)}
                    />
                ))}
            </div>

            <ProductComparisonModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
                originalQuery={lastQuery}
            />

            {hasSearched && !isLoading && results.length === 0 && (
                <div className="text-center py-12 text-neutral-mid">
                    <SearchX size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No alternatives found. Try a different search term.</p>
                </div>
            )}
        </div>
    )
}

export default Alternatives
