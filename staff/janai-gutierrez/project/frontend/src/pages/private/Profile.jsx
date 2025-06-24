import Header from '../../components/common/Header'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../context/AuthContext'

function Profile() {
    const { user } = useAuth()

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse">Loading profile...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-2xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">👤 Profile</h1>
                    <p className="text-gray-600">Your adventurer information</p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">

                    <div className="text-center mb-8">
                        <div className="w-24 h-24 mx-auto mb-4">
                            <Avatar user={user} size="large" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
                        <p className="text-gray-600">Level {user.currentLevel || 1} Adventurer</p>
                        <p className="text-sm text-gray-500">{user.totalXP || 0} XP total</p>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                            onClick={() => console.log('Edit profile - TODO')}
                        >
                            ✏️ Edit Profile
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile