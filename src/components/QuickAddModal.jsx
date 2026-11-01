import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  Repeat2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useAppContext, CATEGORIES, TIME_OF_DAY_OPTIONS } from '../context/AppContext'

const QuickAddModal = () => {
  const {
    quickAddModal,
    setQuickAddModal,
    addHabit,
    addTask,
  } = useAppContext()

  const [activeTab, setActiveTab] = useState('habit')
  const [habitTitle, setHabitTitle] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [category, setCategory] = useState('Health')
  const [timeOfDay, setTimeOfDay] = useState('anytime')
  const [reminderTime, setReminderTime] = useState('')
  const [habitType, setHabitType] = useState('boolean')
  const [target, setTarget] = useState('1')
  const [unit, setUnit] = useState('')
  const [notes, setNotes] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Task fields
  const [taskTitle, setTaskTitle] = useState('')
  const [taskPriority, setTaskPriority] = useState('medium')
  const [taskCategory, setTaskCategory] = useState('Work')
  const [taskDeadline, setTaskDeadline] = useState(new Date().toISOString().split('T')[0])

  const inputRef = useRef(null)

  useEffect(() => {
    if (quickAddModal.isOpen) {
      setActiveTab(quickAddModal.type || 'habit')
      if (quickAddModal.timeOfDay) {
        setTimeOfDay(quickAddModal.timeOfDay)
      }
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [quickAddModal])

  if (!quickAddModal.isOpen) return null

  const handleHabitSubmit = (e) => {
    e.preventDefault()
    if (!habitTitle.trim()) return

    addHabit({
      title: habitTitle.trim(),
      frequency,
      category,
      timeOfDay,
      type: habitType,
      target: habitType === 'boolean' ? 1 : Number(target) || 1,
      unit: habitType === 'count' ? unit || 'times' : habitType === 'duration' ? 'mins' : '',
      reminderTime,
      notes: notes.trim(),
    })

    setQuickAddModal({ isOpen: false, type: 'habit', timeOfDay: null })
    setHabitTitle('')
    setNotes('')
    setShowAdvanced(false)
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault()
    if (!taskTitle.trim()) return

    addTask({
      title: taskTitle.trim(),
      priority: taskPriority,
      category: taskCategory,
      deadline: taskDeadline,
      subtasks: [],
    })

    setQuickAddModal({ isOpen: false, type: 'task', timeOfDay: null })
    setTaskTitle('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        onClick={() => setQuickAddModal({ isOpen: false, type: 'habit', timeOfDay: null })}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden z-10 flex flex-col">
        {/* Header Tabs */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('habit')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                activeTab === 'habit'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Repeat2 className="h-3.5 w-3.5" />
              <span>Habit</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('task')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                activeTab === 'task'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <CheckSquare className="h-3.5 w-3.5" />
              <span>Task</span>
            </button>
          </div>

          <button
            onClick={() => setQuickAddModal({ isOpen: false, type: 'habit', timeOfDay: null })}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[80vh] overflow-y-auto">
          {activeTab === 'habit' ? (
            <form onSubmit={handleHabitSubmit} className="space-y-4 text-xs">
              {/* Required: Habit Name */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                  Habit Name <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  required
                  value={habitTitle}
                  onChange={(e) => setHabitTitle(e.target.value)}
                  placeholder="e.g. Read 15 pages, Drink water, Morning run"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/30"
                />
              </div>

              {/* Required: Frequency */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekdays">Weekdays only</option>
                    <option value="weekends">Weekends only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Time of Day
                  </label>
                  <select
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600 capitalize"
                  >
                    {TIME_OF_DAY_OPTIONS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Collapsible Advanced Options */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <span>{showAdvanced ? 'Fewer options' : 'More options (Category, Target, Reminder)'}</span>
                  {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {showAdvanced && (
                  <div className="space-y-3 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                          Type
                        </label>
                        <select
                          value={habitType}
                          onChange={(e) => {
                            const val = e.target.value
                            setHabitType(val)
                            if (val === 'count' && !unit) setUnit('times')
                            if (val === 'duration' && !unit) setUnit('mins')
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
                        >
                          <option value="boolean">Checkmark (Yes/No)</option>
                          <option value="count">Count (e.g. 4 glasses)</option>
                          <option value="duration">Duration (e.g. 15 mins)</option>
                        </select>
                      </div>
                    </div>

                    {habitType !== 'boolean' && (
                      <div className="grid grid-cols-2 gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div>
                          <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1 text-[11px]">
                            Daily Target
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1 text-[11px]">
                            Unit label
                          </label>
                          <input
                            type="text"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            placeholder="glasses, pages, mins"
                            className="w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Reminder Time (Optional)
                      </label>
                      <input
                        type="text"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        placeholder="e.g. 08:00 AM"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Notes
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional cues or details..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuickAddModal({ isOpen: false, type: 'habit', timeOfDay: null })}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!habitTitle.trim()}
                  className="px-4 py-1.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 transition-colors shadow-xs"
                >
                  Create Habit
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleTaskSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                  Task Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Prepare design presentation"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuickAddModal({ isOpen: false, type: 'habit', timeOfDay: null })}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!taskTitle.trim()}
                  className="px-4 py-1.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 transition-colors shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuickAddModal
