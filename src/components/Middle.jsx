import React, { useState } from 'react'
import {
    Target,
    Flame,
    TrendingUp,
    Trophy,
    Book,
    Droplet,
    Zap,
    Code,
    CheckCircle,
    Circle,
    MoreVertical,
} from 'lucide-react'

// overviewData will be derived from `habits` state inside the component

const initialHabits = [
    {
        id: 1,
        title: 'Morning Workout',
        streak: 12,
        icon: Zap,
        color: 'bg-green-400',
        completed: true,
    },
    {
        id: 2,
        title: 'Read 20 Pages',
        streak: 7,
        icon: Book,
        color: 'bg-blue-400',
        completed: true,
    },
    {
        id: 3,
        title: 'Drink 2L Water',
        streak: 3,
        icon: Droplet,
        color: 'bg-purple-400',
        completed: false,
    },
    {
        id: 4,
        title: 'Meditation',
        streak: 5,
        icon: Flame,
        color: 'bg-orange-400',
        completed: true,
    },
    {
        id: 5,
        title: 'Code for 1 Hour',
        streak: 2,
        icon: Code,
        color: 'bg-red-400',
        completed: false,
    },
]

const Middle = () => {
    const [habits, setHabits] = useState(initialHabits)

    const toggleHabit = (id) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === id ? { ...habit, completed: !habit.completed } : habit
            )
        )
    }

    // Derived overview values from current habits state
    const totalHabits = habits.length
    const completedToday = habits.filter((habit) => habit.completed).length
    const currentStreak = habits.length ? Math.max(...habits.map((h) => h.streak)) : 0
    const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0)

    const overviewData = [
        {
            id: 1,
            title: 'Total Habits',
            value: totalHabits,
            icon: Target,
            bg: 'bg-purple-100',
            color: 'text-purple-600',
        },
        {
            id: 2,
            title: 'Completed Today',
            value: completedToday,
            icon: Flame,
            bg: 'bg-green-100',
            color: 'text-green-600',
        },
        {
            id: 3,
            title: 'Current Streak',
            value: currentStreak,
            icon: TrendingUp,
            bg: 'bg-orange-100',
            color: 'text-orange-500',
        },
        {
            id: 4,
            title: 'Best Streak',
            value: bestStreak,
            icon: Trophy,
            bg: 'bg-blue-100',
            color: 'text-blue-500',
        },
    ]

    return (
        <div className="px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold sm:text-4xl">Good Morning, Arjun</h1>
                <span className="text-3xl" aria-hidden="true">
                    ☀️
                </span>
            </div>

            <p className="mt-2 text-base text-gray-500 sm:text-lg">
                Let&apos;s build some great habits today.
            </p>

            <h2 className="mt-8 text-xl font-semibold sm:mt-10 sm:text-2xl">Overview</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewData.map((item) => {
                    const Icon = item.icon

                    return (
                        <div
                            key={item.id}
                            className="rounded-xl bg-[#161B2D] p-5 shadow-lg sm:p-6"
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full ${item.bg}`}
                            >
                                <Icon className={item.color} size={24} />
                            </div>

                            <h3 className="mt-5 text-3xl font-bold text-white sm:mt-6 sm:text-4xl">
                                {item.value}
                            </h3>

                            <p className="mt-2 text-sm text-gray-400 sm:text-base">{item.title}</p>
                        </div>
                    )
                })}
            </div>

            <h2 className="mt-8 text-xl font-semibold sm:text-2xl">Today&apos;s Habits</h2>

            <div className="mt-4 space-y-3 pb-4">
                {habits.map((h) => {
                    const Icon = h.icon

                    return (
                        <div
                            key={h.id}
                            className="flex items-center justify-between gap-4 rounded-lg bg-[#0f1724] p-4 shadow-md"
                        >
                            <div className="flex min-w-0 items-center gap-4">
                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${h.color}`}
                                >
                                    <Icon className="text-white" size={20} />
                                </div>

                                <div className="min-w-0">
                                    <div className="truncate text-base font-medium text-white sm:text-lg">
                                        {h.title}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        🔥 {h.streak} day streak
                                    </div>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={() => toggleHabit(h.id)}
                                    aria-label={h.completed ? 'Mark incomplete' : 'Mark complete'}
                                    className="rounded-full p-2 transition-colors hover:bg-white/5"
                                >
                                    {h.completed ? (
                                        <CheckCircle className="text-green-400" size={22} />
                                    ) : (
                                        <Circle className="text-gray-500" size={22} />
                                    )}
                                </button>

                                <button type="button" aria-label="menu" className="rounded-full p-2">
                                    <MoreVertical className="text-gray-500" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Middle
