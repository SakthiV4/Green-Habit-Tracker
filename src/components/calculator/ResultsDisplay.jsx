import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { TreeDeciduous } from 'lucide-react'
import { CarbonAPI, TREE_ABSORPTION } from '../../services/carbonAPI'

const COLORS = {
    transport: '#4895ef',
    food: '#2d6a4f',
    energy: '#fb8500',
    waste: '#52b788',
    shopping: '#d4a373'
}

const ResultsDisplay = ({ activities, totalCO2 }) => {
    // Aggregate data for chart
    const data = Object.keys(COLORS).map(cat => ({
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: activities
            .filter(a => a.category === cat)
            .reduce((sum, curr) => sum + curr.co2, 0)
    })).filter(d => d.value > 0)

    const treeEquivalent = CarbonAPI.calculateTreeEquivalent(totalCO2)

    return (
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-6 shadow-sm min-h-[300px]"
            >
                <h3 className="font-bold text-lg mb-4 text-center">Breakdown</h3>
                {data.length > 0 ? (
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-neutral-mid">
                        Add activities to see breakdown
                    </div>
                )}
            </motion.div>

            {/* Summary Stats */}
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-primary-deep text-white rounded-3xl p-8"
                >
                    <p className="text-primary-accent mb-2">Total Carbon Footprint</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-display font-bold">{totalCO2.toFixed(1)}</span>
                        <span className="text-xl">kg CO₂</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-secondary-sand/30 rounded-3xl p-8 flex items-center gap-6"
                >
                    <div className="w-16 h-16 bg-primary-main rounded-2xl flex items-center justify-center text-white shrink-0">
                        <TreeDeciduous size={32} />
                    </div>
                    <div>
                        <p className="font-bold text-neutral-dark text-lg">Tree Equivalent</p>
                        <p className="text-neutral-mid text-sm">To offset this, you'd need:</p>
                        <p className="text-3xl font-bold text-primary-deep mt-1">{treeEquivalent} <span className="text-base font-normal">trees/year</span></p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ResultsDisplay
