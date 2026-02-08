import { useState, useEffect, useRef } from 'react'
import { Send, Mic, MicOff, StopCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useVoiceCommands from '../../hooks/useVoiceCommands'
import { TamboAI } from '../../services/tamboAI'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import SuggestionCards from './SuggestionCards'
import Button from '../shared/Button'

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm EcoGuide. I can help you verify your carbon footprint, suggest sustainable alternatives, or generate eco-challenges. How can I help you today?" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        isSupported
    } = useVoiceCommands()

    // Update input with voice transcript
    useEffect(() => {
        if (transcript) {
            setInput(transcript)
        }
    }, [transcript])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    const toggleVoice = () => {
        if (isListening) {
            stopListening()
        } else {
            resetTranscript()
            startListening()
        }
    }

    // Auto-stop listening when message is sent
    const handleSend = async (text = input) => {
        if (!text.trim() || isLoading) return

        if (isListening) {
            stopListening()
        }

        const userMsg = { role: 'user', content: text }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        resetTranscript()
        setIsLoading(true)

        // Call Tambo AI
        try {
            const response = await TamboAI.chat(messages, text)

            // Check if it's an action (JSON)
            if (typeof response === 'object' && response.action === 'log_activity') {
                // Add to local storage
                const newActivity = {
                    id: Date.now(),
                    category: response.category,
                    type: response.type,
                    amount: response.amount,
                    co2: response.co2,
                    date: new Date().toISOString()
                }

                const existing = JSON.parse(localStorage.getItem('activities') || '[]')
                const updated = [newActivity, ...existing]
                localStorage.setItem('activities', JSON.stringify(updated))

                // Update total
                const total = updated.reduce((sum, item) => sum + item.co2, 0)
                localStorage.setItem('totalCarbon', total.toFixed(1))

                // Show confirmation message
                setMessages(prev => [...prev, { role: 'assistant', content: response.response }])

                // Dispatch event so Dashboard updates immediately if open
                window.dispatchEvent(new Event('storage'))

            } else {
                // Normal text response
                setMessages(prev => [...prev, { role: 'assistant', content: response }])
            }
        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex flex-col h-[600px] bg-white/50 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl overflow-hidden relative">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                {messages.length === 1 && !isLoading && (
                    <SuggestionCards onSelect={handleSend} />
                )}
                <div ref={messagesEndRef} />
            </div>



            {/* Input Area */}
            <div className="p-4 bg-white/80 border-t border-white/50">
                <div className="flex items-end gap-2 relative">
                    <div className="flex-1 bg-neutral-light/30 rounded-2xl border border-neutral-light/50 focus-within:border-primary-main/50 focus-within:bg-white transition-all p-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={isListening ? "Listening..." : "Ask EcoGuide..."}
                            className="w-full bg-transparent border-none resize-none focus:ring-0 text-neutral-dark placeholder-neutral-mid/70 h-[24px] max-h-[100px] py-1 px-2"
                            rows={1}
                            style={{ minHeight: '44px' }}
                        />
                    </div>

                    <div className="flex gap-2">
                        {isSupported && (
                            <Button
                                variant={isListening ? 'danger' : 'secondary'}
                                size="sm"
                                className="rounded-xl w-12 h-12 !p-0 flex items-center justify-center transition-all"
                                onClick={toggleVoice}
                                title="Voice Input"
                            >
                                {isListening ? (
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <MicOff size={20} />
                                    </motion.div>
                                ) : (
                                    <Mic size={20} />
                                )}
                            </Button>
                        )}

                        <Button
                            variant="primary"
                            size="sm"
                            className="rounded-xl w-12 h-12 !p-0 flex items-center justify-center"
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                        >
                            <Send size={20} className={!input.trim() ? "opacity-50" : ""} />
                        </Button>
                    </div>
                </div>
                {isListening && (
                    <div className="text-xs text-center mt-2 text-accent-warning animate-pulse">
                        Listening...
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatInterface
