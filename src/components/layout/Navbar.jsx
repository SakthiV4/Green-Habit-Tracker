import { Link, useLocation } from 'react-router-dom'
import { Leaf, BarChart2, MessageSquare, Award, Calculator, Menu, X, ShoppingBag, MapPin } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../shared/Button'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: BarChart2 },
        { name: 'Chat', path: '/chat', icon: MessageSquare },
        { name: 'Calc', path: '/calculator', icon: Calculator },
        { name: 'Challenges', path: '/challenges', icon: Award },
        { name: 'Swaps', path: '/alternatives', icon: ShoppingBag },
        { name: 'Local', path: '/directory', icon: MapPin },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-main p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                            <Leaf size={24} />
                        </div>
                        <span className="text-2xl font-display font-bold text-primary-deep tracking-tight">EcoTrack</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-2 text-base font-medium transition-colors px-3 py-2 rounded-lg ${isActive(link.path)
                                    ? 'text-primary-main bg-primary-light/10'
                                    : 'text-neutral-mid hover:text-primary-main hover:bg-neutral-light/50'
                                    }`}
                            >
                                <link.icon size={22} />
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-neutral-dark p-2 hover:bg-neutral-light rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-neutral-light"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive(link.path) ? 'bg-primary-light/20 text-primary-deep' : 'text-neutral-dark hover:bg-neutral-light'
                                        }`}
                                >
                                    <link.icon size={20} />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
