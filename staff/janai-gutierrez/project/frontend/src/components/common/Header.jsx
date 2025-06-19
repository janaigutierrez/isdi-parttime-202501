import { Link, useLocation } from 'react-router-dom'
import { useQuests } from '../../context/QuestContext'
import Avatar from './Avatar'

function Header() {
    const { user, loading } = useQuests()
    const location = useLocation()

    if (loading || !user) {
        return (
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-purple-600">🏠 Nest</div>
                        <div className="animate-pulse">Loading...</div>
                    </div>
                </div>
            </header>
        )
    }

    const isActive = (path) => location.pathname === path

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700">
                        🏠 Nest
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`font-medium transition-colors ${isActive('/')
                                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                                    : 'text-gray-600 hover:text-purple-600'
                                }`}
                        >
                            🏠 Dashboard
                        </Link>
                        <Link
                            to="/my-quests"
                            className={`font-medium transition-colors ${isActive('/my-quests')
                                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                                    : 'text-gray-600 hover:text-purple-600'
                                }`}
                        >
                            📜 My Quests
                        </Link>
                        <Link
                            to="/stats"
                            className={`font-medium transition-colors ${isActive('/stats')
                                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                                    : 'text-gray-600 hover:text-purple-600'
                                }`}
                        >
                            📊 Stats
                        </Link>
                        <Link
                            to="/profile"
                            className={`font-medium transition-colors ${isActive('/profile')
                                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                                    : 'text-gray-600 hover:text-purple-600'
                                }`}
                        >
                            👤 Profile
                        </Link>
                    </nav>

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            <div className="text-xs text-gray-500">Level {user.currentLevel} • {user.totalXP} XP</div>
                        </div>
                        <div className="w-10 h-10">
                            <Avatar user={user} size="small" />
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden mt-4 flex justify-center space-x-4">
                    <Link
                        to="/"
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/')
                                ? 'bg-purple-100 text-purple-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        🏠
                    </Link>
                    <Link
                        to="/my-quests"
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/my-quests')
                                ? 'bg-purple-100 text-purple-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        📜
                    </Link>
                    <Link
                        to="/stats"
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/stats')
                                ? 'bg-purple-100 text-purple-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        📊
                    </Link>
                    <Link
                        to="/profile"
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/profile')
                                ? 'bg-purple-100 text-purple-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        👤
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header