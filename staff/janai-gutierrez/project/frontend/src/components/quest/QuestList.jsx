import { useQuests } from '../../context/QuestContext'

function QuestList({ quests, onOpenModal }) {
    const { completeQuest } = useQuests()

    const getStatEmoji = (stat) => {
        const emojis = {
            'STRENGTH': '💪',
            'DEXTERITY': '🎯',
            'WISDOM': '🧠',
            'CHARISMA': '✨'
        }
        return emojis[stat] || '❓'
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Quests</h2>
                <button
                    onClick={onOpenModal}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    🤖 Add Quest
                </button>
            </div>

            <div className="space-y-3">
                {quests.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">📜</div>
                        <p>No quests yet. Create your first epic quest!</p>
                    </div>
                ) : (
                    quests.map((quest, index) => (
                        <div
                            key={index}
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

                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                        onClick={() => console.log('Complete quest:', quest.title)}
                                    >
                                        ✅
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default QuestList