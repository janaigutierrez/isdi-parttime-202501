# NEST APP
imagen aquí

## Description

Agenda Gamificada

## Functional Description

- crear usuarios
- registrar
- crear misiones
- marcar como completadas
- editarlas
- eliminarlas
- ver mis skills

## UX/UI Design

[My Figma](https://www.figma.com/design/L6Msy1Yl53H9ZR50ACgQU1/Nest-App?node-id=1-4&t=5zI5ZUyGC4XngijW-1)

## Technical Description

### Technologies and libraries

- React
- Vite
- Tailwind
- react-router
- Express
- Node
- Mongo+Mongoose
- Mocha Chai
- Bcrypt / Token Library (jose, jwt, etc)

### Data Models

#### Routes:

#### Users
- Id: ObjectId
- Password: string,
- Username: string,
- Skills: {
  STR: number,
  DEX: number,
  WIS: number,
  CHARM: number
}
- Skin

#### Quests
- Id
- Player (author / user Object Id)
- Description: string
- Title: string
- isDaily: boolean
(if isDaily false) limitDate 
- isComplete: boolean
- ExperienceReward

### Test Coverage

Captura de pantalla (más del 80% en todo)

### Project

app link here