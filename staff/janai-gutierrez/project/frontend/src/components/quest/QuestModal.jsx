import { useState } from 'react'
import { useQuests } from '../../context/QuestContext'
import { rules, validator } from 'common'

function QuestModal() {
    const {
        isQuestModalOpen,
        closeQuestModal,
        addQuest,
        isFeatureUnlocked,
        error,
        clearError
    } = useQuests()

    const [userInput, setUserInput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedQuest, setGeneratedQuest] = useState(null)
    const [localError, setLocalError] = useState('')

    const aiAvailable = isFeatureUnlocked('AI_QUEST_GENERATION')

    const generateQuest = async () => {
        try {
            validator.text(userInput.trim(), 100, 3, 'quest description')

            setIsGenerating(true)
            setLocalError('')
            setGeneratedQuest(null)

            const createdQuest = await addQuest({
                title: userInput.trim(),
                useAI: true,
                difficulty: 'STANDARD'
            })

            setGeneratedQuest(createdQuest)

        } catch (error) {
            console.error('Error generating quest:', error)
            setLocalError(error.message || 'Error generating quest.')
        } finally {
            setIsGenerating(false)
        }
    }

    const createManualQuest = async () => {
        try {
            validator.text(userInput.trim(), 100, 3, 'quest title')

            await addQuest({
                title: userInput.trim(),
                useAI: false,
                difficulty: 'STANDARD'
            })

            handleClose()

        } catch (error) {
            console.error('Error creating manual quest:', error)
            setLocalError(error.message || 'Error creating quest.')
        }
    }

    const acceptQuest = () => {
        handleClose()
    }

    const handleClose = () => {
        setUserInput('')
        setGeneratedQuest(null)
        setLocalError('')
        clearError()
        closeQuestModal()
    }

    const getStatEmoji = (stat) => {
        if (!stat) return '❓'
        return rules.STAT_RULES.STATS[stat]?.emoji || '❓'
    }

    if (!isQuestModalOpen) return null

    const currentError = localError || error

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl">

                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">✨ Create Quest</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6">

                    {!generatedQuest && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    What do you want to achieve?
                                </label>
                                <textarea
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="E.g: go to the gym, study physics, read..."
                                    className="w-full p-3 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    rows={3}
                                />
                            </div>

                            {currentError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {currentError}
                                </div>
                            )}

                            <div className="space-y-3">
                                {aiAvailable ? (
                                    <button
                                        onClick={generateQuest}
                                        disabled={isGenerating || !userInput.trim()}
                                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${isGenerating || !userInput.trim()
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                                            }`}
                                    >
                                        {isGenerating ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                Creating with AI...
                                            </span>
                                        ) : (
                                            '🤖 Create with AI'
                                        )}
                                    </button>
                                ) : (
                                    <div className="bg-purple-100 p-3 rounded-lg text-center text-sm text-purple-700">
                                        🔒 AI Generation unlocks at Level 3
                                    </div>
                                )}

                                <button
                                    onClick={createManualQuest}
                                    disabled={!userInput.trim()}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${!userInput.trim()
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                        }`}
                                >
                                    📝 Create Manual Quest
                                </button>
                            </div>
                        </div>
                    )}

                    {generatedQuest && (
                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                                <h3 className="font-bold text-lg mb-2">
                                    🎯 {generatedQuest.title}
                                </h3>

                                {generatedQuest.description && (
                                    <p className="text-sm text-gray-600 mb-3">
                                        {generatedQuest.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        {generatedQuest.targetStat && (
                                            <span className="flex items-center gap-1">
                                                {getStatEmoji(generatedQuest.targetStat)}
                                                {generatedQuest.targetStat}
                                            </span>
                                        )}
                                        <span className="text-gray-500">{generatedQuest.difficulty}</span>
                                        {generatedQuest.generatedBy === 'ai' && (
                                            <span className="text-purple-600">🤖 AI</span>
                                        )}
                                    </div>
                                    <span className="font-bold text-yellow-600">
                                        +{generatedQuest.experienceReward} XP
                                    </span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={acceptQuest}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold"
                                >
                                    ✅ Accept & Close
                                </button>
                                <button
                                    onClick={() => setGeneratedQuest(null)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold"
                                >
                                    🔄 Try Again
                                </button>
                            </div>

                            <button
                                onClick={handleClose}
                                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default QuestModal