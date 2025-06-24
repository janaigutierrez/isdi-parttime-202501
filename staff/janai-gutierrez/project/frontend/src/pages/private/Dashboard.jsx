import Header from '../../components/common/Header'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../context/AuthContext'
import { useQuests } from '../../context/QuestContext'
import QuestModal from '../../components/quest/QuestModal'
import { rules } from 'common' // 👈 IMPORT PARA CALCULAR PROGRESO

function Dashboard() {
  const { user, loading } = useAuth()
  const { openQuestModal, closeQuestModal, isQuestModalOpen, addQuest } = useQuests()

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your adventure...</p>
        </div>
      </div>
    )
  }

  // 👈 DEBUG TEMPORAL - VER QUÉ DATOS RECIBE DASHBOARD
  console.log('🔍 DASHBOARD USER DATA:', user)
  console.log('🔍 USER CURRENT LEVEL:', user.currentLevel)
  console.log('🔍 USER TOTAL XP:', user.totalXP)

  // 👈 CALCULAR PROGRESO REAL - FIX FIELD NAME CORRECTO
  const currentLevel = user.currentLevel || 1  // ✅ USAR currentLevel
  const currentXP = user.totalXP || 0
  const xpToNext = rules.XP_RULES.getXPToNextLevel(currentXP)
  const isMaxLevel = rules.XP_RULES.isMaxLevel(currentLevel)

  // 👈 FIX: Calcular porcentaje de progreso correctamente
  let progressPercentage = 0
  if (!isMaxLevel && currentLevel < rules.XP_RULES.BASE_LEVELS.length - 1) {
    // XP requerido para el nivel actual
    const currentLevelXP = rules.XP_RULES.BASE_LEVELS[currentLevel] || 0
    // XP requerido para el siguiente nivel
    const nextLevelXP = rules.XP_RULES.BASE_LEVELS[currentLevel + 1] || 0

    // XP que ya tienes dentro del nivel actual
    const xpInCurrentLevel = currentXP - currentLevelXP
    // XP total necesario para completar este nivel
    const xpNeededForLevel = nextLevelXP - currentLevelXP

    // Calcular porcentaje
    if (xpNeededForLevel > 0) {
      progressPercentage = Math.max(0, Math.min(100, (xpInCurrentLevel / xpNeededForLevel) * 100))
    }

    // Debug temporal - QUITAR DESPUÉS
    console.log('🔍 LEVEL CALC:', {
      currentLevel,
      currentXP,
      currentLevelXP,
      nextLevelXP,
      xpInCurrentLevel,
      xpNeededForLevel,
      progressPercentage
    })
  } else {
    progressPercentage = 100
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-52 h-52 mx-auto rounded-full bg-white border-4 border-purple-300 shadow-lg flex items-center justify-center">
              <Avatar user={user} size="large" />
            </div>
            <h2 className="text-2xl font-bold mt-4 mb-2">{user.username}</h2>
            <p className="text-gray-600">Level {user.currentLevel || user.level || 1} Adventurer</p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Level {currentLevel}</span>
              {/* 👈 MOSTRAR NEXT LEVEL REAL O MAX */}
              <span className="text-sm">
                {isMaxLevel ? 'MAX LEVEL' : `Level ${currentLevel + 1}`}
              </span>
            </div>

            {/* 👈 BARRA DE PROGRESO REAL */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{currentXP} XP</span>
              {/* 👈 XP TO NEXT LEVEL REAL */}
              <span className="text-xs text-gray-500">
                {isMaxLevel ? 'Max Level Reached!' : `${xpToNext} XP to go`}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>💪</span>
              <span className="font-medium">Strength</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats?.STRENGTH || 0} points</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>🎯</span>
              <span className="font-medium">Dexterity</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats?.DEXTERITY || 0} points</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>🧠</span>
              <span className="font-medium">Wisdom</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats?.WISDOM || 0} points</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>✨</span>
              <span className="font-medium">Charisma</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats?.CHARISMA || 0} points</div>
          </div>
        </div>
      </main>

      <button
        onClick={openQuestModal}
        className="fixed bottom-6 left-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-2xl z-50"
        title="Create new quest"
      >
        +
      </button>

      {isQuestModalOpen && (
        <QuestModal
          isOpen={isQuestModalOpen}
          onClose={closeQuestModal}
          onAddQuest={addQuest}
        />
      )}
    </div>
  )
}

export default Dashboard