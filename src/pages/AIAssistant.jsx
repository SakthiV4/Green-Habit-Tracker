import ChatInterface from '../components/ai-assistant/ChatInterface'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import BackButton from '../components/shared/BackButton'
import BackgroundGradient from '../components/shared/BackgroundGradient'

const AIAssistant = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <BackgroundGradient />
            <BackButton to="/" />
            <div className="text-center mb-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light/10 text-primary-deep text-sm font-medium mb-4"
                >
                    <Sparkles size={16} />
                    <span>Powered by Tambo AI</span>
                </motion.div>
                <h1 className="text-4xl font-display font-bold mb-4 text-neutral-dark">Your Eco-Companion</h1>
                <p className="text-neutral-mid max-w-xl mx-auto">
                    Ask questions, get sustainability tips, or find green alternatives. EcoGuide uses advanced AI to help you live greener.
                </p>
            </div>

            <ChatInterface />
        </div>
    )
}

export default AIAssistant
