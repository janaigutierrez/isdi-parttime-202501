import { createContext, useContext, useState } from 'react'
import { UNLOCK_RULES, XP_RULES } from '../../../common/constants/gameRules'

const QuestContext = createContext()

export const useQuests = () => {
    const context = useContext(QuestContext)
    if (!context) {
        throw new Error('useQuests must be used within a QuestProvider')
    }
    return context
}

export const QuestProvider = ({ children }) => {
    const [quests, setQuests] = useState([])
    const [isQuestModalOpen, setIsQuestModalOpen] = useState(false)

    const [user, setUser] = useState({
        username: 'Adventurer',
        email: 'adventurer@nest.app',
        totalXP: 850,
        currentLevel: XP_RULES.getLevelFromXP(850),
        stats: {
            STRENGTH: 75,
            DEXTERITY: 50,
            WISDOM: 125,
            CHARISMA: 25
        }
    })

    const isFeatureUnlocked = (featureName) => {
        return UNLOCK_RULES.isGlobalUnlocked(featureName, user.currentLevel)
    }

    const getNextUnlocks = (count = 2) => {
        return UNLOCK_RULES.getNextGlobalUnlocks(user.currentLevel, count)
    }

    const addQuest = (newQuest) => {
        const questWithId = {
            ...newQuest,
            id: Date.now().toString(),
            createdAt: new Date(),
            isCompleted: false
        }
        setQuests(prev => [questWithId, ...prev])
        setIsQuestModalOpen(false)

        console.log('Quest added:', questWithId)
    }

    const completeQuest = (questId) => {
        const quest = quests.find(q => q.id === questId)
        if (!quest || quest.isCompleted) return


        setQuests(prev => prev.map(q =>
            q.id === questId
                ? { ...q, isCompleted: true, completedAt: new Date() }
                : q
        ))

        const xpGain = quest.experienceReward || 50
        setUser(prevUser => {
            const newTotalXP = prevUser.totalXP + xpGain
            const newLevel = XP_RULES.getLevelFromXP(newTotalXP)

            if (newLevel > prevUser.currentLevel)

                return {
                    ...prevUser,
                    totalXP: newTotalXP,
                    currentLevel: newLevel
                }
        })
    }

    const abandonQuest = (questId) => {
        setQuests(prev => prev.filter(quest => quest.id !== questId))
    }

    const openQuestModal = () => setIsQuestModalOpen(true)
    const closeQuestModal = () => setIsQuestModalOpen(false)

    const value = {
        user,
        setUser,

        isFeatureUnlocked,
        getNextUnlocks,

        quests,
        isQuestModalOpen,

        addQuest,
        completeQuest,
        abandonQuest,

        openQuestModal,
        closeQuestModal
    }

    return (
        <QuestContext.Provider value={value}>
            {children}
        </QuestContext.Provider>
    )
}

export default QuestContext