// frontend/src/assets/character/characterSprites.js
export const CHARACTER_SHEET = '/src/assets/character/modular_characters.png'

// Configuración del sprite sheet (estimado de tu imagen)
export const SPRITE_CONFIG = {
    spriteWidth: 16,
    spriteHeight: 16,
    scale: 6, // 16px → 96px para dashboard
}

// Posiciones estimadas (las ajustaremos viendo el sheet)
export const SPRITE_POSITIONS = {
    // BASE CHARACTERS (columna izquierda)
    base_character_1: { x: 0, y: 0 },
    base_character_2: { x: 0, y: 16 },
    base_character_3: { x: 0, y: 32 },

    // HELMETS (centro, aproximado)
    warrior_helmet: { x: 64, y: 16 },
    mage_hat: { x: 64, y: 80 },
    noble_crown: { x: 64, y: 112 },

    // WEAPONS (derecha, aproximado)  
    warrior_sword: { x: 240, y: 16 },
    mage_staff: { x: 240, y: 80 },
    noble_rapier: { x: 240, y: 112 },
}