import React from 'react'

const QuoteCard = ({ isDark }) => {
  return (
    <div
      className={[
        'rounded-2xl border p-4 shadow-sm transition-colors duration-300 sm:p-5',
        isDark
          ? 'border-gray-800 bg-gray-950/60 shadow-black/20'
          : 'border-gray-200 bg-white shadow-gray-200/80',
      ].join(' ')}
    >
      <span className="text-3xl leading-none text-violet-400/80" aria-hidden="true">
        &ldquo;
      </span>
      <p
        className={[
          'mt-1 text-sm leading-relaxed sm:text-base',
          isDark ? 'text-gray-300' : 'text-gray-700',
        ].join(' ')}
      >
        The secret of your future is hidden in your daily routine.
      </p>
      <p className="mt-3 text-sm font-medium text-gray-500">– James Clear</p>
    </div>
  )
}

export default QuoteCard
