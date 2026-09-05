import { Construction } from 'lucide-react'
import { useLocation } from 'react-router-dom'

type ComingSoonPageProps = {
  title: string
  phase: string
  description: string
}

export function ComingSoonPage({ title, phase, description }: ComingSoonPageProps) {
  const location = useLocation()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
          <Construction className="h-4 w-4" />
          Phase {phase} — not built yet
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-600">{description}</p>
        <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 font-mono text-sm text-slate-500">
          Route: {location.pathname}
        </p>
        <p className="mt-4 text-sm text-slate-500">
          This page is only a placeholder so navigation works. Real data, login, and
          features will be added in later phases — nothing here is fake functionality.
        </p>
      </div>
    </div>
  )
}
