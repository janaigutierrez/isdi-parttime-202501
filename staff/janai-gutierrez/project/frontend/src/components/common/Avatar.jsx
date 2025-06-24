import { useState, useEffect } from 'react'
import { rules } from 'common'

const Avatar = ({ user, size = 'large' }) => {
    const walkSprites = [
        '/character/sprite_80.png',
        '/character/sprite_81.png',
        '/character/sprite_82.png',
        '/character/sprite_83.png',
        '/character/sprite_84.png',
        '/character/sprite_82.png'
    ]

    const [currentFrame, setCurrentFrame] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame(prev => (prev + 1) % walkSprites.length)
        }, 250)

        return () => clearInterval(interval)
    }, [walkSprites.length])

    const sizes = {
        large: { width: 80, height: 80 },
        medium: { width: 60, height: 60 },
        small: { width: 40, height: 40 }
    }

    const currentSize = sizes[size] || sizes.large

    const hasUnlockedAvatar = user && rules.XP_RULES.isMaxLevel(user.currentLevel)
    const avatarSet = hasUnlockedAvatar ? rules.UNLOCK_RULES.getMaxLevelRewards(user.stats) : null

    const avatarTitle = avatarSet?.title || null

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="relative">
                <img
                    src={walkSprites[currentFrame]}
                    alt={`${user?.username || 'User'} avatar`}
                    style={{
                        width: `${currentSize.width}px`,
                        height: `${currentSize.height}px`,
                        imageRendering: 'pixelated'
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                    }}
                />

                <div
                    style={{
                        display: 'none',
                        fontSize: `${currentSize.width * 0.6}px`
                    }}
                >
                    🧙‍♂️
                </div>

                {hasUnlockedAvatar && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
                        👑
                    </div>
                )}
            </div>

            {avatarTitle && (
                <div className="mt-2 text-center">
                    <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                        {avatarSet.emoji} {avatarTitle}
                    </span>
                </div>
            )}
        </div>
    )
}

export default Avatar