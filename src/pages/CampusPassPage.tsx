import React, { useState, useEffect } from 'react';
import { Ticket, Clock, CheckCircle2, AlertCircle, Plus, Send } from 'lucide-react';

interface PassItem {
  id: string;
  reason: string;
  destination: string;
  outDate: string;
  returnDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

const INITIAL_PASSES: PassItem[] = [
  {
    id: 'PASS-8921',
    reason: 'Medical Appointment',
    destination: 'Guntur City',
    outDate: '2026-09-10 09:00 AM',
    returnDate: '2026-09-10 06:00 PM',
    status: 'Approved',
  },
];

export function CampusPassPage() {
  const [passes, setPasses] = useState<PassItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [outDate, setOutDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('campusPasses');
    if (saved) {
      try {
        setPasses(JSON.parse(saved));
      } catch (e) {
        setPasses(INITIAL_PASSES);
      }
    } else {
      setPasses(INITIAL_PASSES);
    }
  }, []);

  const handleCreatePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !destination || !outDate || !returnDate) return;

    const newPass: PassItem = {
      id: `PASS-${Math.floor(1000 + Math.random() * 9000)}`,
      reason,
      destination,
      outDate,
      returnDate,
      status: 'Pending',
    };

    const updated = [newPass, ...passes];
    setPasses(updated);
    localStorage.setItem('campusPasses', JSON.stringify(updated));

    setReason('');
    setDestination('');
    setOutDate('');
    setReturnDate('');
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Digital Campus Pass
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Request hostel gate passes and track warden approvals in real-time.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 shadow-md shadow-blue-600/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Apply Out-Pass</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {passes.map((pass) => (
          <div
            key={pass.id}
            className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-400">{pass.id}</span>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1 ${
                  pass.status === 'Approved'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                }`}
              >
                {pass.status === 'Approved' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3.5 h-3.5" />
                )}
                {pass.status}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-base">{pass.reason}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Destination: <span className="text-slate-700 dark:text-slate-300 font-medium">{pass.destination}</span></p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400 grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Out Time</span>
                <span>{pass.outDate}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">In Time</span>
                <span>{pass.returnDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Apply Out-Pass</h2>

            <form onSubmit={handleCreatePass} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Doctor appointment, Weekend home visit"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Destination</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Vijayawada Railway Station"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Out Date & Time</label>
                  <input
                    type="text"
                    required
                    value={outDate}
                    onChange={(e) => setOutDate(e.target.value)}
                    placeholder="Sept 10, 09:00 AM"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">In Date & Time</label>
                  <input
                    type="text"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    placeholder="Sept 10, 06:00 PM"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-500 shadow-md shadow-blue-600/20"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampusPassPage;