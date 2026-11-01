import React, { useState } from 'react'
import {
  CheckSquare,
  Plus,
  Trash2,
  LayoutGrid,
  List,
  Check,
} from 'lucide-react'
import { useAppContext, getTodayStr } from '../context/AppContext'

const TasksPage = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setQuickAddModal,
  } = useAppContext()

  const [viewMode, setViewMode] = useState('kanban') // 'list' | 'kanban'
  const [quickTaskTitle, setQuickTaskTitle] = useState('')

  const todayStr = getTodayStr()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    if (!quickTaskTitle.trim()) return

    addTask({
      title: quickTaskTitle.trim(),
      priority: 'medium',
      status: 'todo',
      category: 'General',
      deadline: todayStr,
      subtasks: [],
    })
    setQuickTaskTitle('')
  }

  const handleToggleSubtask = (taskId, subtaskId) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    const updatedSubtasks = (task.subtasks || []).map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    )
    updateTask(taskId, { subtasks: updatedSubtasks })
  }

  const todoTasks = tasks.filter((t) => t.status === 'todo')
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress')
  const completedTasks = tasks.filter((t) => t.status === 'completed')

  const renderTaskCard = (task) => {
    const isCompleted = task.status === 'completed'
    const isOverdue = task.deadline && task.deadline < todayStr && !isCompleted

    return (
      <div
        key={task.id}
        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5 text-xs"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0">
            <button
              onClick={() => toggleTaskStatus(task.id)}
              className={`h-4 w-4 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                isCompleted
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-600'
              }`}
            >
              {isCompleted && <Check className="h-3 w-3 stroke-[3]" />}
            </button>
            <div>
              <h4 className={`font-medium ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                {task.title}
              </h4>
              {task.description && (
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 rounded text-slate-400 hover:text-rose-500"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>

        {/* Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
            {task.subtasks.map((st) => (
              <label
                key={st.id}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={st.completed}
                  onChange={() => handleToggleSubtask(task.id, st.id)}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <span className={st.completed ? 'line-through text-slate-400' : ''}>
                  {st.title}
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
          <span className="capitalize px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
            {task.priority}
          </span>
          {task.deadline && (
            <span className={isOverdue ? 'text-rose-500 font-medium' : ''}>
              {task.deadline} {isOverdue && '(Overdue)'}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize daily tasks and project action items.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Switch View */}
          <div className="flex p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                  : 'text-slate-400'
              }`}
              title="Kanban View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                  : 'text-slate-400'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setQuickAddModal({ isOpen: true, type: 'task', timeOfDay: null })}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Quick Add Bar */}
      <form
        onSubmit={handleQuickAdd}
        className="flex items-center gap-2 p-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs shadow-xs"
      >
        <CheckSquare className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={quickTaskTitle}
          onChange={(e) => setQuickTaskTitle(e.target.value)}
          placeholder="Add a new task (press Enter)..."
          className="flex-1 bg-transparent text-xs outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!quickTaskTitle.trim()}
          className="px-3 py-1 rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40"
        >
          Add
        </button>
      </form>

      {/* Task Board / List */}
      {tasks.length === 0 ? (
        <div className="p-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-3">
          <div className="h-10 w-10 rounded-lg mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500">
            <CheckSquare className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            No tasks yet
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Add tasks and to-do items to organize your daily priorities alongside habits.
          </p>
        </div>
      ) : viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">To Do</span>
              <span className="text-xs font-mono text-slate-400">{todoTasks.length}</span>
            </div>
            <div className="space-y-2">
              {todoTasks.map(renderTaskCard)}
              {todoTasks.length === 0 && (
                <p className="text-xs text-slate-400 py-4 text-center">No tasks to do</p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">In Progress</span>
              <span className="text-xs font-mono text-slate-400">{inProgressTasks.length}</span>
            </div>
            <div className="space-y-2">
              {inProgressTasks.map(renderTaskCard)}
              {inProgressTasks.length === 0 && (
                <p className="text-xs text-slate-400 py-4 text-center">No tasks in progress</p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Completed</span>
              <span className="text-xs font-mono text-slate-400">{completedTasks.length}</span>
            </div>
            <div className="space-y-2">
              {completedTasks.map(renderTaskCard)}
              {completedTasks.length === 0 && (
                <p className="text-xs text-slate-400 py-4 text-center">No completed tasks</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map(renderTaskCard)}
        </div>
      )}
    </div>
  )
}

export default TasksPage
