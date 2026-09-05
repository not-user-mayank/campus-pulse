import { Activity, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import type { AppRole } from '../../config/navigation'
import { navByRole, roleLabels } from '../../config/navigation'

const roleFromPath = (pathname: string): AppRole => {
  if (pathname.startsWith('/organizer')) return 'organizer'
  if (pathname.startsWith('/admin')) return 'admin'
  return 'student'
}

export function AppLayout() {
  const location = useLocation()
  const role = roleFromPath(location.pathname)
  const items = navByRole[role]
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="lg:grid lg:grid-cols-[16rem_1fr]">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Activity className="h-4 w-4" />
              </span>
              CampusPulse
            </Link>
            <button
              type="button"
              className="rounded-md p-1 text-slate-500 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="px-5 pb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            {roleLabels[role]} preview
          </p>

          <nav className="space-y-1 px-3">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-[10px] font-normal text-slate-400">P{item.phase}</span>
                </NavLink>
              )
            })}
          </nav>

          <p className="absolute bottom-4 left-5 right-5 text-xs text-slate-400">
            Layout only. Login comes in Phase 4 (after Supabase).
          </p>
        </aside>

        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
        ) : null}

        <div className="min-h-dvh">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <p className="text-sm text-slate-500">
              Local development · no accounts yet
            </p>
            <Link
              to="/"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Home
            </Link>
          </header>
          <main className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
