# Game Rules & Constants

## Description

This file defines all the gamification system rules for the Nest application. It includes XP mechanics, levels, stats, unlocks, and validations.

## Included Systems

### XP_RULES
- **Purpose**: Controls experience and leveling system
- **Levels**: Hybrid system (1-20 predefined + infinite formula)
- **Progression**: Exponential until level 20, then +2000 XP per level

```javascript
const userLevel = XP_RULES.getLevelFromXP(1250); // Level 6
const xpToNext = XP_RULES.getXPToNextLevel(1250); // Remaining XP
```

### QUEST_REWARDS
- **Base XP**: Quick (25), Standard (50), Long (100), Epic (200)
- **Multipliers**: Daily quests +20% XP bonus
- **Bonus**: +10 XP extra for specific stat

```javascript
const totalXP = QUEST_REWARDS.calculateQuestXP(50, true); // 60 XP (daily bonus)
```

### STAT_RULES
- **4 Main Stats**: Strength, Dexterity, Wisdom, Charisma
- **Auto Detection**: By keywords in quest description
- **Progression**: Independent system per stat (25 points per quest)

```javascript
const detectedStat = STAT_RULES.detectStatFromDescription("go to gym");
// Returns: "STRENGTH"
```

### UNLOCK_RULES
- **Dual System**: General XP + Specific Stats
- **General XP**: Unlocks features and themes
- **Stats**: Unlocks titles and avatar items

```javascript
const isUnlocked = UNLOCK_RULES.isGlobalUnlocked('DARK_MODE', 3); // true
const nextUnlocks = UNLOCK_RULES.getNextGlobalUnlocks(5);
```

## Unlocks List

### By General XP (Features & Themes)
- **Level 1**: Dark Mode
- **Level 2**: Motivational Quotes  
- **Level 3**: AI Quest Generation
- **Level 4**: Library Theme
- **Level 5**: Streak Counter
- **Level 6**: Mystic Theme
- **Level 7**: Weekly Challenges
- **Level 8**: Medieval Theme
- **Level 9**: Quick Add
- **Level 10**: Warrior Theme
- **Level 11**: Random Quest Generator
- **Level 12**: Academy Theme

### By Specific Stats (Titles & Avatar Items)
Each stat has independent unlocks at levels 3, 7, 12, 18:
- **Titles**: From basic (Athlete) to legendary (Muscle Legend)
- **Avatar Items**: Head, body, accessory, and weapon slots
- **4 Categories**: Based on stat type (physical, creative, intellectual, social)

## Usage Examples

### Calculate User Progress
```javascript
import { XP_RULES, STAT_RULES } from './gameRules.js';

// Get user level from total XP
const currentLevel = XP_RULES.getLevelFromXP(userXP);

// Get stat level from stat points
const strengthLevel = STAT_RULES.getStatLevel(userStats.STRENGTH);

// Check available unlocks
const availableUnlocks = UNLOCK_RULES.getAllAvailableUnlocks(currentLevel, userStats);
```

### Quest Creation
```javascript
// Auto-detect stat from description
const questStat = STAT_RULES.detectStatFromDescription("study for exam");

// Calculate XP reward
const xpReward = QUEST_REWARDS.calculateQuestXP(50, true, questStat);
```

### Validation
```javascript
// Use validation limits
const isValidTitle = title.length <= VALIDATION_RULES.QUEST.TITLE_MAX_LENGTH;
const isValidXP = xp >= VALIDATION_RULES.QUEST.MIN_XP;
```

## Configuration

### Customizable Values
- **XP per quest**: Modify `STAT_POINTS_PER_QUEST` 
- **Level requirements**: Edit `LEVELS` array
- **Unlock levels**: Adjust `GLOBAL_UNLOCKS` values
- **Validation limits**: Update `VALIDATION_RULES`

### Adding New Features
1. Add to `GLOBAL_UNLOCKS` with level requirement
2. Update frontend to check unlock status
3. Implement feature logic when unlocked

### Adding New Stats
1. Add to `STAT_RULES.STATS` with keywords
2. Add unlock items to `UNLOCK_RULES.STAT_UNLOCKS`
3. Update models to include new stat

## Dependencies
- None (pure constants and utility functions)
- Can be imported in both frontend and backend
- Compatible with ES6 modules

## Testing
```javascript
// Test XP calculations
console.log(XP_RULES.getLevelFromXP(1000)); // Should return 5

// Test stat detection  
console.log(STAT_RULES.detectStatFromDescription("read book")); // Should return "WISDOM"

// Test unlocks
console.log(UNLOCK_RULES.isGlobalUnlocked('AI_QUEST_GENERATION', 5)); // Should return true
```