import { Link, useLocation } from 'react-router-dom'
import { useQuests } from '../../context/QuestContext'

function Header() {

    const location = useLocation()

    let user, openQuestModal
    try {
        const context = useQuests()
        user = context.user
        openQuestModal = context.openQuestModal
    } catch (error) {
        return <div>ERROR: QuestContext not found</div>
    }

    const isActiveRoute = (path) => {
        return location.pathname === path
    }

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 max-w-4xl">
                <div className="flex items-center justify-between">

                    <Link to="/" className="flex items-center gap-3">
                        <div className="text-2xl">🏠</div>
                        <div>
                            <h1 className="text-xl font-bold">Nest</h1>
                            <div className="text-sm text-gray-600">
                                Level {user?.currentLevel || 'X'} • {user?.totalXP || 'X'} XP
                            </div>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-2">
                        <Link to="/" className="text-gray-600">🏠 Home</Link>
                        <Link to="/my-quests" className="text-gray-600">📜 Quests</Link>
                        <Link to="/profile" className="text-gray-600">👤 Profile</Link>
                    </nav>

                </div>
            </div>
        </header>
    )
}

export default Header