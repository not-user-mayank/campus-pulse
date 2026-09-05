import React, { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Exam' | 'Holiday' | 'Event';
  day: string;
}

export const AcademicCalendarPage = () => {
  const [filter, setFilter] = useState<'All' | 'Academic' | 'Exam' | 'Holiday' | 'Event'>('All');

  // Official SRM University-AP Academic Calendar AY 2026-27
  const calendarEvents: CalendarEvent[] = [
    { id: '1', title: 'Commencement of Academic Registration', date: '2026-08-17', day: 'Monday', category: 'Academic' },
    { id: '2', title: 'Commencement of Classes (Odd Sem)', date: '2026-08-31', day: 'Monday', category: 'Academic' },
    { id: '3', title: 'Midterm Examinations / Assessments', date: '2026-10-05 to 2026-10-08', day: 'Mon - Thu', category: 'Exam' },
    { id: '4', title: 'Window for Semester Practical Examinations', date: '2026-11-13 to 2026-11-27', day: 'Fri - Fri', category: 'Exam' },
    { id: '5', title: 'Last Day of Teaching (Odd Sem)', date: '2026-11-30', day: 'Monday', category: 'Academic' },
    { id: '6', title: 'Window for End-Term Examinations', date: '2026-12-07 to 2026-12-21', day: 'Mon - Mon', category: 'Exam' },
    { id: '7', title: 'Winter Break for Students', date: '2026-12-22 to 2027-01-03', day: 'Tue - Sun', category: 'Holiday' },
    { id: '8', title: 'Date of Result Declaration (Odd Sem)', date: '2027-01-05', day: 'Tuesday', category: 'Exam' },

    { id: '9', title: 'Vinayakachavithi', date: '2026-09-14', day: 'Monday', category: 'Holiday' },
    { id: '10', title: 'Mahatma Gandhi Jayanthi', date: '2026-10-02', day: 'Friday', category: 'Holiday' },
    { id: '11', title: 'Vijayadasami / Dussehra', date: '2026-10-20', day: 'Tuesday', category: 'Holiday' },
    { id: '12', title: 'Christmas', date: '2026-12-25', day: 'Friday', category: 'Holiday' },
    { id: '13', title: 'Bhogi / Pongal / Sankranthi', date: '2027-01-14 to 2027-01-15', day: 'Thu - Fri', category: 'Holiday' },
    { id: '14', title: 'Republic Day', date: '2027-01-26', day: 'Tuesday', category: 'Holiday' },

    { id: '15', title: 'Aloha Freshers Fest', date: '2026-09-11 to 2026-09-12', day: 'Fri - Sat', category: 'Event' },
    { id: '16', title: 'Amaravati Literature Festival', date: '2026-10-07 to 2026-10-09', day: 'Wed - Fri', category: 'Event' },
    { id: '17', title: 'Tech-Fest 2026', date: '2026-11-19 to 2026-11-20', day: 'Thu - Fri', category: 'Event' },
    { id: '18', title: 'Infinitus Cultural Fest', date: '2027-02-18 to 2027-02-19', day: 'Thu - Fri', category: 'Event' },

    { id: '19', title: 'Commencement of Classes (Even Sem)', date: '2027-01-04', day: 'Monday', category: 'Academic' },
    { id: '20', title: 'Even Sem Mid-Term Examinations', date: '2027-03-01 to 2027-03-04', day: 'Mon - Thu', category: 'Exam' },
    { id: '21', title: 'Last Day of Teaching (Even Sem)', date: '2027-04-30', day: 'Friday', category: 'Academic' },
    { id: '22', title: 'Even Sem End-Term Examinations', date: '2027-05-03 to 2027-05-15', day: 'Mon - Sat', category: 'Exam' },
    { id: '23', title: 'Commencement of Summer Break', date: '2027-05-22', day: 'Saturday', category: 'Holiday' }
  ];

  const filteredEvents = filter === 'All' 
    ? calendarEvents 
    : calendarEvents.filter(e => e.category === filter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">SRM University-AP Academic Calendar</h1>
          <p className="text-gray-400 text-sm">Academic Year 2026–2027 Official Timetable</p>
        </div>

        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
          {(['All', 'Academic', 'Exam', 'Holiday', 'Event'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                filter === cat ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((item) => (
          <div key={item.id} className="p-4 bg-gray-800/90 border border-gray-700 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                item.category === 'Exam' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                item.category === 'Holiday' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                item.category === 'Event' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {item.category}
              </span>
              <span className="text-xs text-gray-400">{item.day}</span>
            </div>
            <h3 className="font-semibold text-white text-base">{item.title}</h3>
            <p className="text-sm font-medium text-blue-400">📅 {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};