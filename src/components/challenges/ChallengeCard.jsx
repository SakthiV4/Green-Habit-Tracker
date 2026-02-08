import { motion } from 'framer-motion'
import { Trophy, Clock, CheckCircle, Circle } from 'lucide-react'
import Button from '../shared/Button'

const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
}

const ChallengeCard = ({ challenge, onComplete }) => {
    const { title, description, impact, difficulty, completed, category } = challenge

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 ${completed
                    ? 'bg-primary-main/5 border-primary-main/20'
                    : 'bg-white border-white/50 shadow-sm hover:shadow-md'
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${difficultyColors[difficulty] || difficultyColors.easy}`}>
                    {difficulty}
                </span>
                <div className="bg-primary-light/20 p-2 rounded-full text-primary-deep">
                    {completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-dark mb-2">{title}</h3>
            <p className="text-neutral-mid text-sm mb-6 leading-relaxed">
                {description}
            </p>

            <div className="flex items-center gap-4 text-sm font-medium text-neutral-dark mb-6">
                <div className="flex items-center gap-1.5">
                    <Trophy size={16} className="text-accent-warning" />
                    <span>{impact}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-mid">
                    <Clock size={16} />
                    <span>Weekly</span>
                </div>
            </div>

            <Button
                variant={completed ? "outline" : "primary"}
                className="w-full"
                onClick={() => onComplete(challenge.id)}
                disabled={completed}
            >
                {completed ? 'Completed' : 'Accept Challenge'}
            </Button>
        </motion.div>
    )
}

export default ChallengeCard
