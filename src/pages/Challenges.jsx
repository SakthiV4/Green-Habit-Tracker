import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, RefreshCw } from 'lucide-react'
import ChallengeCard from '../components/challenges/ChallengeCard'
import BadgeDisplay from '../components/challenges/BadgeDisplay'

import Button from '../components/shared/Button'
import BackButton from '../components/shared/BackButton'
import BackgroundGradient from '../components/shared/BackgroundGradient'
import { TamboAI } from '../services/tamboAI'
import confetti from 'canvas-confetti'

const initialChallenges = [
    {
        id: 1,
        title: "Meatless Monday",
        description: "Replace all meat portions with plant-based alternatives for one day.",
        impact: "Save ~2.5kg CO₂",
        difficulty: "easy",
        category: "food",
        completed: false
    },
    {
        id: 2,
        title: "Bike to Work",
        description: "Use a bicycle or walk for your commute instead of driving.",
        impact: "Save ~4.2kg CO₂",
        difficulty: "medium",
        category: "transport",
        completed: true
    },
    {
        id: 3,
        title: "Zero Waste Shop",
        description: "Do your grocery shopping using only reusable bags and containers.",
        impact: "Save ~0.5kg Plastic",
        difficulty: "hard",
        category: "waste",
        completed: false
    }
]

const Challenges = () => {
    const [challenges, setChallenges] = useState(initialChallenges)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = async () => {
        setIsGenerating(true)
        // Mock user profile
        const profile = { totalCarbon: 12000 }
        const newChallenge = await TamboAI.generateChallenge(profile)

        if (newChallenge) {
            setChallenges(prev => [{ ...newChallenge, id: Date.now(), completed: false }, ...prev])
        }
        setIsGenerating(false)
    }

    const handleComplete = (id) => {
        setChallenges(prev => prev.map(c => c.id === id ? { ...c, completed: true } : c))
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <BackgroundGradient />
            <BackButton to="/" />
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold text-neutral-dark mb-2">Eco Challenges</h1>
                    <p className="text-neutral-mid">Complete weekly tasks to level up your sustainability game.</p>
                </div>
                <Button
                    variant="primary"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="gap-2"
                >
                    {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                    Generate New Challenge
                </Button>
            </div>

            <div className="mb-12">
                <BadgeDisplay />
            </div>

            <h2 className="text-2xl font-bold mb-6">Active Challenges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                    <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        onComplete={handleComplete}
                    />
                ))}
            </div>
        </div>
    )
}

export default Challenges
