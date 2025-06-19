curl -v -X POST http://localhost:4321/api/quests/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODU0N2VlNzc1OTRkM2MzNDc1ZjA3MzAiLCJpYXQiOjE3NTAzNjc5NzYsImV4cCI6MTc1MDk3Mjc3Nn0.SnJpoarfo9lIXHiDPu1bXFSWoFKqbEiYdcM6fCs8_WQ" \
  -d '{
    "title": "Go to the gym",
    "useAI": true,
    "difficulty": "STANDARD"
  }'