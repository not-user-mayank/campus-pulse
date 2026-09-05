import { ArrowRight, CheckCircle2, Layers, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const nextSteps = [
  'Confirm this site opens at http://localhost:5173',
  'Click Student, Organizer, and Admin to see the layout',
  'Do not expect login or events yet — those start in later phases',
]

export function HomePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 px-8 py-10 text-white">
          <p className="text-sm font-medium text-indigo-200">Phase 1 · Project setup</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            CampusPulse
          </h1>
          <p className="mt-3 max-w-2xl text-indigo-100">
            Intelligent campus event and club management. This first version is only
            the website shell: styling, pages, and navigation. No database, no
            accounts, and no fake event data.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">
          <PreviewCard
            title="Student"
            to="/student/dashboard"
            description="Dashboard, events, clubs, CampusPass"
          />
          <PreviewCard
            title="Organizer"
            to="/organizer/dashboard"
            description="Events, attendance, analytics"
          />
          <PreviewCard
            title="Admin"
            to="/admin/dashboard"
            description="Campus-wide users, clubs, events"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Layers className="h-5 w-5 text-indigo-600" />
          <h2 className="mt-3 font-semibold text-slate-900">What this phase includes</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>React + TypeScript + Vite</li>
            <li>Tailwind CSS for a modern layout</li>
            <li>Page routing for all planned screens</li>
            <li>Responsive sidebar that works on phones</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Shield className="h-5 w-5 text-indigo-600" />
          <h2 className="mt-3 font-semibold text-slate-900">What you should test</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {nextSteps.map((step) => (
              <li key={step} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function PreviewCard({
  title,
  to,
  description,
}: {
  title: string
  to: string
  description: string
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-200 hover:bg-indigo-50"
    >
      <p className="text-sm font-semibold text-slate-900">{title} layout</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
        Open preview
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </p>
    </Link>
  )
}
