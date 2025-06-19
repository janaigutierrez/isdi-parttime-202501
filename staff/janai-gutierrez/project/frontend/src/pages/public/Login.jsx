import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validator, errors } from 'common'
import logics from '../../logic'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError('')

            validator.email(formData.email, 'email')
            validator.password(formData.password, 'password')

            const result = await logics.user.loginUser(formData)


            console.log('✅ Login successful:', result.user.username)

            navigate('/')

        } catch (error) {
            console.error('❌ Login failed:', error)
            setError(error.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="text-6xl mb-4">🏠</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                    <p className="text-gray-600">Sign in to continue your adventure</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${loading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Signing in...
                            </span>
                        ) : (
                            '🚀 Sign In'
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Demo credentials */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
                    <div className="text-xs text-blue-700 space-y-1">
                        <p><strong>Email:</strong> demo@nest.com</p>
                        <p><strong>Password:</strong> demo123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login