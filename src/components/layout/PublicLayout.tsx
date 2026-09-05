import { Activity } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Activity className="h-4 w-4" />
            </span>
            CampusPulse
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/login" className="text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
