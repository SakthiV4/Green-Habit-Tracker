const StorageService = {
    getUserProfile() {
        return JSON.parse(localStorage.getItem('userProfile') || 'null')
    },

    saveUserProfile(profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile))
    },

    getActivities() {
        return JSON.parse(localStorage.getItem('activities') || '[]')
    },

    saveActivities(activities) {
        localStorage.setItem('activities', JSON.stringify(activities))
    },

    getChallenges() {
        return JSON.parse(localStorage.getItem('challenges') || '[]')
    },

    saveChallenges(challenges) {
        localStorage.setItem('challenges', JSON.stringify(challenges))
    },

    addActivity(activity) {
        const activities = this.getActivities()
        activities.unshift(activity)
        this.saveActivities(activities)
    },

    updateChallenge(id, data) {
        const challenges = this.getChallenges()
        const updated = challenges.map(c => c.id === id ? { ...c, ...data } : c)
        this.saveChallenges(updated)
    }
}

export default StorageService
