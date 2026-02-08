import { motion } from 'framer-motion'
import { TrendingDown, TreeDeciduous, Target, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

const QuickStats = () => {
    // Get real data from local storage or default to 0
    const realScore = localStorage.getItem('totalCarbon') || "0"
    const savedTrees = Math.floor(parseFloat(realScore) / 20) // approx 20kg per tree

    const stats = [
        {
            label: "Carbon Footprint",
            value: realScore,
            unit: "kg CO₂",
            icon: TrendingDown,
            color: "text-primary-main",
            bg: "bg-primary-light/20",
            trend: "Your total impact"
        },
        {
            label: "Trees Saved",
            value: savedTrees.toString(),
            unit: "trees",
            icon: TreeDeciduous,
            color: "text-secondary-clay",
            bg: "bg-secondary-sand/30",
            trend: "Offset equivalent"
        },
        {
            label: "Goal Progress",
            value: "65",
            unit: "%",
            icon: Target,
            color: "text-accent-info",
            bg: "bg-accent-info/10",
            trend: "On track"
        },
        {
            label: "Challenges",
            value: "8",
            unit: "completed",
            icon: Award,
            color: "text-accent-warning",
            bg: "bg-accent-warning/10",
            trend: "Top 10%"
        },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
                // Determine link based on label
                let linkPath = '/dashboard'
                if (stat.label === 'Carbon Footprint') linkPath = '/calculator'
                if (stat.label === 'Challenges') linkPath = '/challenges'
                if (stat.label === 'Goal Progress') linkPath = '/calculator'

                const Content = (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer border border-transparent hover:border-primary-light/30"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend.includes('-') || stat.trend.includes('On') || stat.trend.includes('Top')
                                ? 'bg-green-100 text-green-700'
                                : 'bg-neutral-light text-neutral-dark'
                                }`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-neutral-mid text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-display font-bold text-neutral-dark">
                                {stat.value} <span className="text-sm font-body font-normal text-neutral-mid">{stat.unit}</span>
                            </h3>
                        </div>
                    </motion.div>
                )

                return linkPath !== '/dashboard' ? (
                    <Link key={index} to={linkPath}>
                        {Content}
                    </Link>
                ) : (
                    <div key={index}>{Content}</div>
                )
            })}
        </div>
    )
}

export default QuickStats
