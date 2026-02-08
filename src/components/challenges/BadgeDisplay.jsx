import { motion } from 'framer-motion'
import { Award, Zap, Flame, Star, Globe } from 'lucide-react'

const badges = [
    { id: 1, name: "First Step", icon: Award, unlocked: true, desc: "Completed 1st challenge" },
    { id: 2, name: "Week Streak", icon: Flame, unlocked: true, desc: "7 day login streak" },
    { id: 3, name: "Carbon Saver", icon: Globe, unlocked: false, desc: "Save 100kg CO2" },
    { id: 4, name: "Eco Hero", icon: Star, unlocked: false, desc: "Top 5% of users" },
]

const BadgeDisplay = () => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Your Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, index) => (
                    <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex flex-col items-center text-center p-4 rounded-2xl border ${badge.unlocked
                                ? 'bg-accent-warning/10 border-accent-warning/20'
                                : 'bg-neutral-light/20 border-transparent grayscale opacity-70'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${badge.unlocked ? 'bg-accent-warning text-white shadow-lg shadow-accent-warning/30' : 'bg-neutral-light text-neutral-mid'
                            }`}>
                            <badge.icon size={24} />
                        </div>
                        <h4 className="font-bold text-sm text-neutral-dark">{badge.name}</h4>
                        <p className="text-[10px] text-neutral-mid mt-1">{badge.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default BadgeDisplay
