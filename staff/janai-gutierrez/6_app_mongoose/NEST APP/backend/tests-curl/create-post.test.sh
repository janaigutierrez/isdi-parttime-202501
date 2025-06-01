curl -X POST http://localhost:4321/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic 6833611628371b21730a50fb" \
  -d '{
    "title": "Test migración",
    "description": "Testing Mongoose",
    "img": "https://example.com/test.jpg"
  }'