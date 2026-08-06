import React from 'react'

const QuoteCard = () => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4 shadow-lg sm:p-5">
      <span className="text-3xl leading-none text-violet-400/80" aria-hidden="true">
        &ldquo;
      </span>
      <p className="mt-1 text-sm leading-relaxed text-gray-300 sm:text-base">
        The secret of your future is hidden in your daily routine.
      </p>
      <p className="mt-3 text-sm font-medium text-gray-500">– James Clear</p>
    </div>
  )
}

export default QuoteCard
