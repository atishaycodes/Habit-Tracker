import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  Menu,
  Trash2,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const pageTitles = {
  '/dashboard': 'Overview',
  '/habits': 'Habits',
  '/routines': 'Routines',
  '/tasks': 'Tasks',
  '/focus': 'Focus',
  '/calendar': 'Calendar',
  '/goals': 'Goals',
  '/analytics': 'Analytics',
  '/insights': 'Insights',
  '/templates': 'Templates',
  '/settings': 'Settings',
}

const Navbar = ({ onToggleMobile }) => {
  const {
    isDark,
    toggleTheme,
    userSettings,
    setIsCommandPaletteOpen,
    setQuickAddModal,
    notifications,
    setNotifications,
    addToast,
    clearAllData,
  } = useAppContext()

  const location = useLocation()
  const navigate = useNavigate()

  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const currentTitle = pageTitles[location.pathname] || 'Overview'

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    addToast('Notifications marked as read', 'info')
  }

  const clearAllNotifications = () => {
    setNotifications([])
    addToast('Notifications cleared', 'info')
  }

  return (
    <header className="sticky top-0 z-30 flex h-13 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 sm:px-6 select-none backdrop-blur-xs">
      {/* Left: Mobile toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          aria-label="Open mobile menu"
          className="p-1.5 rounded-lg md:hidden text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">HabitFlow</span>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Right: Search, Add Habit Button, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Global Search trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Search...</span>
          <kbd className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
            Ctrl+K
          </kbd>
        </button>

        {/* Primary Action Button: Add Habit */}
        <button
          onClick={() => setQuickAddModal({ isOpen: true, type: 'habit', timeOfDay: null })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xs"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Add Habit</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Notifications"
            className="relative p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors bg-white dark:bg-slate-900"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-3 z-40">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Notifications
                </span>
                <div className="flex items-center gap-2 text-[11px]">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-blue-600 hover:underline">
                      Mark read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button onClick={clearAllNotifications} className="text-slate-400 hover:text-rose-500">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto py-1">
                {notifications.length === 0 ? (
                  <p className="py-6 text-center text-xs text-slate-400">
                    No new notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="py-2 px-1 text-xs border-b border-slate-50 dark:border-slate-800 last:border-0">
                      <span className="font-medium text-slate-700 dark:text-slate-300 block">
                        {n.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {n.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-amber-400 transition-colors bg-white dark:bg-slate-900"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User profile avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-medium text-xs hover:ring-2 hover:ring-blue-500/20 transition-all"
          >
            {userSettings.name ? userSettings.name.charAt(0).toUpperCase() : 'A'}
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-1.5 z-40 text-xs">
              <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                  {userSettings.name}
                </span>
                <span className="text-[11px] text-slate-400 truncate block">
                  {userSettings.email}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false)
                  navigate('/settings')
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-1"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false)
                  navigate('/')
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Website & Features
              </button>
              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false)
                  if (window.confirm('Reset all data and start completely fresh?')) {
                    clearAllData()
                  }
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                Reset & Start Fresh
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
