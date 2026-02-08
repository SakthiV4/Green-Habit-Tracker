import { motion } from 'framer-motion'
import { ArrowRight, Globe, BarChart, Zap, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/shared/Button'
import Card from '../components/shared/Card'

const Home = () => {
    const features = [
        {
            icon: Globe,
            title: 'Track Your Footprint',
            desc: 'Calculate and monitor your carbon usage across transport, food, and energy.',
            color: 'bg-primary-light',
        },
        {
            icon: Zap,
            title: 'AI-Powered Advice',
            desc: 'Get personalized, actionable tips from our intelligent eco-assistant.',
            color: 'bg-accent-warning',
        },
        {
            icon: BarChart,
            title: 'Visualize Impact',
            desc: 'See your progress with beautiful, real-time charts and data visualizations.',
            color: 'bg-accent-info',
        },
    ]

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 pb-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 right-0 w-96 h-96 bg-primary-accent/20 rounded-full blur-3xl mix-blend-multiply animate-float" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-sand/30 rounded-full blur-3xl mix-blend-multiply animate-float delay-1000" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/20 text-primary-deep text-sm font-medium mb-6">
                                <span className="w-2 h-2 rounded-full bg-primary-main animate-pulse" />
                                Hack All February 2026
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-neutral-dark">
                                Track Your Impact.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-main to-primary-light">
                                    Save the Planet.
                                </span>
                            </h1>
                            <p className="text-xl text-neutral-mid mb-8 max-w-lg leading-relaxed">
                                Your intelligent companion for sustainable living. Monitor your carbon footprint, get AI-powered advice, and join a community of changemakers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/calculator">
                                    <Button size="lg" className="w-full sm:w-auto group">
                                        Get Started Free
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </Button>
                                </Link>
                                <Link to="/chat">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Talk to EcoGuide
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Abstract decorative elements */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-main/10 to-transparent rounded-full blur-2xl" />

                            <div className="relative grid grid-cols-2 gap-6 p-4">
                                <Card className="col-span-2 bg-white/80 backdrop-blur-xl rotate-[0deg] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center text-primary-main">
                                            <Leaf size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Your Impact</h3>
                                            <p className="text-neutral-mid text-sm">-12% this month</p>
                                        </div>
                                    </div>
                                    <div className="h-24 bg-primary-light/10 rounded-xl relative overflow-hidden">
                                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-primary-main/20 rounded-t-xl" />
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-primary-main/40 rounded-t-xl mx-4" />
                                    </div>
                                </Card>

                                <Card className="bg-white/90 translate-y-8 -rotate-3">
                                    <div className="text-center">
                                        <h4 className="text-3xl font-bold text-primary-deep mb-1">24.5</h4>
                                        <p className="text-sm text-neutral-mid">Trees Saved</p>
                                    </div>
                                </Card>

                                <Card className="bg-white/90 translate-y-4 rotate-3">
                                    <div className="text-center">
                                        <h4 className="text-3xl font-bold text-accent-warning mb-1">850</h4>
                                        <p className="text-sm text-neutral-mid">Points Earned</p>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-neutral-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">Empowering Features</h2>
                        <p className="text-neutral-mid text-lg">Everything you need to understand and reduce your environmental impact.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <Card key={idx} delay={idx * 0.1} className="bg-white border-none">
                                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 text-white`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-neutral-mid leading-relaxed">
                                    {feature.desc}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
