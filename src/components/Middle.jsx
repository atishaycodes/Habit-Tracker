import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Flame,
  TrendingUp,
  Trophy,
  Book,
  Droplet,
  Zap,
  Code,
  CheckCircle,
  Circle,
  MoreVertical,
} from 'lucide-react'

const initialHabits = [
  {
    id: 1,
    title: 'Morning Workout',
    streak: 12,
    icon: Zap,
    color: 'bg-green-400',
    completed: true,
  },
  {
    id: 2,
    title: 'Read 20 Pages',
    streak: 7,
    icon: Book,
    color: 'bg-blue-400',
    completed: true,
  },
  {
    id: 3,
    title: 'Drink 2L Water',
    streak: 3,
    icon: Droplet,
    color: 'bg-purple-400',
    completed: false,
  },
  {
    id: 4,
    title: 'Meditation',
    streak: 5,
    icon: Flame,
    color: 'bg-orange-400',
    completed: true,
  },
  {
    id: 5,
    title: 'Code for 1 Hour',
    streak: 2,
    icon: Code,
    color: 'bg-red-400',
    completed: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 24 },
  },
}

const Middle = () => {
  const [habits, setHabits] = useState(initialHabits)
  const [search, setSearch] = useState("")
  
  const [showMessage, setShowMessage] = useState(false)

  const toggleHabit = (id) => {
    setHabits((prev) => {
      const next = prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
      const toggled = next.find((h) => h.id === id)
      // Only celebrate when marking complete (not when undoing)
      if (toggled?.completed) {
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 2000)
      }
      return next
    })
  }

  const hour = new Date().getHours()
  let greeting = ''
  let emoji = ''

  if (hour < 12) {
    greeting = 'Good Morning'
    emoji = '☀️'
  } else if (hour < 17) {
    greeting = 'Good Afternoon'
    emoji = '🌤️'
  } else {
    greeting = 'Good Evening'
    emoji = '🌙'
  }

  const totalHabits = habits.length
  const completedToday = habits.filter((habit) => habit.completed).length
  const currentStreak = habits.length ? Math.max(...habits.map((h) => h.streak)) : 0
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0)
  const progressPercent = totalHabits ? (completedToday / totalHabits) * 100 : 0

  const overviewData = [
    {
      id: 1,
      title: 'Total Habits',
      value: totalHabits,
      icon: Target,
      bg: 'bg-purple-100',
      color: 'text-purple-600',
    },
    {
      id: 2,
      title: 'Completed Today',
      value: completedToday,
      icon: Flame,
      bg: 'bg-green-100',
      color: 'text-green-600',
    },
    {
      id: 3,
      title: 'Current Streak',
      value: currentStreak,
      icon: TrendingUp,
      bg: 'bg-orange-100',
      color: 'text-orange-500',
    },
    {
      id: 4,
      title: 'Best Streak',
      value: bestStreak,
      icon: Trophy,
      bg: 'bg-blue-100',
      color: 'text-blue-500',
    },
  ]

  return (
    <motion.div
      className="px-6 py-6 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1 className="text-3xl font-bold sm:text-4xl">
          {greeting}, Atishay
        </h1>
        <span className="text-3xl" aria-hidden="true">
          {emoji}
        </span>
      </motion.div>

      <motion.p
        className="mt-2 text-base text-gray-500 sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
      >
        Let&apos;s build some great habits today.
      </motion.p>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            key="habit-toast"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 rounded-lg bg-green-600 px-4 py-3 text-white"
          >
            🎉 Habit Completed!
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="mt-8 text-xl font-semibold sm:mt-10 sm:text-2xl">Overview</h2>

      <motion.div
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {overviewData.map((item) => {
          const Icon = item.icon

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="cursor-default rounded-xl bg-[#161B2D] p-5 shadow-lg sm:p-6"
            >
              <motion.div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${item.bg}`}
                whileHover={{ rotate: 8, scale: 1.08 }}
              >
                <Icon className={item.color} size={24} />
              </motion.div>

              <h3 className="mt-5 text-3xl font-bold text-white sm:mt-6 sm:text-4xl">
                {item.value}
              </h3>

              <p className="mt-2 text-sm text-gray-400 sm:text-base">{item.title}</p>
            </motion.div>
          )
        })}
      </motion.div>
      <div className='mt-4'>
        <input type="text" placeholder='Search habits...'  value = {search} onChange={(e)=> setSearch(e.target.value)} className='w-full rounded-lg bg-[#161B2D] px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500'/>
      </div>

      <h2 className="mt-8 text-xl font-semibold sm:text-2xl">Today&apos;s Habits</h2>

      <div className="mt-4 mb-5">
        <div className="mb-2 flex justify-between text-sm text-gray-400">
          <span>Today&apos;s Progress</span>
          <span>
            {completedToday}/{totalHabits}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
          <motion.div
            className="h-2 rounded-full bg-purple-500"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <motion.div
        className="space-y-3 pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {habits
    .filter((h) =>
        h.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((h) => {
          const Icon = h.icon

          return (
            <motion.div
              key={h.id}
              variants={itemVariants}
              whileHover={{ x: 4, backgroundColor: 'rgba(22, 27, 45, 1)' }}
              layout
              className="flex items-center justify-between gap-4 rounded-lg bg-[#0f1724] p-4 shadow-md"
            >
              <div className="flex min-w-0 items-center gap-4">
                <motion.div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${h.color}`}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className="text-white" size={20} />
                </motion.div>

                <div className="min-w-0">
                  <div
                    className={`truncate text-base font-medium sm:text-lg ${
                      h.completed ? 'text-gray-500 line-through' : 'text-white'
                    }`}
                  >
                    {h.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    🔥 {h.streak} day streak
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                <motion.button
                  type="button"
                  onClick={() => toggleHabit(h.id)}
                  aria-label={h.completed ? 'Mark incomplete' : 'Mark complete'}
                  className="rounded-full p-2 transition-colors hover:bg-white/5"
                  whileTap={{ scale: 0.85 }}
                >
                  {h.completed ? (
                    <CheckCircle className="text-green-400" size={22} />
                  ) : (
                    <Circle className="text-gray-500" size={22} />
                  )}
                </motion.button>

                <button type="button" aria-label="menu" className="rounded-full p-2">
                  <MoreVertical className="text-gray-500" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default Middle
