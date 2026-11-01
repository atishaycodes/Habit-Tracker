import React, { useState } from 'react'
import {
  User,
  Palette,
  Download,
  Upload,
  Sun,
  Moon,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const SettingsPage = () => {
  const {
    theme,
    isDark,
    toggleTheme,
    userSettings,
    updateUserSettings,
    exportDataJSON,
    exportDataCSV,
    importDataJSON,
    loadSampleData,
    hasSampleData,
    removeMockData,
    clearAllData,
  } = useAppContext()

  const [name, setName] = useState(userSettings.name || 'Atishay')
  const [email, setEmail] = useState(userSettings.email || 'atishay@example.com')
  const [workspace, setWorkspace] = useState(userSettings.workspace || 'My Workspace')
  const [notificationsEnabled, setNotificationsEnabled] = useState(userSettings.notificationsEnabled ?? true)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateUserSettings({
      name,
      email,
      workspace,
      notificationsEnabled,
    })
  }

  const handleFileImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        importDataJSON(content)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your account preferences and application data.
        </p>
      </div>

      {/* Profile Section */}
      <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <User className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Profile & Workspace
          </h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
              Workspace Label
            </label>
            <input
              type="text"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-200 outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Appearance */}
      <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Palette className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Appearance
          </h2>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-medium text-slate-800 dark:text-slate-200 block">Theme</span>
            <span className="text-slate-400 text-[11px]">Select light or dark interface</span>
          </div>

          <div className="flex p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                !isDark ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sun className="h-3.5 w-3.5 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                isDark ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Moon className="h-3.5 w-3.5 text-blue-400" />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Download className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Data & Backup
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={exportDataJSON}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={exportDataCSV}
            className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>

          <label className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer">
            <Upload className="h-3.5 w-3.5" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>
        </div>

        {/* Exploratory sample data loader & reset */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                Preview Sample Data
              </span>
              <span className="text-slate-400 text-[11px]">
                Populate the app with example habits and routines to explore the UI.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadSampleData}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 font-medium transition-colors"
              >
                Load Sample Data
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20">
            <div>
              <span className="font-semibold text-rose-700 dark:text-rose-400 block">
                Reset All Data & Start Fresh
              </span>
              <span className="text-rose-600/70 dark:text-rose-400/60 text-[11px]">
                Permanently deletes all habits, tasks, routines, and streaks to start completely clean.
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('WARNING: Are you sure you want to delete ALL habits, routines, tasks, and history? This cannot be undone.')) {
                  clearAllData()
                }
              }}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors shadow-xs shrink-0"
            >
              Reset Everything & Start Fresh
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
