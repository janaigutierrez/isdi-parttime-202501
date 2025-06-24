// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import logics from '../logic'
import getLoggedUserId from '../logic/helpers/getLoggedUserId'
import { errors } from 'common'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = async () => {
        try {
            const userId = getLoggedUserId()

            if (userId) {
                const userData = await logics.user.getUserProfile()

                // FIX: Acceder al userProfile correcto
                const userProfile = userData.userProfile || userData
                setUser(userProfile)
                console.log('✅ User data loaded:', userProfile)
            } else {
                setUser(null)
                console.log('ℹ️ No user logged in')
            }
        } catch (error) {
            if (error instanceof errors.AuthError) {
                console.log('🔐 User not authenticated')
                setUser(null)
            } else if (error instanceof errors.ExistenceError) {
                console.error('❌ User not found:', error.message)
                setUser(null)
            } else if (error instanceof errors.ConnectionError) {
                console.error('🌐 Connection error:', error.message)
            } else {
                console.error('❌ Error loading user data:', error.message)
            }
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const refreshUserData = async () => {
        try {
            const userId = getLoggedUserId()
            if (userId) {
                const userData = await logics.user.getUserProfile()

                // FIX: Acceder al userProfile correcto también en refresh
                const userProfile = userData.userProfile || userData
                setUser(userProfile)
                console.log('🔄 User data refreshed:', userProfile)
            }
        } catch (error) {
            if (error instanceof errors.AuthError) {
                console.log('🔐 User session expired')
                setUser(null)
            } else {
                console.error('❌ Error refreshing user data:', error.message)
            }
        }
    }

    const updateUserStats = (newXP, newStats) => {
        setUser(prev => ({
            ...prev,
            totalXP: newXP,
            stats: newStats
        }))
    }

    const value = {
        user,
        loading,
        refreshUserData,
        updateUserStats
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your adventure...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}