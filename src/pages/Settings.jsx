import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Palette, Shield, Trash2, Check, Moon, Sun } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Settings = () => {
  const { isDark, toggleTheme, userSettings, updateUserSettings } = useAppContext()
  const [name, setName] = useState(userSettings.name)
  const [saved, setSaved] = useState(false)

  const handleSaveProfile = () => {
    updateUserSettings({ name })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all your habits? This cannot be undone.")) {
      localStorage.removeItem('habits')
      window.location.reload()
    }
  }

  return (
    <motion.div
      className="px-6 py-8 sm:px-8 max-w-4xl mx-auto pb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className={['mt-2 text-base', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className={['p-6 sm:p-8 rounded-3xl border backdrop-blur-sm', isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'].join(' ')}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <User size={24} />
            </div>
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="shrink-0 relative group">
              <img src={userSettings.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/20" />
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <span className="text-white text-xs font-medium">Change</span>
              </div>
            </div>
            
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className={['block text-sm font-medium mb-1', isDark ? 'text-gray-300' : 'text-gray-700'].join(' ')}>Display Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={['w-full max-w-md rounded-xl border px-4 py-2.5 outline-none transition-colors focus:ring-2 focus:ring-purple-500', isDark ? 'bg-gray-950 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'].join(' ')}
                />
              </div>
              <button 
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-purple-500/30"
              >
                {saved ? <><Check size={18} /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className={['p-6 sm:p-8 rounded-3xl border backdrop-blur-sm', isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'].join(' ')}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Palette size={24} />
            </div>
            <h2 className="text-xl font-semibold">Preferences</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-lg">Appearance</h4>
                <p className={['text-sm', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>Toggle between light and dark mode</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={['p-3 rounded-xl flex items-center gap-3 font-medium transition-colors border', isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white' : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-900'].join(' ')}
              >
                {isDark ? <><Sun size={18} className="text-yellow-400" /> Light Mode</> : <><Moon size={18} className="text-purple-600" /> Dark Mode</>}
              </button>
            </div>

            <hr className={isDark ? 'border-gray-800' : 'border-gray-100'} />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-lg">Notifications</h4>
                <p className={['text-sm', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>Receive daily reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={userSettings.notificationsEnabled} onChange={() => updateUserSettings({ notificationsEnabled: !userSettings.notificationsEnabled })} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className={['p-6 sm:p-8 rounded-3xl border border-red-500/20 backdrop-blur-sm', isDark ? 'bg-red-950/10' : 'bg-red-50'].join(' ')}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-medium text-lg text-red-600 dark:text-red-400">Clear All Data</h4>
              <p className={['text-sm', isDark ? 'text-gray-400' : 'text-gray-500'].join(' ')}>Permanently delete all habits and statistics.</p>
            </div>
            <button 
              onClick={handleClearData}
              className="px-5 py-2.5 rounded-xl border border-red-500/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-500/10 transition-colors flex items-center gap-2 justify-center"
            >
              <Trash2 size={18} />
              Reset App
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

export default Settings
