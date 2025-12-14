import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { ArrowRightIcon } from '../components/icons'

type RecipeCategory = 'chinese' | 'japanese' | 'korean' | 'thai' | 'vietnamese' | 'indian'
type Difficulty = 'easy' | 'medium' | 'hard'

interface Recipe {
  id: number
  title: string
  category: RecipeCategory
  difficulty: Difficulty
  ingredients: string[]
}

interface GameState {
  currentRecipe: Recipe | null
  selectedIngredients: string[]
  score: number
  timeLeft: number
  streak: number
  isPlaying: boolean
  isFinished: boolean
  correctCount: number
  wrongCount: number
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Classic Pad Thai',
    category: 'thai',
    difficulty: 'medium',
    ingredients: ['Rice Noodles', 'Tamarind Paste', 'Fish Sauce', 'Bean Sprouts', 'Peanuts', 'Lime', 'Eggs']
  },
  {
    id: 2,
    title: 'Beef Bulgogi',
    category: 'korean',
    difficulty: 'easy',
    ingredients: ['Beef', 'Soy Sauce', 'Sesame Oil', 'Garlic', 'Ginger', 'Pear', 'Green Onions']
  },
  {
    id: 3,
    title: 'Chicken Teriyaki',
    category: 'japanese',
    difficulty: 'easy',
    ingredients: ['Chicken', 'Soy Sauce', 'Mirin', 'Sugar', 'Ginger', 'Garlic']
  },
  {
    id: 4,
    title: 'Mapo Tofu',
    category: 'chinese',
    difficulty: 'medium',
    ingredients: ['Tofu', 'Ground Pork', 'Sichuan Peppercorns', 'Doubanjiang', 'Soy Sauce', 'Garlic', 'Ginger']
  },
  {
    id: 5,
    title: 'Pho Bo',
    category: 'vietnamese',
    difficulty: 'hard',
    ingredients: ['Beef Bones', 'Rice Noodles', 'Star Anise', 'Cinnamon', 'Ginger', 'Fish Sauce', 'Bean Sprouts', 'Thai Basil']
  },
  {
    id: 6,
    title: 'Chicken Tikka Masala',
    category: 'indian',
    difficulty: 'medium',
    ingredients: ['Chicken', 'Yogurt', 'Tomatoes', 'Cream', 'Garam Masala', 'Ginger', 'Garlic', 'Onions']
  },
  {
    id: 7,
    title: 'Sushi Rolls',
    category: 'japanese',
    difficulty: 'hard',
    ingredients: ['Sushi Rice', 'Nori', 'Fish', 'Cucumber', 'Avocado', 'Rice Vinegar', 'Wasabi', 'Soy Sauce']
  },
  {
    id: 8,
    title: 'Kung Pao Chicken',
    category: 'chinese',
    difficulty: 'medium',
    ingredients: ['Chicken', 'Peanuts', 'Sichuan Peppercorns', 'Soy Sauce', 'Rice Wine', 'Garlic', 'Ginger', 'Dried Chilies']
  },
  {
    id: 9,
    title: 'Green Curry',
    category: 'thai',
    difficulty: 'medium',
    ingredients: ['Green Curry Paste', 'Coconut Milk', 'Thai Basil', 'Fish Sauce', 'Palm Sugar', 'Eggplant', 'Chicken']
  },
  {
    id: 10,
    title: 'Bibimbap',
    category: 'korean',
    difficulty: 'easy',
    ingredients: ['Rice', 'Beef', 'Carrots', 'Spinach', 'Bean Sprouts', 'Eggs', 'Gochujang', 'Sesame Oil']
  }
]

