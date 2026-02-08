import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user'

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex gap-4 mb-8 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-primary-main text-white' : 'bg-secondary-sand text-secondary-clay'
                }`}>
                {isUser ? <User size={24} /> : <Bot size={24} />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-6 shadow-md ${isUser
                ? 'bg-primary-main text-white rounded-tr-none'
                : 'bg-white text-neutral-dark rounded-tl-none border border-neutral-light'
                }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-lg">
                    {message.content}
                </p>
                <span className={`text-sm block mt-3 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </motion.div>
    )
}

export default MessageBubble
