import { Car, ShoppingBag, Utensils } from 'lucide-react'

const activities = [
    { id: 1, type: 'Commute', detail: '15km by Bus', co2: '1.2 kg', icon: Car, color: 'bg-blue-100 text-blue-700', date: 'Today, 9:00 AM' },
    { id: 2, type: 'Lunch', detail: 'Vegetarian Meal', co2: '0.5 kg', icon: Utensils, color: 'bg-green-100 text-green-700', date: 'Today, 1:30 PM' },
    { id: 3, type: 'Shopping', detail: 'Second-hand clothes', co2: '2.0 kg', icon: ShoppingBag, color: 'bg-orange-100 text-orange-700', date: 'Yesterday' },
]

const RecentActivity = () => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm h-full">
            <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {activities.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl shrink-0 ${item.color}`}>
                            <item.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-neutral-dark truncate">{item.type}</h4>
                            <p className="text-sm text-neutral-mid truncate">{item.detail}</p>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-primary-deep">{item.co2}</span>
                            <span className="text-xs text-neutral-mid">{item.date}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-3 text-sm font-medium text-primary-main hover:bg-primary-light/10 rounded-xl transition-colors">
                View All History
            </button>
        </div>
    )
}

export default RecentActivity
