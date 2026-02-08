import { motion } from 'framer-motion'
import QuickStats from '../components/dashboard/QuickStats'
import ImpactChart from '../components/dashboard/ImpactChart'
import RecentActivity from '../components/dashboard/RecentActivity'
import Button from '../components/shared/Button'
import { Plus, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import BackgroundGradient from '../components/shared/BackgroundGradient'

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            <BackgroundGradient />
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-dark">Welcome Back! 👋</h1>
                    <p className="text-neutral-mid">Here's your sustainability overview for today.</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/chat">
                        <Button variant="outline" className="gap-2">
                            <MessageSquare size={18} /> Ask AI
                        </Button>
                    </Link>
                    <Link to="/calculator">
                        <Button variant="primary" className="gap-2">
                            <Plus size={18} /> Log Activity
                        </Button>
                    </Link>
                </div>
            </div>

            <QuickStats />

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <ImpactChart />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
