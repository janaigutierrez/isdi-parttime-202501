import { useState, useEffect } from 'react'

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

    return (
        <div className="flex items-center justify-center h-full">
            <img
                src={walkSprites[currentFrame]}
                alt={`${user.username} avatar`}
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
        </div>
    )
}

export default Avatar