// All available ingredients (mix of correct and wrong ones)
const allIngredients = [
  'Rice Noodles', 'Tamarind Paste', 'Fish Sauce', 'Bean Sprouts', 'Peanuts', 'Lime', 'Eggs',
  'Beef', 'Soy Sauce', 'Sesame Oil', 'Garlic', 'Ginger', 'Pear', 'Green Onions',
  'Chicken', 'Mirin', 'Sugar',
  'Tofu', 'Ground Pork', 'Sichuan Peppercorns', 'Doubanjiang',
  'Beef Bones', 'Star Anise', 'Cinnamon', 'Thai Basil',
  'Yogurt', 'Tomatoes', 'Cream', 'Garam Masala', 'Onions',
  'Sushi Rice', 'Nori', 'Fish', 'Cucumber', 'Avocado', 'Rice Vinegar', 'Wasabi',
  'Dried Chilies', 'Green Curry Paste', 'Coconut Milk', 'Palm Sugar', 'Eggplant',
  'Rice', 'Carrots', 'Spinach', 'Gochujang',
  // Wrong ingredients
  'Milk', 'Bread', 'Cheese', 'Butter', 'Pasta', 'Olive Oil', 'Basil', 'Oregano', 'Potatoes', 'Corn'
]

export default function RecipeBuilder() {
  const { t } = useLanguage()
  const [gameState, setGameState] = useState<GameState>({
    currentRecipe: null,
    selectedIngredients: [],
    score: 0,
    timeLeft: 60,
    streak: 0,
    isPlaying: false,
    isFinished: false,
    correctCount: 0,
    wrongCount: 0
  })
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([])
  const [highScore, setHighScore] = useState<number>(0)
  const [cardPositions, setCardPositions] = useState<Array<{ x: number; y: number; vx: number; vy: number }>>([])
  const [scoreFeedback, setScoreFeedback] = useState<Array<{ id: number; x: number; y: number; text: string; type: 'correct' | 'bonus' }>>([])
  const [, setFeedbackId] = useState(0)
  const [isProcessingClick, setIsProcessingClick] = useState(false)
  const lastClickRef = useRef<{ ingredient: string; timestamp: number } | null>(null)
  const lastFeedbackRef = useRef<{ x: number; y: number; text: string; timestamp: number } | null>(null)

  useEffect(() => {
    const savedHighScore = localStorage.getItem('recipeBuilderHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10))
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (gameState.isPlaying && gameState.timeLeft > 0 && !gameState.isFinished) {
      interval = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            endGame()
            return { ...prev, timeLeft: 0, isFinished: true, isPlaying: false }
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 }
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameState.isPlaying, gameState.timeLeft, gameState.isFinished])

  // Animation loop for floating cards
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isFinished) return

    const animate = () => {
      setCardPositions(prev => prev.map((pos, idx) => {
        if (gameState.selectedIngredients.includes(availableIngredients[idx])) {
          return pos // Don't move selected cards
        }
        
        let newX = pos.x + pos.vx
        let newY = pos.y + pos.vy
        let newVx = pos.vx
        let newVy = pos.vy

        // Bounce off walls
        if (newX <= 0 || newX >= 90) {
          newVx = -newVx
          newX = Math.max(0, Math.min(90, newX))
        }
        if (newY <= 0 || newY >= 80) {
          newVy = -newVy
          newY = Math.max(0, Math.min(80, newY))
        }

        // Add slight random variation to movement
        newVx += (Math.random() - 0.5) * 0.05
        newVy += (Math.random() - 0.5) * 0.05

        // Limit velocity
        newVx = Math.max(-0.4, Math.min(0.4, newVx))
        newVy = Math.max(-0.4, Math.min(0.4, newVy))

        return { x: newX, y: newY, vx: newVx, vy: newVy }
      }))
    }

    const animationFrame = setInterval(animate, 50) // Update every 50ms for smooth movement
    return () => clearInterval(animationFrame)
  }, [gameState.isPlaying, gameState.isFinished, gameState.selectedIngredients, availableIngredients])

  const startGame = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    const wrongIngredients = allIngredients
      .filter(ing => !randomRecipe.ingredients.includes(ing))
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
    const shuffled = [...randomRecipe.ingredients, ...wrongIngredients].sort(() => Math.random() - 0.5)
    
    // Initialize positions and velocities for floating cards
    const positions = shuffled.map(() => ({
      x: Math.random() * 80 + 10, // Random starting x (10-90%)
      y: Math.random() * 70 + 10, // Random starting y (10-80%)
      vx: (Math.random() - 0.5) * 0.3, // Random velocity x (-0.15 to 0.15)
      vy: (Math.random() - 0.5) * 0.3, // Random velocity y (-0.15 to 0.15)
    }))
    
    setGameState({
      currentRecipe: randomRecipe,
      selectedIngredients: [],
      score: 0,
      timeLeft: 60,
      streak: 0,
      isPlaying: true,
      isFinished: false,
      correctCount: 0,
      wrongCount: 0
    })
    setAvailableIngredients(shuffled)
    setCardPositions(positions)
  }

  const endGame = () => {
    setGameState(prev => {
      const finalScore = prev.score
      if (finalScore > highScore) {
        setHighScore(finalScore)
        localStorage.setItem('recipeBuilderHighScore', finalScore.toString())
      }
      return { ...prev, isPlaying: false, isFinished: true }
    })
  }

  const handleIngredientClick = useCallback((ingredient: string, event: React.MouseEvent) => {
    if (!gameState.isPlaying || gameState.isFinished || !gameState.currentRecipe) return
    if (gameState.selectedIngredients.includes(ingredient)) return
    if (isProcessingClick) return // Prevent multiple rapid clicks

    // Prevent duplicate clicks on the same ingredient within 500ms
    const now = Date.now()
    if (lastClickRef.current && 
        lastClickRef.current.ingredient === ingredient && 
        now - lastClickRef.current.timestamp < 500) {
      return
    }
    lastClickRef.current = { ingredient, timestamp: now }

    // Prevent event propagation and default
    event.preventDefault()
    event.stopPropagation()
    
    setIsProcessingClick(true)
    
    const isCorrect = gameState.currentRecipe.ingredients.includes(ingredient)
    const newSelected = [...gameState.selectedIngredients, ingredient]
    const allCorrect = gameState.currentRecipe.ingredients.every(ing => newSelected.includes(ing))

    // Get mouse position for feedback
    const x = event.clientX
    const y = event.clientY

    setGameState(prev => {
      let newScore = prev.score
      let newStreak = prev.streak
      let newCorrect = prev.correctCount
      let newWrong = prev.wrongCount
      let feedbackText = ''
      let feedbackType: 'correct' | 'bonus' = 'correct'

      if (isCorrect) {
        let basePoints = 10
        let timeBonus = 0
        let streakBonus = 0
        let perfectBonus = 0
        
        newStreak += 1
        newCorrect += 1
        
        // Calculate all bonuses first
        if (newStreak >= 3 && newStreak % 3 === 0) {
          streakBonus = 20
        }
        
        if (prev.timeLeft < 20) {
          timeBonus = 5
        }
        
        if (allCorrect) {
          perfectBonus = 50
        }
        
        // Calculate total points
        newScore += basePoints + timeBonus + streakBonus + perfectBonus
        
        // Create single feedback message combining all bonuses
        if (allCorrect) {
          const totalPoints = basePoints + timeBonus + perfectBonus
          feedbackText = `PERFECT! +${totalPoints}`
          feedbackType = 'bonus'
        } else if (streakBonus > 0) {
          const totalPoints = basePoints + timeBonus + streakBonus
          feedbackText = `${newStreak} COMBO! +${totalPoints}`
          feedbackType = 'bonus'
        } else {
          const totalPoints = basePoints + timeBonus
          feedbackText = `+${totalPoints}`
        }

        // Add single feedback message - with strict duplicate prevention
        const now = Date.now()
        // Check if we just added the same feedback recently (within 100ms)
        if (lastFeedbackRef.current && 
            Math.abs(lastFeedbackRef.current.x - x) < 30 && 
            Math.abs(lastFeedbackRef.current.y - y) < 30 && 
            lastFeedbackRef.current.text === feedbackText &&
            now - lastFeedbackRef.current.timestamp < 100) {
          // Skip adding duplicate
        } else {
          lastFeedbackRef.current = { x, y, text: feedbackText, timestamp: now }
          
          setFeedbackId(prev => {
            const newId = prev
            setScoreFeedback(prevFeedback => {
              // Additional check for existing feedbacks
              const hasDuplicate = prevFeedback.some(f => 
                Math.abs(f.x - x) < 20 && Math.abs(f.y - y) < 20 && f.text === feedbackText
              )
              if (hasDuplicate) {
                return prevFeedback // Don't add duplicate
              }
              return [...prevFeedback, { id: newId, x, y, text: feedbackText, type: feedbackType }]
            })
            
            // Remove feedback after animation
            setTimeout(() => {
              setScoreFeedback(prevFeedback => prevFeedback.filter(f => f.id !== newId))
            }, 2000)
            
            return prev + 1
          })
        }
      } else {
        newScore = Math.max(0, newScore - 15)
        newStreak = 0
        newWrong += 1
        
        // Add single negative feedback - check for duplicates first
        const now = Date.now()
        // Check if we just added the same feedback recently
        if (lastFeedbackRef.current && 
            Math.abs(lastFeedbackRef.current.x - x) < 30 && 
            Math.abs(lastFeedbackRef.current.y - y) < 30 && 
            lastFeedbackRef.current.text === '-15' &&
            now - lastFeedbackRef.current.timestamp < 100) {
          // Skip adding duplicate
        } else {
          lastFeedbackRef.current = { x, y, text: '-15', timestamp: now }
          
          setFeedbackId(prev => {
            const newId = prev
            setScoreFeedback(prevFeedback => {
              // Check if there's already a feedback at this position
              const hasDuplicate = prevFeedback.some(f => 
                Math.abs(f.x - x) < 30 && Math.abs(f.y - y) < 30 && f.text === '-15'
              )
              if (hasDuplicate) {
                return prevFeedback // Don't add duplicate
              }
              return [...prevFeedback, { id: newId, x, y, text: '-15', type: 'correct' }]
            })
            
            // Remove feedback after animation
            setTimeout(() => {
              setScoreFeedback(prevFeedback => prevFeedback.filter(f => f.id !== newId))
            }, 2000)
            
            return prev + 1
          })
        }
      }

      return {
        ...prev,
        selectedIngredients: newSelected,
        score: newScore,
        streak: newStreak,
        correctCount: newCorrect,
        wrongCount: newWrong
      }
    })

    // Get next recipe if perfect (after state update)
    if (allCorrect && isCorrect) {
      setTimeout(() => {
        const nextRecipe = recipes[Math.floor(Math.random() * recipes.length)]
        const wrongIngredients = allIngredients
          .filter(ing => !nextRecipe.ingredients.includes(ing))
          .sort(() => Math.random() - 0.5)
          .slice(0, 8)
        const shuffled = [...nextRecipe.ingredients, ...wrongIngredients].sort(() => Math.random() - 0.5)
        
        // Reset positions for new recipe
        const newPositions = shuffled.map(() => ({
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        }))
        
        setGameState(prev => ({
          ...prev,
          currentRecipe: nextRecipe,
          selectedIngredients: [],
        }))
        setAvailableIngredients(shuffled)
        setCardPositions(newPositions)
        setIsProcessingClick(false)
      }, 1000)
    } else {
      // Re-enable clicking after a short delay
      setTimeout(() => {
        setIsProcessingClick(false)
      }, 300)
    }
  }, [gameState.isPlaying, gameState.isFinished, gameState.currentRecipe, gameState.selectedIngredients, gameState.timeLeft, isProcessingClick])

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center text-primary-dark hover:text-primary mb-4 text-sm font-medium">
                <ArrowRightIcon className="w-4 h-4 rotate-180 mr-2" />
                {t('games.back')}
              </Link>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                {t('games.recipeBuilder.title')}
              </h1>
              <p className="text-lg text-gray-600">
                {t('games.recipeBuilder.description')}
              </p>
            </div>

            {/* Game Stats */}
            {gameState.isPlaying && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-card rounded-xl p-4 text-center border-t-4 border-primary-dark">
                  <div className="text-2xl font-bold text-primary-dark">{gameState.score}</div>
                  <div className="text-sm text-gray-600">{t('games.score')}</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center border-t-4 border-primary-dark">
                  <div className="text-2xl font-bold text-primary-dark">{gameState.timeLeft}s</div>
                  <div className="text-sm text-gray-600">{t('games.time')}</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center border-t-4 border-primary-dark">
                  <div className="text-2xl font-bold text-primary-dark">{gameState.streak}</div>
                  <div className="text-sm text-gray-600">{t('games.streak')}</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center border-t-4 border-primary-dark">
                  <div className="text-2xl font-bold text-primary-dark">{highScore}</div>
                  <div className="text-sm text-gray-600">{t('games.highScore')}</div>
                </div>
              </div>
            )}

            {/* Score Feedback Overlay */}
            {scoreFeedback.map((feedback) => (
              <div
                key={`feedback-${feedback.id}-${feedback.x}-${feedback.y}`}
                className={`fixed pointer-events-none z-50 text-2xl font-bold transition-all duration-2000 ${
                  feedback.type === 'bonus' ? 'text-yellow-600' : 
                  feedback.text.startsWith('-') ? 'text-red-600' : 'text-primary-dark'
                }`}
                style={{
                  left: `${feedback.x}px`,
                  top: `${feedback.y}px`,
                  transform: 'translate(-50%, -50%)',
                  animation: 'fadeUp 2s ease-out forwards',
                }}
              >
                {feedback.text}
              </div>
            ))}

            {/* Game Area */}
            {!gameState.isPlaying && !gameState.isFinished && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center border-2 border-primary-dark relative overflow-hidden">
                {/* Decorative dark green accents */}
                <div className="absolute top-0 left-0 w-full h-2 bg-primary-dark"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-dark/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-dark/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                
                <div className="relative z-10 mb-6">
                  <div className="w-20 h-20 bg-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-primary-dark/30">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center justify-center">
                    <span className="w-12 h-1 bg-primary-dark mr-3 rounded-full"></span>
                    {t('games.recipeBuilder.instructions')}
                    <span className="w-12 h-1 bg-primary-dark ml-3 rounded-full"></span>
                  </h2>
                  <div className="text-left max-w-md mx-auto space-y-3 text-gray-600 mb-6">
                    <div className="bg-primary-dark/5 rounded-lg p-4 border-l-4 border-primary-dark">
                      <p className="flex items-start">
                        <span className="text-primary-dark mr-2 font-bold text-lg">•</span>
                        <span>{t('games.recipeBuilder.rule1')}</span>
                      </p>
                    </div>
                    <div className="bg-primary-dark/5 rounded-lg p-4 border-l-4 border-primary-dark">
                      <p className="flex items-start">
                        <span className="text-primary-dark mr-2 font-bold text-lg">•</span>
                        <span>{t('games.recipeBuilder.rule2')}</span>
                      </p>
                    </div>
                    <div className="bg-primary-dark/5 rounded-lg p-4 border-l-4 border-primary-dark">
                      <p className="flex items-start">
                        <span className="text-primary-dark mr-2 font-bold text-lg">•</span>
                        <span>{t('games.recipeBuilder.rule3')}</span>
                      </p>
                    </div>
                    <div className="bg-primary-dark/5 rounded-lg p-4 border-l-4 border-primary-dark">
                      <p className="flex items-start">
                        <span className="text-primary-dark mr-2 font-bold text-lg">•</span>
                        <span>{t('games.recipeBuilder.rule4')}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="relative z-10 bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl border-2 border-primary-dark hover:scale-105"
                >
                  {t('games.start')}
                </button>
              </div>
            )}

            {/* Playing State */}
            {gameState.isPlaying && gameState.currentRecipe && (
              <div className="space-y-6">
                {/* Current Recipe */}
                <div className="glass-card rounded-2xl p-6 border-l-4 border-primary-dark">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{gameState.currentRecipe.title}</h2>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">{t('games.recipeBuilder.selectIngredients')}</p>
                    <div className="flex flex-wrap gap-2">
                      {gameState.currentRecipe.ingredients.map((ing, idx) => (
                        <div
                          key={idx}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            gameState.selectedIngredients.includes(ing)
                              ? 'bg-primary-dark/20 text-primary-dark border-2 border-primary-dark'
                              : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
                          }`}
                        >
                          {ing}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Ingredients Container */}
                <div className="glass-card rounded-2xl p-6 relative overflow-hidden border-2 border-primary-dark/20" style={{ minHeight: '400px' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-primary-dark mr-3 rounded-full"></span>
                    {t('games.recipeBuilder.availableIngredients')}
                  </h3>
                  <div className="relative w-full h-full" style={{ minHeight: '350px' }}>
                    {availableIngredients.map((ingredient, idx) => {
                      const isSelected = gameState.selectedIngredients.includes(ingredient)
                      const isCorrect = gameState.currentRecipe?.ingredients.includes(ingredient) ?? false
                      const isWrong = isSelected && !isCorrect
                      const position = cardPositions[idx] || { x: 50, y: 50, vx: 0, vy: 0 }
                      
                      return (
                        <button
                          key={`${ingredient}-${idx}`}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleIngredientClick(ingredient, e)
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          disabled={isSelected || isProcessingClick}
                          className={`absolute p-3 rounded-xl font-medium text-sm transition-all cursor-pointer z-10 ${
                            isSelected && isCorrect
                              ? 'bg-primary-dark/20 text-primary-dark border-2 border-primary-dark cursor-not-allowed opacity-60'
                              : isWrong
                              ? 'bg-red-100 text-red-700 border-2 border-red-300 cursor-not-allowed opacity-60'
                              : 'bg-white text-gray-700 border-2 border-primary-dark/30 hover:border-primary-dark hover:bg-primary-dark/10 hover:shadow-lg hover:scale-110'
                          }`}
                          style={{
                            top: `${position.y}%`,
                            left: `${position.x}%`,
                            transform: isSelected ? 'scale(0.8)' : 'translate(-50%, -50%)',
                            transition: isSelected ? 'all 0.3s ease' : 'none',
                          }}
                        >
                          {ingredient}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Finished State */}
            {gameState.isFinished && (
              <div className="glass-card rounded-2xl p-8 md:p-12 text-center border-2 border-primary-dark">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('games.gameOver')}</h2>
                  <p className="text-4xl font-bold text-primary-dark mb-6">{gameState.score} {t('games.points')}</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                    <div className="bg-primary-dark/10 rounded-lg p-4 border-2 border-primary-dark/30">
                      <div className="text-2xl font-bold text-primary-dark">{gameState.correctCount}</div>
                      <div className="text-sm text-gray-600">{t('games.correct')}</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                      <div className="text-2xl font-bold text-red-700">{gameState.wrongCount}</div>
                      <div className="text-sm text-gray-600">{t('games.wrong')}</div>
                    </div>
                  </div>
                  {gameState.score >= highScore && gameState.score > 0 && (
                    <p className="text-lg font-semibold text-primary-dark mb-4 bg-primary-dark/10 px-4 py-2 rounded-lg inline-block">🎉 {t('games.newHighScore')}!</p>
                  )}
                </div>
                <button
                  onClick={startGame}
                  className="bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary transition-all shadow-lg hover:shadow-xl border-2 border-primary-dark"
                >
                  {t('games.playAgain')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

