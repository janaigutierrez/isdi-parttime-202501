import { createContext, useContext, useState, useEffect } from 'react'
import { rules } from 'common'
import logics from '../logic'
import getLoggedUserId from '../logic/helpers/getLoggedUserId'

const QuestContext = createContext()

export const useQuests = () => {
    const context = useContext(QuestContext)
    if (!context) {
        throw new Error('useQuests must be used within a QuestProvider')
    }
    return context
}

export const QuestProvider = ({ children }) => {
    const [isQuestModalOpen, setIsQuestModalOpen] = useState(false)
    const [quests, setQuests] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        initializeData()
    }, [])

    const initializeData = async () => {
        try {
            setLoading(true)
            setError(null)

            await loadUserData()
            await loadQuestsData()
        } catch (error) {
            console.error('Error initializing data:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const loadUserData = async () => {
        try {
            const userId = getLoggedUserId()
            if (userId) {
                const userData = await logics.user.getUserProfile()
                setUser(userData)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error('Error loading user data:', error)
            throw error
        }
    }

    const loadQuestsData = async () => {
        try {
            const allQuests = await logics.quest.getAllQuests()
            setQuests(allQuests)
        } catch (error) {
            console.error('Error loading quests:', error)
            throw error
        }
    }

    const isFeatureUnlocked = (featureName) => {
        if (!user) return false
        return rules.UNLOCK_RULES.isUnlocked(featureName, user.currentLevel)
    }

    const getNextUnlock = () => {
        if (!user) return null
        return rules.UNLOCK_RULES.getNextUnlock(user.currentLevel)
    }

    const addQuest = async (questData) => {
        try {
            setError(null)
            const createdQuest = await logics.quest.createQuest(questData)

            setQuests(prev => [createdQuest, ...prev])
            setIsQuestModalOpen(false)

            console.log('✅ Quest created successfully:', createdQuest.title)
            return createdQuest
        } catch (error) {
            console.error('❌ Error creating quest:', error)
            setError(error.message)
            throw error
        }
    }

    const completeQuest = async (questId) => {
        try {
            setError(null)
            const result = await logics.quest.completeQuest(questId)

            setQuests(prev => prev.map(q =>
                q.id === questId ? result.updatedQuest : q
            ))

            setUser(result.updatedUser)

            if (result.levelUp) {
                console.log(`🎉 LEVEL UP! Welcome to Level ${result.updatedUser.currentLevel}!`)
                // TODO: Trigger level up modal when we implement it
            }

            console.log(`✅ Quest completed! +${result.xpGained} XP`)
            return result
        } catch (error) {
            console.error('❌ Error completing quest:', error)
            setError(error.message)
            throw error
        }
    }

    const abandonQuest = async (questId) => {
        try {
            setError(null)
            const deleted = await logics.quest.deleteQuest(questId)

            setQuests(prev => prev.filter(quest => quest.id !== questId))

            console.log('✅ Quest abandoned successfully')
            return deleted
        } catch (error) {
            console.error('❌ Error abandoning quest:', error)
            setError(error.message)
            throw error
        }
    }

    const updateQuest = async (questId, updates) => {
        try {
            setError(null)
            const updatedQuest = await logics.quest.updateQuest(questId, updates)

            setQuests(prev => prev.map(q =>
                q.id === questId ? updatedQuest : q
            ))

            console.log('✅ Quest updated successfully')
            return updatedQuest
        } catch (error) {
            console.error('❌ Error updating quest:', error)
            setError(error.message)
            throw error
        }
    }

    const uncompleteQuest = async (questId) => {
        try {
            setError(null)
            const result = await logics.quest.uncompleteQuest(questId)

            setQuests(prev => prev.map(q =>
                q.id === questId ? result.updatedQuest : q
            ))

            setUser(result.updatedUser)

            console.log('✅ Quest uncompleted successfully')
            return result
        } catch (error) {
            console.error('❌ Error uncompleting quest:', error)
            setError(error.message)
            throw error
        }
    }

    const getActiveQuests = async () => {
        try {
            return await logics.quest.getActiveQuests()
        } catch (error) {
            console.error('❌ Error getting active quests:', error)
            return []
        }
    }

    const getCompletedQuests = async () => {
        try {
            return await logics.quest.getCompletedQuests()
        } catch (error) {
            console.error('❌ Error getting completed quests:', error)
            return []
        }
    }

    const getQuestsByDifficulty = async (difficulty) => {
        try {
            return await logics.quest.getQuestsByDifficulty(difficulty)
        } catch (error) {
            console.error('❌ Error getting quests by difficulty:', error)
            return []
        }
    }

    const getQuestsByStat = async (stat) => {
        try {
            return await logics.quest.getQuestsByStat(stat)
        } catch (error) {
            console.error('❌ Error getting quests by stat:', error)
            return []
        }
    }

    const openQuestModal = () => setIsQuestModalOpen(true)
    const closeQuestModal = () => setIsQuestModalOpen(false)

    const clearError = () => setError(null)

    const value = {
        user,
        quests,
        loading,
        error,
        isQuestModalOpen,

        isFeatureUnlocked,
        getNextUnlock,
        addQuest,
        completeQuest,
        abandonQuest,
        updateQuest,
        uncompleteQuest,
        getActiveQuests,
        getCompletedQuests,
        getQuestsByDifficulty,
        getQuestsByStat,
        openQuestModal,
        closeQuestModal,
        clearError
    }

    return (
        <QuestContext.Provider value={value}>
            {children}
        </QuestContext.Provider>
    )
}

export default QuestContext