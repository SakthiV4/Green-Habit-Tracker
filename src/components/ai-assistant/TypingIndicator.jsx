import { motion } from 'framer-motion'

const TypingIndicator = () => {
    return (
        <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-secondary-sand flex items-center justify-center shrink-0">
                <span className="text-secondary-clay">AI</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-neutral-light shadow-sm flex items-center gap-1">
                {[0, 1, 2].map((dot) => (
                    <motion.div
                        key={dot}
                        className="w-2 h-2 bg-neutral-mid rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.2 }}
                    />
                ))}
            </div>
        </div>
    )
}

export default TypingIndicator
