import React from 'react'
import { Bell } from 'lucide-react'
import Calender from './Calender'
import QuoteCard from './QuoteCard'
import WeeklyProgress from './WeeklyProgress'

const RightSidebar = () => {
  return (
    <aside className="relative z-10 flex h-full w-72 shrink-0 flex-col gap-5 overflow-y-auto border-l border-gray-800 bg-gray-900 px-5 py-6 text-gray-100 sm:w-80 sm:px-6 sm:py-8">
      {/* Bell + avatar */}
      <div className="flex shrink-0 items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
        >
          <Bell className="h-5 w-5" strokeWidth={2} />
        </button>
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-500/40"
        />
      </div>

      <Calender />
      <WeeklyProgress />
      <QuoteCard />
    </aside>
  )
}

export default RightSidebar
