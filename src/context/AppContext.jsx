import React, { createContext, useContext, useEffect, useState } from 'react'
import { Zap, Book, Droplet, Flame, Code, Heart, Coffee, Moon } from 'lucide-react'

const AppContext = createContext()

export const ICON_OPTIONS = [
  { id: 'zap', label: 'Energy', Icon: Zap },
  { id: 'book', label: 'Read', Icon: Book },
  { id: 'droplet', label: 'Water', Icon: Droplet },
  { id: 'flame', label: 'Focus', Icon: Flame },
  { id: 'code', label: 'Code', Icon: Code },
  { id: 'heart', label: 'Health', Icon: Heart },
  { id: 'coffee', label: 'Routine', Icon: Coffee },
  { id: 'moon', label: 'Rest', Icon: Moon },
]

export const COLOR_OPTIONS = [
  { id: 'green', className: 'bg-green-400' },
  { id: 'blue', className: 'bg-blue-400' },
  { id: 'purple', className: 'bg-purple-400' },
  { id: 'orange', className: 'bg-orange-400' },
  { id: 'red', className: 'bg-red-400' },
  { id: 'pink', className: 'bg-pink-400' },
  { id: 'teal', className: 'bg-teal-400' },
  { id: 'yellow', className: 'bg-yellow-400' },
]

const defaultHabits = [
  {
    id: 1,
    title: 'Morning Workout',
    streak: 12,
    iconId: 'zap',
    colorId: 'green',
    completed: true,
    history: ['2023-10-01', '2023-10-02'], // Mock history for testing if needed
  },
  {
    id: 2,
    title: 'Read 20 Pages',
    streak: 7,
    iconId: 'book',
    colorId: 'blue',
    completed: true,
    history: [],
  },
  {
    id: 3,
    title: 'Drink 2L Water',
    streak: 3,
    iconId: 'droplet',
    colorId: 'purple',
    completed: false,
    history: [],
  },
]

const defaultUserSettings = {
  name: 'Atishay',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
  notificationsEnabled: true,
}

export const AppProvider = ({ children }) => {
  // --- Theme State ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })
  const isDark = theme === 'dark'

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.style.colorScheme = theme
    document.body.style.backgroundColor = isDark ? '#030712' : '#f9fafb'
  }, [theme, isDark])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // --- User Settings State ---
  const [userSettings, setUserSettings] = useState(() => {
    const saved = localStorage.getItem('userSettings')
    return saved ? JSON.parse(saved) : defaultUserSettings
  })

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(userSettings))
  }, [userSettings])

  const updateUserSettings = (newSettings) => {
    setUserSettings((prev) => ({ ...prev, ...newSettings }))
  }

  // --- Habits State ---
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : defaultHabits
  })

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = (habitData) => {
    const newHabit = {
      ...habitData,
      id: Date.now(), // Simple unique ID
      streak: 0,
      completed: false,
      history: [],
    }
    setHabits((prev) => [...prev, newHabit])
  }

  const editHabit = (id, updatedData) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...updatedData } : habit))
    )
  }

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }

  const toggleHabitCompletion = (id) => {
    const todayStr = new Date().toISOString().split('T')[0]
    setHabits((prev) => {
      return prev.map((habit) => {
        if (habit.id === id) {
          const isCompleted = !habit.completed
          let newStreak = habit.streak
          let newHistory = [...(habit.history || [])]

          if (isCompleted) {
            newStreak += 1
            if (!newHistory.includes(todayStr)) {
                newHistory.push(todayStr)
            }
          } else {
            newStreak = Math.max(0, newStreak - 1)
            newHistory = newHistory.filter(date => date !== todayStr)
          }

          return { ...habit, completed: isCompleted, streak: newStreak, history: newHistory }
        }
        return habit
      })
    })
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        userSettings,
        updateUserSettings,
        habits,
        addHabit,
        editHabit,
        deleteHabit,
        toggleHabitCompletion,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
