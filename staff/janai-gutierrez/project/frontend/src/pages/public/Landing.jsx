import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div className="min-h-screen bg-purple-600 flex items-center justify-center">
            <div className="text-center px-4 max-w-lg">
                <div className="text-8xl mb-8">🏠</div>
                <h1 className="text-6xl font-bold text-white mb-4">Nest</h1>
                <p className="text-xl text-purple-100 mb-12">
                    Transform tasks into epic quests with AI
                </p>

                <div className="space-y-4">
                    <Link
                        to="/register"
                        className="block bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        ✨ Start Your Adventure
                    </Link>

                    <Link
                        to="/login"
                        className="block bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-purple-800 transform hover:scale-105 transition-all duration-200"
                    >
                        🚀 Continue Quest
                    </Link>
                </div>

                <div className="mt-12 text-purple-200 text-sm">
                    <p>🤖 AI-powered • 🎯 Gamified • 📊 Progress tracking</p>
                </div>
            </div>
        </div>
    )
}

export default Landing