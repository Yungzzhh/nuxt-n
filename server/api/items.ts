export default defineEventHandler(async (event) => {
  // 模拟数据库查询
  return [
    {
      id: '1',
      title: 'Note 1',
      content: 'This is the content of note 1'
    },
    {
      id: '2',
      title: 'Shopping List',
      content: 'Milk, eggs, bread, cheese, vegetables, fruits, chicken, pasta, olive oil, chocolate'
    },
    {
      id: '3',
      title: 'Project Ideas',
      content: 'AI-powered personal assistant, Sustainable energy app, Virtual reality fitness trainer, Smart home automation system, Language learning game'
    },
    {
      id: '4',
      title: 'Meeting Minutes - 05/15/2023',
      content: 'Discussed quarterly goals, reviewed budget projections, assigned new tasks to team members, planned upcoming product launch'
    },
    {
      id: '5',
      title: 'Recipe: Chocolate Chip Cookies',
      content: 'Ingredients: flour, sugar, butter, eggs, vanilla extract, chocolate chips. Instructions: Mix dry ingredients, cream butter and sugar, combine all, bake at 350°F for 10-12 minutes'
    },
    {
      id: '6',
      title: 'Book Recommendations',
      content: '1. "To Kill a Mockingbird" by Harper Lee, 2. "1984" by George Orwell, 3. "Pride and Prejudice" by Jane Austen, 4. "The Great Gatsby" by F. Scott Fitzgerald, 5. "One Hundred Years of Solitude" by Gabriel García Márquez'
    },
    {
      id: '7',
      title: 'Workout Routine',
      content: 'Monday: Chest and Triceps, Tuesday: Back and Biceps, Wednesday: Legs, Thursday: Shoulders and Abs, Friday: Full Body, Saturday: Cardio, Sunday: Rest'
    },
    {
      id: '8',
      title: 'Travel Bucket List',
      content: 'Machu Picchu (Peru), Northern Lights (Iceland), Great Barrier Reef (Australia), Santorini (Greece), Tokyo (Japan), Serengeti National Park (Tanzania), New York City (USA)'
    },
    {
      id: '9',
      title: 'Inspirational Quotes',
      content: '"Be the change you wish to see in the world." - Mahatma Gandhi, "The only way to do great work is to love what you do." - Steve Jobs, "In the middle of difficulty lies opportunity." - Albert Einstein'
    },
    {
      id: '10',
      title: 'Personal Goals for 2023',
      content: '1. Learn a new language, 2. Run a marathon, 3. Start a side business, 4. Read 24 books, 5. Volunteer at local community center, 6. Improve public speaking skills, 7. Adopt a more sustainable lifestyle'
    }
  ]
})
