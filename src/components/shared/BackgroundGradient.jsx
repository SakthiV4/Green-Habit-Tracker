import { motion } from 'framer-motion'

const BackgroundGradient = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-sand/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[120px] mix-blend-multiply" />
        </div>
    )
}

export default BackgroundGradient
