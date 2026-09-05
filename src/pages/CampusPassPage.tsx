import React from 'react';
import { QrCode, ShieldCheck, Award, Flame } from 'lucide-react';

export default function CampusPassPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Digital CampusPass</h1>
        <p className="text-slate-400 mt-1">Your unified QR identity for instant event check-ins.</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">Alex Rivers</h2>
            <p className="text-xs text-slate-400">SRM Institute of Science and Technology</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Student
          </span>
        </div>

        {/* QR Display */}
        <div className="bg-white p-6 rounded-xl inline-block shadow-inner my-4">
          <QrCode className="w-48 h-48 text-slate-950" />
        </div>

        <p className="text-xs text-slate-400 font-mono">ID: PASS-2026-SRM-88921</p>

        {/* Student Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> Activity Score
            </p>
            <p className="text-lg font-bold text-white">450 pts</p>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Badges Earned
            </p>
            <p className="text-lg font-bold text-white">4 Badges</p>
          </div>
        </div>
      </div>
    </div>
  );
}