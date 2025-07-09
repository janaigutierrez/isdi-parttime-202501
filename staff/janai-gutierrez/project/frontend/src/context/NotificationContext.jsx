import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([])
    const [confirmDialog, setConfirmDialog] = useState(null)

    const addNotification = (message, type = 'success') => {
        const id = Date.now() + Math.random()
        const notification = { id, message, type }

        setNotifications(prev => [...prev, notification])

        setTimeout(() => {
            removeNotification(id)
        }, 4000)
    }

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id))
    }

    const showSuccess = (message) => addNotification(message, 'success')
    const showError = (message) => addNotification(message, 'error')
    const showInfo = (message) => addNotification(message, 'info')

    const showConfirm = (options) => {
        setConfirmDialog({
            title: options.title || 'Are you sure?',
            message: options.message || 'Keep going?',
            icon: options.icon || '❓',
            confirmText: options.confirmText || 'Confirmar',
            cancelText: options.cancelText || 'Cancelar',
            confirmStyle: options.confirmStyle || 'red',
            onConfirm: options.onConfirm || (() => { }),
            onCancel: options.onCancel || (() => { }),
            successMessage: options.successMessage
        })
    }

    const hideConfirm = () => {
        setConfirmDialog(null)
    }

    return (
        <NotificationContext.Provider value={{
            notifications,
            showSuccess,
            showError,
            showInfo,
            showConfirm,
            hideConfirm,
            removeNotification
        }}>
            {children}
            <NotificationContainer />
            {confirmDialog && <ConfirmDialog confirmDialog={confirmDialog} hideConfirm={hideConfirm} />}
        </NotificationContext.Provider>
    )
}

function NotificationContainer() {
    const { notifications, removeNotification } = useNotifications()

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    className={`p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 animate-in slide-in-from-top-2 ${notification.type === 'success'
                        ? 'bg-green-500 text-white'
                        : notification.type === 'error'
                            ? 'bg-red-500 text-white'
                            : 'bg-blue-500 text-white'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span>
                                {notification.type === 'success' && '✅'}
                                {notification.type === 'error' && '❌'}
                                {notification.type === 'info' && 'ℹ️'}
                            </span>
                            <p className="font-medium">{notification.message}</p>
                        </div>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="ml-2 text-white hover:text-gray-200 text-lg"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ConfirmDialog({ confirmDialog, hideConfirm }) {
    const { showInfo } = useNotifications()

    if (!confirmDialog) return null

    const handleConfirm = () => {
        if (confirmDialog.successMessage) {
            showInfo(confirmDialog.successMessage)
        }
        confirmDialog.onConfirm()
        hideConfirm()
    }

    const handleCancel = () => {
        confirmDialog.onCancel()
        hideConfirm()
    }

    const getConfirmButtonStyle = () => {
        switch (confirmDialog.confirmStyle) {
            case 'red':
                return 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
            case 'blue':
                return 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            case 'green':
                return 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
            default:
                return 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="text-center">
                    <div className="text-4xl mb-4">{confirmDialog.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {confirmDialog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {confirmDialog.message}
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        {confirmDialog.cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 text-white rounded-lg transition-colors font-medium ${getConfirmButtonStyle()}`}
                    >
                        {confirmDialog.confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider')
    }
    return context
}