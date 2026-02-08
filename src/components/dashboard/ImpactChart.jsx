import { useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

const generateData = (range) => {
    // Determine realistic data based on range
    let labels = []
    let baseValue = 400
    switch (range) {
        case 'Day':
            labels = ['6am', '9am', '12pm', '3pm', '6pm', '9pm']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 20 + 5) })) // Low hourly usage
        case 'Week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 50 + 20) }))
        case '1M':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 100 + 150) }))
        case '3M':
            labels = ['Jan', 'Feb', 'Mar']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 200 + 300) }))
        case '6M':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 200 + 300) }))
        case '1Y':
            labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 200 + 300) }))
        case 'All':
            labels = ['2023', '2024', '2025', '2026']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 500 + 2000) }))
        case 'Custom':
            labels = ['Start', '...', 'Mid', '...', 'End']
            return labels.map(l => ({ label: l, co2: Math.floor(Math.random() * 100 + 100) }))
        default:
            return []
    }
}

const timeFilters = ['Day', 'Week', '1M', '3M', '6M', '1Y', 'All', 'Custom']

const ImpactChart = () => {
    const [activeFilter, setActiveFilter] = useState('6M')
    const [dateRange, setDateRange] = useState({ start: '', end: '' })
    const data = generateData(activeFilter)

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm h-[400px]">
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="font-bold text-lg">Carbon Trend</h3>
                    <div className="flex bg-neutral-light/30 p-1 rounded-xl overflow-x-auto max-w-full">
                        {timeFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${activeFilter === filter
                                    ? 'bg-white text-primary-main shadow-sm'
                                    : 'text-neutral-mid hover:text-neutral-dark'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Date Inputs */}
                {activeFilter === 'Custom' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center justify-end gap-2 text-sm"
                    >
                        <span className="text-neutral-mid">From:</span>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            className="bg-neutral-light/20 border border-neutral-light rounded-lg px-3 py-1 text-xs focus:ring-2 focus:ring-primary-main outline-none"
                        />
                        <span className="text-neutral-mid">To:</span>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            className="bg-neutral-light/20 border border-neutral-light rounded-lg px-3 py-1 text-xs focus:ring-2 focus:ring-primary-main outline-none"
                        />
                    </motion.div>
                )}
            </div>

            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8f1ed" />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#829a92', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#829a92', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="co2"
                        stroke="#2d6a4f"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorCo2)"
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ImpactChart
