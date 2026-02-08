import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-primary-main hover:bg-primary-deep text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-primary-light',
        secondary: 'bg-secondary-clay hover:bg-yellow-700 text-white shadow-md hover:shadow-lg focus:ring-secondary-sand',
        outline: 'border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-white',
        ghost: 'text-neutral-dark hover:bg-neutral-light/50',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
    }

    const sizes = {
        sm: 'px-6 py-3 text-base min-h-[52px]',
        md: 'px-8 py-4 text-lg min-h-[60px]',
        lg: 'px-12 py-5 text-xl min-h-[68px]',
    }

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default Button
