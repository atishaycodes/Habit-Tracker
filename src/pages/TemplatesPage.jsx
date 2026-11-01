import React from 'react'
import {
  Plus,
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const TEMPLATE_BUNDLES = [
  {
    id: 'tpl_healthy_morning',
    title: 'Morning Essentials',
    subtitle: 'Build early momentum with hydration, movement, and focus.',
    category: 'Health',
    habits: [
      { title: 'Drink water upon waking', type: 'count', target: 2, unit: 'glasses', category: 'Health', timeOfDay: 'morning' },
      { title: 'Morning stretch or walk', type: 'duration', target: 15, unit: 'mins', category: 'Fitness', timeOfDay: 'morning' },
      { title: 'Review daily priorities', type: 'boolean', target: 1, unit: 'times', category: 'Work', timeOfDay: 'morning' },
    ],
  },
  {
    id: 'tpl_student_productivity',
    title: 'Focus & Study',
    subtitle: 'Systematize deep work and study sessions.',
    category: 'Work',
    habits: [
      { title: 'Complete 2 focus blocks', type: 'duration', target: 50, unit: 'mins', category: 'Work', timeOfDay: 'afternoon' },
      { title: 'Read lecture notes or book', type: 'count', target: 20, unit: 'pages', category: 'Learning', timeOfDay: 'morning' },
      { title: 'Plan tomorrow’s tasks', type: 'boolean', target: 1, unit: 'times', category: 'Work', timeOfDay: 'evening' },
    ],
  },
  {
    id: 'tpl_fitness_starter',
    title: 'Daily Movement',
    subtitle: 'Foundation for regular cardiovascular activity.',
    category: 'Fitness',
    habits: [
      { title: '8,000 steps daily walk', type: 'count', target: 8000, unit: 'steps', category: 'Fitness', timeOfDay: 'afternoon' },
      { title: '15-min core or mobility work', type: 'duration', target: 15, unit: 'mins', category: 'Fitness', timeOfDay: 'morning' },
      { title: 'Drink 2L water throughout day', type: 'count', target: 4, unit: 'glasses', category: 'Health', timeOfDay: 'afternoon' },
    ],
  },
  {
    id: 'tpl_reading_challenge',
    title: 'Daily Reading',
    subtitle: 'Form a sustainable reading habit in small daily increments.',
    category: 'Learning',
    habits: [
      { title: 'Read 15 pages', type: 'count', target: 15, unit: 'pages', category: 'Learning', timeOfDay: 'evening' },
      { title: 'Write down 1 key takeaway', type: 'boolean', target: 1, unit: 'times', category: 'Personal', timeOfDay: 'evening' },
    ],
  },
  {
    id: 'tpl_mindfulness_peace',
    title: 'Mindfulness & Rest',
    subtitle: 'Reduce daily stress and disconnect before bedtime.',
    category: 'Mindfulness',
    habits: [
      { title: '10-min breathing or meditation', type: 'duration', target: 10, unit: 'mins', category: 'Mindfulness', timeOfDay: 'morning' },
      { title: 'Screen-free 30m before sleep', type: 'boolean', target: 1, unit: 'times', category: 'Personal', timeOfDay: 'evening' },
    ],
  },
]

const TemplatesPage = () => {
  const {
    addHabit,
    addToast,
  } = useAppContext()

  const handleImportTemplate = (template) => {
    template.habits.forEach((h) => {
      addHabit({
        title: h.title,
        type: h.type,
        target: h.target,
        unit: h.unit,
        category: h.category,
        timeOfDay: h.timeOfDay,
        frequency: 'daily',
      })
    })
    addToast(`Added ${template.habits.length} habits from "${template.title}"`, 'success')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Curated habit bundles to help you get started quickly.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATE_BUNDLES.map((template) => (
          <div
            key={template.id}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block mb-1">
                {template.category}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {template.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {template.subtitle}
              </p>

              <div className="space-y-1.5 mb-5">
                {template.habits.map((h, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 text-xs flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                      {h.title}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase shrink-0 ml-2">
                      {h.timeOfDay}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleImportTemplate(template)}
              className="w-full py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Use Template</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplatesPage
