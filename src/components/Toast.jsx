import React from 'react'
import { CheckCircle2, AlertCircle, Info, X, RotateCcw } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Toast = () => {
  const { toast, dismissToast, handleUndo } = useAppContext()

  if (!toast) return null

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
      case 'danger':
        return <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
      default:
        return <Info className="h-4 w-4 text-blue-600 shrink-0" />
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg max-w-sm text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
      {getIcon()}
      <span className="text-slate-800 dark:text-slate-200 font-medium leading-snug">
        {toast.message}
      </span>

      {toast.undoCallback && (
        <button
          onClick={handleUndo}
          className="ml-2 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Undo</span>
        </button>
      )}

      <button
        onClick={dismissToast}
        aria-label="Dismiss toast"
        className="ml-1 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default Toast
