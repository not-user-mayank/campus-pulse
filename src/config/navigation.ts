import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  QrCode,
  Shield,
  Ticket,
  Users,
  Vote,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type AppRole = 'student' | 'organizer' | 'admin'

export type NavItem = {
  label: string
  to: string
  icon: LucideIcon
  phase: string
}

export const studentNav: NavItem[] = [
  { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard, phase: '4' },
  { label: 'Events', to: '/student/events', icon: CalendarDays, phase: '5' },
  { label: 'Clubs', to: '/student/clubs', icon: Users, phase: '5' },
  { label: 'Demand Board', to: '/student/demand-board', icon: Vote, phase: '11' },
  { label: 'CampusPass', to: '/student/campus-pass', icon: QrCode, phase: '9' },
  { label: 'My Events', to: '/student/my-events', icon: Ticket, phase: '6' },
  { label: 'Notifications', to: '/student/notifications', icon: Bell, phase: '13' },
  { label: 'Profile', to: '/student/profile', icon: Building2, phase: '4' },
]

export const organizerNav: NavItem[] = [
  { label: 'Dashboard', to: '/organizer/dashboard', icon: LayoutDashboard, phase: '10' },
  { label: 'My Events', to: '/organizer/events', icon: CalendarDays, phase: '5' },
  { label: 'Create Event', to: '/organizer/events/create', icon: ClipboardList, phase: '5' },
  { label: 'Attendance', to: '/organizer/events/attendance', icon: QrCode, phase: '9' },
  { label: 'Analytics', to: '/organizer/analytics', icon: BarChart3, phase: '10' },
  { label: 'Demand Board', to: '/organizer/demand-board', icon: Vote, phase: '11' },
  { label: 'Club', to: '/organizer/club', icon: Users, phase: '5' },
  { label: 'Notifications', to: '/organizer/notifications', icon: Bell, phase: '13' },
]

export const adminNav: NavItem[] = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: Shield, phase: '16' },
  { label: 'Users', to: '/admin/users', icon: Users, phase: '16' },
  { label: 'Clubs', to: '/admin/clubs', icon: Building2, phase: '16' },
  { label: 'Events', to: '/admin/events', icon: CalendarDays, phase: '16' },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3, phase: '16' },
]

export const navByRole: Record<AppRole, NavItem[]> = {
  student: studentNav,
  organizer: organizerNav,
  admin: adminNav,
}

export const roleLabels: Record<AppRole, string> = {
  student: 'Student',
  organizer: 'Organizer',
  admin: 'Admin',
}
