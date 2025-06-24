import Header from '../../components/common/Header'
import { useAuth } from '../../context/AuthContext'
import { useQuests } from '../../context/QuestContext'

function Stats() {
    const { user } = useAuth()
    const { quests } = useQuests()

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse">Loading stats...</div>
            </div>
        )
    }

    const totalQuests = quests.length
    const completedQuests = quests.filter(q => q.isCompleted).length
    const totalXP = quests.reduce((sum, q) => sum + (q.experienceReward || 0), 0)
    const completionRate = totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-4xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">📊 Stats</h1>
                    <p className="text-gray-600">Your progress overview</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{totalQuests}</div>
                        <div className="text-sm text-gray-600">Total Quests</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{completedQuests}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-3xl font-bold text-yellow-600 mb-2">{user.totalXP || 0}</div>
                        <div className="text-sm text-gray-600">Total XP</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{completionRate}%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <h3 className="text-lg font-bold mb-6">🎯 Stats Breakdown</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">💪</div>
                            <div className="font-bold text-2xl text-red-600">{user.stats?.STRENGTH || 0}</div>
                            <div className="text-sm text-gray-600">Strength</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">🎯</div>
                            <div className="font-bold text-2xl text-green-600">{user.stats?.DEXTERITY || 0}</div>
                            <div className="text-sm text-gray-600">Dexterity</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">🧠</div>
                            <div className="font-bold text-2xl text-blue-600">{user.stats?.WISDOM || 0}</div>
                            <div className="text-sm text-gray-600">Wisdom</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl mb-2">✨</div>
                            <div className="font-bold text-2xl text-purple-600">{user.stats?.CHARISMA || 0}</div>
                            <div className="text-sm text-gray-600">Charisma</div>
                        </div>
                    </div>
                </div>

                {totalQuests === 0 && (
                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-xl font-bold mb-2">No stats yet</h3>
                        <p className="text-gray-600 mb-6">Create and complete quests to see your progress!</p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                            🚀 Create First Quest
                        </button>
                    </div>
                )}

                {totalQuests > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-bold mb-6">🏆 Achievements</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                <span className="text-2xl">🏅</span>
                                <div>
                                    <div className="font-medium">Quest Creator</div>
                                    <div className="text-sm text-gray-600">Created your first quest</div>
                                </div>
                            </div>
                            {completedQuests > 0 && (
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                    <span className="text-2xl">✅</span>
                                    <div>
                                        <div className="font-medium">Quest Completer</div>
                                        <div className="text-sm text-gray-600">Completed your first quest</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Stats