import { useQuests } from '../../context/QuestContext'
import { rules } from 'common'

function QuestList() {
    const { quests, completeQuest, abandonQuest, openQuestModal, error, clearError } = useQuests()


    const getStatEmoji = (stat) => {
        if (!stat) return '❓'
        return rules.STAT_RULES.STATS[stat]?.emoji || '❓'
    }

    const handleCompleteQuest = async (questId) => {
        try {
            await completeQuest(questId)
        } catch (error) {
            console.error('Error completing quest:', error)
        }
    }

    const handleAbandonQuest = async (questId) => {
        if (window.confirm('Are you sure you want to abandon this quest?')) {
            try {
                await abandonQuest(questId)
            } catch (error) {
                console.error('Error abandoning quest:', error)
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Quests</h2>
                <button
                    onClick={openQuestModal}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    🤖 Add Quest
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{error}</span>
                    <button
                        onClick={clearError}
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    >
                        <span className="text-xl">&times;</span>
                    </button>
                </div>
            )}

            <div className="space-y-3">
                {quests.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">📜</div>
                        <p>No quests yet. Create your first epic quest!</p>
                    </div>
                ) : (
                    quests.map((quest, index) => {

                        return (
                            <div
                                key={quest._id || quest.id || index}
                                className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${quest.isCompleted
                                    ? 'bg-gray-100 border-gray-300 opacity-75'
                                    : 'bg-white border-gray-200'
                                    }`}
                            >
                                <div className="mb-3">
                                    <h3 className={`font-bold text-lg mb-1 ${quest.isCompleted ? 'line-through text-gray-500' : ''
                                        }`}>
                                        {quest.isCompleted ? '✅' : '🎯'} {quest.title}
                                    </h3>

                                    {(quest.generatedBy === 'ai' || quest.generatedBy === 'epic_fallback') && quest.aiMetadata?.prompt && (
                                        <div className="mb-2 text-xs bg-purple-50 border border-purple-200 rounded px-2 py-1">
                                            <span className="text-purple-600 font-medium">Original: </span>
                                            <span className="text-purple-700 italic">"{quest.aiMetadata.prompt}"</span>
                                            {quest.generatedBy === 'epic_fallback' && (
                                                <span className="text-orange-600 ml-2">(fallback)</span>
                                            )}
                                        </div>
                                    )}

                                    {quest.description && (
                                        <p className={`text-sm ${quest.isCompleted ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            {quest.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        {quest.targetStat && (
                                            <span className="flex items-center gap-1">
                                                {getStatEmoji(quest.targetStat)}
                                                {quest.targetStat}
                                            </span>
                                        )}

                                        <span className="text-gray-500">
                                            {quest.difficulty}
                                        </span>

                                        {quest.generatedBy === 'ai' && (
                                            <span className="text-purple-600">
                                                🤖 AI
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-yellow-600">
                                            +{quest.experienceReward} XP
                                        </span>

                                        {!quest.isCompleted ? (
                                            <div className="flex gap-1">
                                                <button
                                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                                    onClick={() => handleCompleteQuest(quest._id || quest.id)}
                                                    title="Complete Quest"
                                                >
                                                    ✅
                                                </button>
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                                    onClick={() => handleAbandonQuest(quest._id || quest.id)}
                                                    title="Abandon Quest"
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-green-600 text-sm font-medium">
                                                Completed ✨
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default QuestList