import React, { useState } from 'react'
import {
  X,
  Play,
  CheckCircle2,
  Repeat2,
  Clock3,
  BarChart3,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Video,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import InteractiveProductDemo from './InteractiveProductDemo'

const VideoGuideModal = ({ isOpen, onClose }) => {
  const [videoUrl, setVideoUrl] = useState('')
  const [showEmbedInput, setShowEmbedInput] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Play className="h-4 w-4 fill-white ml-0.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">HabitFlow Product Tour & Guide</h2>
              <p className="text-xs text-slate-500">Everything you can accomplish in HabitFlow</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Interactive Demo Player */}
          <div>
            <InteractiveProductDemo />
          </div>

          {/* "What you can do in HabitFlow" Guide Breakdown */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs text-blue-600">
              Guide: What Can You Do in HabitFlow?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Repeat2 className="h-4 w-4 text-blue-600" />
                  <span>1. Daily Habit Tracking & Streaks</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Create flexible yes/no, count-based (glasses, pages), or duration-based (exercise minutes) habits. Check off items in 1 click and maintain streak records.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Clock3 className="h-4 w-4 text-blue-600" />
                  <span>2. Pomodoro Focus Sessions</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Start built-in 25m Pomodoro, 5m short break, or 15m long break timers. Link deep work directly to your habits and tasks with logged session minutes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span>3. Activity Heatmap & Analytics</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Inspect your GitHub-style annual activity heatmap, weekly consistency rhythms, total completions, and individual habit performance scores.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <CheckSquare className="h-4 w-4 text-blue-600" />
                  <span>4. Kanban Tasks & Action Items</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Track project tasks across To-Do, In Progress, and Completed columns. Add priority tags, deadlines, and multi-step checklists.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Layers className="h-4 w-4 text-blue-600" />
                  <span>5. Step-by-Step Routines</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Bundle related habits into Morning Jumpstart and Evening Wind-Down routines. Execute them sequentially with the interactive Routine Runner modal.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  <span>6. 100% Offline & Data Export</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Your data stays securely on your local device. Export your logs to JSON or CSV anytime, or clear mock data and start fresh in one click.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
          <span className="text-xs text-slate-400">
            Ready to test it for yourself?
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Close Tour
            </button>
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
            >
              <span>Launch HabitFlow</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGuideModal

