import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  BookOpen, 
  AlertCircle, 
  Award, 
  Building2, 
  Sparkles 
} from 'lucide-react';

interface AcademicEvent {
  id: string;
  title: string;
  category: 'academic_milestone' | 'examination' | 'continuous_assessment' | 'holiday' | 'institutional_event' | 'statutory_meeting';
  start_date: string;
  end_date: string;
  is_holiday: boolean;
  organizing_body: string;
}

const mockAcademicEvents: AcademicEvent[] = [
  {
    id: '1',
    title: 'Commencement of Classes (Odd Sem AY 2026-27)',
    category: 'academic_milestone',
    start_date: '2026-08-31',
    end_date: '2026-08-31',
    is_holiday: false,
    organizing_body: 'Office of Academic Affairs'
  },
  {
    id: '2',
    title: 'Midterm Examinations / Assessments',
    category: 'examination',
    start_date: '2026-10-05',
    end_date: '2026-10-08',
    is_holiday: false,
    organizing_body: 'Controller of Examinations'
  },
  {
    id: '3',
    title: 'Mahatma Gandhi Jayanthi',
    category: 'holiday',
    start_date: '2026-10-02',
    end_date: '2026-10-02',
    is_holiday: true,
    organizing_body: 'State Government / SRM-AP'
  },
  {
    id: '4',
    title: 'Aloha Freshers Fest',
    category: 'institutional_event',
    start_date: '2026-09-11',
    end_date: '2026-09-12',
    is_holiday: false,
    organizing_body: 'Directorate of Student Affairs'
  },
  {
    id: '5',
    title: '30th Academic Council Meeting',
    category: 'statutory_meeting',
    start_date: '2026-10-30',
    end_date: '2026-10-30',
    is_holiday: false,
    organizing_body: 'University Registrar'
  }
];

export const AcademicCalendarPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentMonth] = useState<string>('October 2026');

  const getCategoryBadge = (category: AcademicEvent['category']) => {
    switch (category) {
      case 'examination':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Exam</span>;
      case 'academic_milestone':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full flex items-center gap-1"><BookOpen className="w-3 h-3"/> Academic</span>;
      case 'holiday':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1"><Award className="w-3 h-3"/> Holiday</span>;
      case 'institutional_event':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3"/> Campus Fest</span>;
      case 'statutory_meeting':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full flex items-center gap-1"><Building2 className="w-3 h-3"/> Governance</span>;
      default:
        return null;
    }
  };

  const filteredEvents = selectedCategory === 'all' 
    ? mockAcademicEvents 
    : mockAcademicEvents.filter(e => e.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-indigo-500" /> Academic Calendar
          </h1>
          <p className="text-slate-400 mt-1">
            Official institutional schedule, examination dates, statutory meetings, and holidays for AY 2026-27.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-4 shrink-0">
          <div>
            <p className="text-xs text-slate-400 font-medium">Current Term</p>
            <p className="text-sm font-bold text-white">Odd Semester (86 Days)</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <p className="text-xs text-slate-400 font-medium">Status</p>
            <p className="text-sm font-bold text-emerald-400">Active Instruction</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3">
          <button className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-base font-bold text-white min-w-[120px] text-center">{currentMonth}</span>
          <button className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500 mr-1 hidden sm:block" />
          {['all', 'academic_milestone', 'examination', 'holiday', 'institutional_event', 'statutory_meeting'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event) => (
          <div 
            key={event.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                {getCategoryBadge(event.category)}
                <span className="text-xs text-slate-400 font-mono">{event.organizing_body}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{event.title}</h3>
              <p className="text-xs text-slate-400">
                Scheduled Window: <span className="text-slate-200 font-medium">{event.start_date}</span> {event.start_date !== event.end_date && ` to ${event.end_date}`}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {event.is_holiday && (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-lg border border-amber-500/20">
                  No Instruction Scheduled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicCalendarPage;
