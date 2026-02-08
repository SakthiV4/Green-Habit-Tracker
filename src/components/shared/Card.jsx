import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true, delay = 0, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`glass rounded-3xl p-6 ${hover ? 'hover:shadow-2xl hover:scale-[1.02] transition-all duration-300' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default Card
