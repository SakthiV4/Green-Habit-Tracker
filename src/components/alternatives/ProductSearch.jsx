import { useState } from 'react'
import { Search } from 'lucide-react'
import Button from '../shared/Button'

const ProductSearch = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-10 max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a product (e.g., plastic bottle, beef burger)"
                    className="w-full bg-white border border-neutral-light rounded-2xl pl-6 pr-32 py-4 shadow-sm focus:ring-2 focus:ring-primary-main focus:border-transparent outline-none text-lg transition-shadow"
                />
                <div className="absolute right-2 top-1.5 bottom-1.5">
                    <Button
                        type="submit"
                        variant="primary"
                        className="h-full rounded-xl px-6 flex items-center justify-center pointer-events-auto"
                        disabled={!query.trim() || isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Searching...
                            </span>
                        ) : (
                            <Search size={20} />
                        )}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ProductSearch
