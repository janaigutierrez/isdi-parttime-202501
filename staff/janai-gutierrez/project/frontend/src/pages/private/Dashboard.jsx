import Header from '../../components/common/Header'
import Avatar from '../../components/quest/character/Avatar'
import { useQuests } from '../../context/QuestContext'
import QuestModal from '../../components/quest/QuestModal'

function Dashboard() {
  const { user, openQuestModal, closeQuestModal, isQuestModalOpen, addQuest } = useQuests()
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
            <p className="text-gray-600">Level {user.currentLevel} Adventurer</p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Level {user.currentLevel}</span>
              <span className="text-sm">Level {user.currentLevel + 1}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-purple-500 h-3 rounded-full"
                style={{ width: '60%' }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{user.totalXP} XP</span>
              <span className="text-xs text-gray-500">150 XP to go</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>💪</span>
              <span className="font-medium">Strength</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats.STRENGTH} points</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>🎯</span>
              <span className="font-medium">Dexterity</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats.DEXTERITY} points</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>🧠</span>
              <span className="font-medium">Wisdom</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats.WISDOM} points</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span>✨</span>
              <span className="font-medium">Charisma</span>
            </div>
            <div className="text-sm text-gray-600">{user.stats.CHARISMA} points</div>
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