import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Calendar, Activity, Zap } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Statistics = () => {
  const { isDark, habits } = useAppContext()

  const totalHabits = habits.length
  const completedToday = habits.filter((h) => h.completed).length
  const completionRate = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0

  const longestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0)
  const totalCompletions = habits.reduce((sum, h) => sum + (h.history?.length || 0), 0)

  // Dummy data for weekly chart
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weeklyData = [40, 70, 45, 90, 65, 80, completionRate] // Mocked trend ending with today

  return (
    <motion.div
      className="px-6 py-8 sm:px-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Statistics & Insights</h1>
        <p className={['mt-2 text-base', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
          Track your progress and build better habits over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Stats Cards */}
        <motion.div
          whileHover={{ y: -4 }}
          className={['p-6 rounded-3xl border backdrop-blur-md relative overflow-hidden', isDark ? 'bg-purple-900/10 border-purple-900/30' : 'bg-purple-50 border-purple-100'].join(' ')}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className={['text-sm font-medium', isDark ? 'text-purple-300' : 'text-purple-700'].join(' ')}>Completion Rate</p>
              <h3 className="text-4xl font-bold mt-1">{completionRate}%</h3>
            </div>
            <div className={['p-3 rounded-2xl', isDark ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-200 text-purple-700'].join(' ')}>
              <Activity size={24} />
            </div>
          </div>
          <div className="w-full bg-black/10 rounded-full h-1.5 mt-6">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={['p-6 rounded-3xl border backdrop-blur-md relative overflow-hidden', isDark ? 'bg-orange-900/10 border-orange-900/30' : 'bg-orange-50 border-orange-100'].join(' ')}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className={['text-sm font-medium', isDark ? 'text-orange-300' : 'text-orange-700'].join(' ')}>Longest Streak</p>
              <h3 className="text-4xl font-bold mt-1">{longestStreak} <span className="text-xl">days</span></h3>
            </div>
            <div className={['p-3 rounded-2xl', isDark ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-200 text-orange-700'].join(' ')}>
              <TrendingUp size={24} />
            </div>
          </div>
          <p className={['text-sm mt-6', isDark ? 'text-orange-400/80' : 'text-orange-600/80'].join(' ')}>Keep the momentum going!</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={['p-6 rounded-3xl border backdrop-blur-md relative overflow-hidden', isDark ? 'bg-blue-900/10 border-blue-900/30' : 'bg-blue-50 border-blue-100'].join(' ')}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className={['text-sm font-medium', isDark ? 'text-blue-300' : 'text-blue-700'].join(' ')}>Total Completions</p>
              <h3 className="text-4xl font-bold mt-1">{totalCompletions}</h3>
            </div>
            <div className={['p-3 rounded-2xl', isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-200 text-blue-700'].join(' ')}>
              <Award size={24} />
            </div>
          </div>
          <p className={['text-sm mt-6', isDark ? 'text-blue-400/80' : 'text-blue-600/80'].join(' ')}>All time habits completed.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <div className={['p-6 rounded-3xl border backdrop-blur-sm', isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'].join(' ')}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold">Weekly Performance</h3>
            <div className="flex gap-2 items-center text-sm font-medium text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full">
              <TrendingUp size={14} /> +12%
            </div>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2">
            {weeklyData.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: 0.2 + (idx * 0.1), type: 'spring', stiffness: 100 }}
                  className="w-full max-w-[40px] bg-gradient-to-t from-purple-600 to-indigo-400 rounded-t-xl opacity-90 hover:opacity-100 cursor-pointer transition-opacity relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {val}%
                  </div>
                </motion.div>
                <span className={['text-xs font-medium', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>{weekDays[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Habit Streaks List */}
        <div className={['p-6 rounded-3xl border backdrop-blur-sm', isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'].join(' ')}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Habits</h3>
          </div>
          <div className="space-y-4">
            {habits.slice().sort((a, b) => b.streak - a.streak).slice(0, 4).map((habit, idx) => (
              <div key={habit.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white bg-${habit.colorId}-400`}>
                     {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{habit.title}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-orange-400" />
                  <span className="font-bold">{habit.streak}</span>
                </div>
              </div>
            ))}
            {habits.length === 0 && (
              <div className="text-center py-8 text-gray-500">No habits tracked yet.</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Statistics
