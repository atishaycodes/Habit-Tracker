import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Flame,
  TrendingUp,
  Trophy,
  CheckCircle,
  Circle,
  MoreVertical,
  Plus,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import { useAppContext, ICON_OPTIONS, COLOR_OPTIONS } from '../context/AppContext'

const getIcon = (iconId) =>
  ICON_OPTIONS.find((option) => option.id === iconId)?.Icon ?? Zap

const getColorClass = (colorId) =>
  COLOR_OPTIONS.find((option) => option.id === colorId)?.className ?? 'bg-purple-400'

const emptyForm = {
  title: '',
  iconId: 'zap',
  colorId: 'purple',
}

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

const HabitModal = ({ isDark, mode, form, onChange, onClose, onSubmit }) => {
  const titleRef = useRef(null)
  const isEdit = mode === 'edit'

  useEffect(() => {
    titleRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const handleSubmit = (event) => {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) return
    onSubmit({ ...form, title })
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="habit-modal-title"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        className={[
          'relative z-10 w-full max-w-md rounded-2xl border p-5 shadow-2xl sm:p-6 backdrop-blur-xl',
          isDark
            ? 'border-gray-800 bg-gray-900/90 text-gray-100'
            : 'border-gray-200 bg-white/90 text-gray-950',
        ].join(' ')}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 id="habit-modal-title" className="text-xl font-semibold">
              {isEdit ? 'Edit Habit' : 'Add Habit'}
            </h3>
            <p className={['mt-1 text-sm', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
              {isEdit ? 'Update this habit details.' : 'Create a new habit to track.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={[
              'rounded-full p-2 transition-colors',
              isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100',
            ].join(' ')}
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="habit-title"
              className={['mb-2 block text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-700'].join(' ')}
            >
              Habit name
            </label>
            <input
              ref={titleRef}
              id="habit-title"
              type="text"
              value={form.title}
              onChange={(event) => onChange({ ...form, title: event.target.value })}
              placeholder="e.g. Morning stretch"
              maxLength={60}
              className={[
                'w-full rounded-xl border px-4 py-3 outline-none transition-colors focus:ring-2 focus:ring-purple-500',
                isDark
                  ? 'border-gray-700 bg-gray-950/50 text-white placeholder-gray-500'
                  : 'border-gray-200 bg-gray-50 text-gray-950 placeholder-gray-400',
              ].join(' ')}
            />
          </div>

          <div>
            <p className={['mb-2 text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-700'].join(' ')}>
              Icon
            </p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {ICON_OPTIONS.map(({ id, label, Icon }) => {
                const selected = form.iconId === id
                return (
                  <button
                    key={id}
                    type="button"
                    title={label}
                    aria-label={label}
                    aria-pressed={selected}
                    onClick={() => onChange({ ...form, iconId: id })}
                    className={[
                      'flex h-11 w-full items-center justify-center rounded-xl border transition-colors',
                      selected
                        ? 'border-purple-500 bg-purple-500/15 text-purple-400'
                        : isDark
                          ? 'border-gray-700 bg-gray-950/50 text-gray-400 hover:border-gray-600'
                          : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300',
                    ].join(' ')}
                  >
                    <Icon size={18} />
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className={['mb-2 text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-700'].join(' ')}>
              Color
            </p>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map(({ id, className }) => {
                const selected = form.colorId === id
                return (
                  <button
                    key={id}
                    type="button"
                    aria-label={`Color ${id}`}
                    aria-pressed={selected}
                    onClick={() => onChange({ ...form, colorId: id })}
                    className={[
                      'h-9 w-9 rounded-full transition-transform',
                      className,
                      selected ? 'scale-110 ring-2 ring-purple-400 ring-offset-2' : '',
                      selected && isDark ? 'ring-offset-gray-900' : '',
                      selected && !isDark ? 'ring-offset-white' : '',
                    ].join(' ')}
                  />
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className={[
                'rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                isDark
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
              ].join(' ')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!form.title.trim()}
              className="rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isEdit ? 'Save Changes' : 'Add Habit'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

const Dashboard = () => {
  const { isDark, userSettings, habits, addHabit, editHabit, deleteHabit, toggleHabitCompletion } = useAppContext()
  const [search, setSearch] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [toastText, setToastText] = useState('🎉 Habit Completed!')
  const [filter, setFilter] = useState('all')
  const [menuOpenId, setMenuOpenId] = useState(null)
  const [modalMode, setModalMode] = useState(null) // 'add' | 'edit' | null
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const menuRef = useRef(null)

  useEffect(() => {
    if (menuOpenId == null) return

    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpenId(null)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpenId])

  const showToast = (message) => {
    setToastText(message)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 2000)
  }

  const handleToggleHabit = (id) => {
    toggleHabitCompletion(id)
    const toggled = habits.find((h) => h.id === id)
    if (!toggled?.completed) { // Notice the inverse logic because state update is async, toggled is old state
      showToast('🎉 Habit Completed!')
    }
  }

  const openAddModal = () => {
    setModalMode('add')
    setEditingId(null)
    setForm(emptyForm)
    setMenuOpenId(null)
  }

  const openEditModal = (habit) => {
    setModalMode('edit')
    setEditingId(habit.id)
    setForm({
      title: habit.title,
      iconId: habit.iconId,
      colorId: habit.colorId,
    })
    setMenuOpenId(null)
  }

  const closeModal = () => {
    setModalMode(null)
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleSaveHabit = (values) => {
    if (modalMode === 'add') {
      addHabit(values)
      showToast('✨ Habit added!')
    }

    if (modalMode === 'edit' && editingId != null) {
      editHabit(editingId, values)
      showToast('✏️ Habit updated!')
    }

    closeModal()
  }

  const handleDeleteHabit = (id) => {
    const habit = habits.find((item) => item.id === id)
    const confirmed = window.confirm(
      `Delete "${habit?.title ?? 'this habit'}"? This cannot be undone.`
    )
    if (!confirmed) {
      setMenuOpenId(null)
      return
    }

    deleteHabit(id)
    setMenuOpenId(null)
    showToast('🗑️ Habit deleted')
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

  const filteredHabits = habits
    .filter((h) => h.title.toLowerCase().includes(search.toLowerCase()))
    .filter((h) => {
      if (filter === 'completed') return h.completed
      if (filter === 'pending') return !h.completed
      return true
    })

  const overviewData = [
    {
      id: 1,
      title: 'Total Habits',
      value: totalHabits,
      icon: Target,
      bg: isDark ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-600',
    },
    {
      id: 2,
      title: 'Completed Today',
      value: completedToday,
      icon: Flame,
      bg: isDark ? 'bg-green-900/40 text-green-400' : 'bg-green-100 text-green-600',
    },
    {
      id: 3,
      title: 'Current Streak',
      value: currentStreak,
      icon: TrendingUp,
      bg: isDark ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-100 text-orange-500',
    },
    {
      id: 4,
      title: 'Best Streak',
      value: bestStreak,
      icon: Trophy,
      bg: isDark ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-500',
    },
  ]

  return (
    <motion.div
      className="px-6 py-6 sm:px-8 relative"
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
        <h1 className="text-3xl font-bold sm:text-4xl tracking-tight">
          {greeting}, <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">{userSettings.name}</span>
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
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            className="absolute top-6 right-6 z-50 rounded-xl bg-gray-900/90 px-5 py-3 text-white shadow-2xl backdrop-blur-md border border-gray-700 flex items-center gap-2"
          >
            {toastText}
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
              className={[
                'cursor-default rounded-2xl border p-5 shadow-sm transition-colors duration-300 sm:p-6 backdrop-blur-sm',
                isDark
                  ? 'border-gray-800/60 bg-[#161B2D]/80 shadow-black/20'
                  : 'border-gray-200/80 bg-white/80 shadow-gray-200/80',
              ].join(' ')}
            >
              <motion.div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}
                whileHover={{ rotate: 8, scale: 1.08 }}
              >
                <Icon size={24} />
              </motion.div>

              <h3
                className={[
                  'mt-5 text-3xl font-bold sm:mt-6 sm:text-4xl',
                  isDark ? 'text-white' : 'text-gray-950',
                ].join(' ')}
              >
                {item.value}
              </h3>

              <p className={['mt-2 text-sm sm:text-base font-medium', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
                {item.title}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="mt-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={[
              'w-full rounded-2xl border px-5 py-3.5 outline-none transition-colors focus:ring-2 focus:ring-purple-500 backdrop-blur-sm',
              isDark
                ? 'border-gray-800/60 bg-[#161B2D]/60 text-white placeholder-gray-500'
                : 'border-gray-200 bg-white/80 text-gray-950 placeholder-gray-400',
            ].join(' ')}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold sm:text-2xl">Today&apos;s Habits</h2>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500 hover:shadow-purple-500/40 active:scale-95"
        >
          <Plus size={18} />
          Add Habit
        </button>
      </div>

      <div className="mt-5 mb-6">
        <div className={['mb-2 flex justify-between text-sm font-medium', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
          <span>Today&apos;s Progress</span>
          <span>
            {completedToday}/{totalHabits}
          </span>
        </div>
        <div className={['h-2.5 overflow-hidden rounded-full shadow-inner', isDark ? 'bg-gray-800/80' : 'bg-gray-200'].join(' ')}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <div className="space-y-3 overflow-visible pb-12">
        <div className="mt-4 flex flex-wrap gap-2">
          {['all', 'completed', 'pending'].map((filterType) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -1 }}
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                filter === filterType
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : isDark
                    ? 'bg-[#161B2D]/60 text-gray-300 hover:bg-[#161B2D]'
                    : 'border border-gray-200 bg-white/60 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </motion.button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {filteredHabits.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={[
                'rounded-2xl border border-dashed px-4 py-12 text-center mt-4 backdrop-blur-sm',
                isDark ? 'border-gray-700/50 bg-gray-900/20 text-gray-400' : 'border-gray-300 bg-gray-50/50 text-gray-500',
              ].join(' ')}
            >
              <Target size={40} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-gray-900 dark:text-gray-200">No habits found</p>
              <p className="mt-1 text-sm">Try a different filter, or add a new habit.</p>
              <button
                type="button"
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600/10 px-5 py-2.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-600/20 transition-colors"
              >
                <Plus size={16} />
                Add Habit
              </button>
            </motion.div>
          ) : (
            <div className="space-y-3 mt-4">
              {filteredHabits.map((h) => {
                const Icon = getIcon(h.iconId)
                const colorClass = getColorClass(h.colorId)
                const menuOpen = menuOpenId === h.id

                return (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    whileHover={{
                      y: -2,
                      scale: 1.01,
                      boxShadow: isDark
                        ? '0 12px 24px rgba(0, 0, 0, 0.4)'
                        : '0 12px 24px rgba(15, 23, 42, 0.08)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className={[
                      'habit-row relative flex items-center justify-between gap-4 overflow-visible rounded-2xl border p-4 transition-all duration-300 backdrop-blur-sm',
                      menuOpen ? 'z-50' : 'z-0',
                      isDark
                        ? 'border-gray-800/60 bg-[#0f1724]/80 shadow-black/20'
                        : 'border-gray-200/80 bg-white/90 shadow-sm',
                    ].join(' ')}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <motion.div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colorClass}`}
                        whileHover={{ scale: 1.12, rotate: -8 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                      >
                        <Icon className="text-white drop-shadow-md" size={20} />
                      </motion.div>

                      <div className="min-w-0">
                        <div
                          className={`habit-title truncate text-base font-medium sm:text-lg transition-colors ${
                            h.completed
                              ? 'text-gray-400 dark:text-gray-500 line-through'
                              : isDark
                                ? 'text-white'
                                : 'text-gray-900'
                          }`}
                        >
                          {h.title}
                        </div>
                        <div className={['habit-meta text-sm font-medium mt-0.5', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
                          🔥 {h.streak} day streak
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="relative flex shrink-0 items-center gap-2 sm:gap-3"
                      initial={false}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.button
                        type="button"
                        onClick={() => handleToggleHabit(h.id)}
                        aria-label={h.completed ? 'Mark incomplete' : 'Mark complete'}
                        className={[
                          'rounded-full p-2 transition-colors',
                          isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
                        ].join(' ')}
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.15 }}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {h.completed ? (
                            <motion.div
                              key="checked"
                              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            >
                              <CheckCircle className="text-purple-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" size={26} strokeWidth={2.5} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="unchecked"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            >
                              <Circle className={isDark ? "text-gray-600" : "text-gray-300"} size={26} strokeWidth={2} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <div className="relative" ref={menuOpen ? menuRef : null}>
                        <button
                          type="button"
                          aria-label="Habit options"
                          aria-haspopup="menu"
                          aria-expanded={menuOpen}
                          onClick={(event) => {
                            event.stopPropagation()
                            setMenuOpenId((prev) => (prev === h.id ? null : h.id))
                          }}
                          className={[
                            'rounded-full p-2 transition-colors',
                            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
                          ].join(' ')}
                        >
                          <motion.span
                            className="flex"
                            whileHover={{ scale: 1.12, rotate: 90 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                          >
                            <MoreVertical className="text-gray-400" />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {menuOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              role="menu"
                              className={[
                                'absolute right-0 top-full z-50 mt-1 w-40 rounded-2xl border py-1.5 shadow-2xl backdrop-blur-xl',
                                isDark
                                  ? 'border-gray-700 bg-gray-900/90'
                                  : 'border-gray-200 bg-white/90',
                              ].join(' ')}
                            >
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => openEditModal(h)}
                                className={[
                                  'flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm font-medium transition-colors',
                                  isDark
                                    ? 'text-gray-200 hover:bg-gray-800'
                                    : 'text-gray-700 hover:bg-gray-50',
                                ].join(' ')}
                              >
                                <Pencil size={15} />
                                Edit
                              </button>
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => handleDeleteHabit(h.id)}
                                className={[
                                  'flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm font-medium transition-colors',
                                  isDark
                                    ? 'text-red-400 hover:bg-red-500/10'
                                    : 'text-red-600 hover:bg-red-50',
                                ].join(' ')}
                              >
                                <Trash2 size={15} />
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modalMode && (
          <HabitModal
            key="habit-modal"
            isDark={isDark}
            mode={modalMode}
            form={form}
            onChange={setForm}
            onClose={closeModal}
            onSubmit={handleSaveHabit}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Dashboard
