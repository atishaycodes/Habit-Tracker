import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  Repeat2,
  CalendarDays,
  Target,
  BarChart3,
  Lightbulb,
  Clock3,
  CheckSquare,
  Settings,
  Plus,
  Sun,
  Moon,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isDark,
    toggleTheme,
    habits,
    setQuickAddModal,
    exportDataJSON,
    toggleHabitCompletion,
  } = useAppContext()

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isCommandPaletteOpen])

  const navigationCommands = [
    { id: 'p_dash', title: 'Go to Overview', icon: LayoutDashboard, category: 'Navigation', action: () => navigate('/dashboard') },
    { id: 'p_habits', title: 'Go to Habits', icon: Repeat2, category: 'Navigation', action: () => navigate('/habits') },
    { id: 'p_routines', title: 'Go to Routines', icon: Layers, category: 'Navigation', action: () => navigate('/routines') },
    { id: 'p_tasks', title: 'Go to Tasks', icon: CheckSquare, category: 'Navigation', action: () => navigate('/tasks') },
    { id: 'p_focus', title: 'Go to Focus Timer', icon: Clock3, category: 'Navigation', action: () => navigate('/focus') },
    { id: 'p_cal', title: 'Go to Calendar', icon: CalendarDays, category: 'Navigation', action: () => navigate('/calendar') },
    { id: 'p_goals', title: 'Go to Goals', icon: Target, category: 'Navigation', action: () => navigate('/goals') },
    { id: 'p_analytics', title: 'Go to Analytics', icon: BarChart3, category: 'Navigation', action: () => navigate('/analytics') },
    { id: 'p_insights', title: 'Go to Insights', icon: Lightbulb, category: 'Navigation', action: () => navigate('/insights') },
    { id: 'p_settings', title: 'Go to Settings', icon: Settings, category: 'Navigation', action: () => navigate('/settings') },
  ]

  const actionCommands = [
    {
      id: 'a_new_habit',
      title: 'Add Habit...',
      icon: Plus,
      category: 'Actions',
      action: () => setQuickAddModal({ isOpen: true, type: 'habit', timeOfDay: null }),
    },
    {
      id: 'a_new_task',
      title: 'Add Task...',
      icon: CheckSquare,
      category: 'Actions',
      action: () => setQuickAddModal({ isOpen: true, type: 'task', timeOfDay: null }),
    },
    {
      id: 'a_toggle_theme',
      title: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
      icon: isDark ? Sun : Moon,
      category: 'Actions',
      action: toggleTheme,
    },
    {
      id: 'a_export',
      title: 'Export Backup JSON',
      icon: ArrowRight,
      category: 'Actions',
      action: exportDataJSON,
    },
  ]

  const habitCommands = habits.slice(0, 6).map((h) => ({
    id: `habit_${h.id}`,
    title: `${h.completed ? '✓ ' : '○ '} ${h.title}`,
    icon: Flame,
    category: 'Habits',
    action: () => {
      toggleHabitCompletion(h.id)
    },
  }))

  const allCommands = [...actionCommands, ...navigationCommands, ...habitCommands]

  const filteredCommands = query.trim() === ''
    ? allCommands
    : allCommands.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = filteredCommands[selectedIndex]
      if (selected) {
        selected.action()
        setIsCommandPaletteOpen(false)
      }
    }
  }

  if (!isCommandPaletteOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsCommandPaletteOpen(false)}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden z-10">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to page..."
            className="flex-1 bg-transparent text-xs text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-1.5">
          {filteredCommands.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-400">
              No results for "{query}"
            </p>
          ) : (
            filteredCommands.map((item, index) => {
              const Icon = item.icon
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action()
                    setIsCommandPaletteOpen(false)
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                    <span className="truncate">{item.title}</span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono uppercase ml-2 shrink-0">
                    {item.category}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
