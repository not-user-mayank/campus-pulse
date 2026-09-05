import React, { useState, useEffect } from 'react';
import { Lightbulb, ThumbsUp, Plus, Send, MessageSquare } from 'lucide-react';

interface PitchItem {
  id: string;
  title: string;
  category: string;
  author: string;
  description: string;
  upvotes: number;
}

const INITIAL_PITCHES: PitchItem[] = [
  {
    id: 'pitch-1',
    title: 'Inter-College Esports Tournament (Valorant & BGMI)',
    category: 'Gaming',
    author: 'Rohan Gupta',
    description: 'A weekend LAN and online tournament for gaming enthusiasts on campus.',
    upvotes: 42,
  },
  {
    id: 'pitch-2',
    title: 'Open Source & Dev-Ops Bootcamp',
    category: 'Technical',
    author: 'Ananya S.',
    description: 'Hands-on weekend workshop covering Docker, Kubernetes, and Git workflows.',
    upvotes: 28,
  },
  {
    id: 'pitch-3',
    title: 'Campus Photography & Film Making Club',
    category: 'Clubs',
    author: 'Karthik Raja',
    description: 'A proposed club dedicated to photo walks, short film production, and editing masterclasses.',
    upvotes: 19,
  },
];

export function DemandBoardPage() {
  const [pitches, setPitches] = useState<PitchItem[]>([]);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Technical');
  const [newDescription, setNewDescription] = useState('');

  // Load persistent pitches and user upvotes
  useEffect(() => {
    const savedPitches = localStorage.getItem('demandBoardPitches');
    const savedUpvotes = localStorage.getItem('demandBoardUpvotes');

    if (savedPitches) {
      try {
        setPitches(JSON.parse(savedPitches));
      } catch (e) {
        setPitches(INITIAL_PITCHES);
      }
    } else {
      setPitches(INITIAL_PITCHES);
    }

    if (savedUpvotes) {
      try {
        setUpvotedIds(JSON.parse(savedUpvotes));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleUpvote = (id: string) => {
    const hasUpvoted = upvotedIds.includes(id);
    const newUpvotedIds = hasUpvoted
      ? upvotedIds.filter((item) => item !== id)
      : [...upvotedIds, id];

    const updatedPitches = pitches.map((pitch) => {
      if (pitch.id === id) {
        return {
          ...pitch,
          upvotes: hasUpvoted ? pitch.upvotes - 1 : pitch.upvotes + 1,
        };
      }
      return pitch;
    });

    setPitches(updatedPitches);
    setUpvotedIds(newUpvotedIds);

    localStorage.setItem('demandBoardPitches', JSON.stringify(updatedPitches));
    localStorage.setItem('demandBoardUpvotes', JSON.stringify(newUpvotedIds));
  };

  const handleCreatePitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const userProfile = localStorage.getItem('userProfile');
    const authorName = userProfile ? JSON.parse(userProfile).name : 'Student';

    const newPitch: PitchItem = {
      id: `pitch-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: authorName,
      description: newDescription.trim(),
      upvotes: 1,
    };

    const updatedPitches = [newPitch, ...pitches];
    const updatedUpvotes = [...upvotedIds, newPitch.id];

    setPitches(updatedPitches);
    setUpvotedIds(updatedUpvotes);

    localStorage.setItem('demandBoardPitches', JSON.stringify(updatedPitches));
    localStorage.setItem('demandBoardUpvotes', JSON.stringify(updatedUpvotes));

    setNewTitle('');
    setNewDescription('');
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            Demand Board
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pitch new event ideas or upvote proposals you want campus organizers to host.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 shadow-md shadow-blue-600/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Pitch an Idea</span>
        </button>
      </div>

      {/* Pitches List */}
      <div className="grid gap-4 md:grid-cols-2">
        {pitches.map((pitch) => {
          const isUpvoted = upvotedIds.includes(pitch.id);
          return (
            <div
              key={pitch.id}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-start gap-4"
            >
              <button
                onClick={() => handleUpvote(pitch.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  isUpvoted
                    ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'
                }`}
              >
                <ThumbsUp className={`w-5 h-5 ${isUpvoted ? 'fill-current' : ''}`} />
                <span className="text-xs font-bold mt-1">{pitch.upvotes}</span>
              </button>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-md">
                    {pitch.category}
                  </span>
                  <span className="text-xs text-slate-400">Pitched by {pitch.author}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{pitch.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pitch.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Pitch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 max-w-md w-full space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Pitch a Campus Idea</h2>

            <form onSubmit={handleCreatePitch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Title / Event Name
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Film Making Masterclass"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Clubs">Clubs</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain what the event is about and why students would want it..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-500 shadow-md shadow-blue-600/20"
                >
                  Submit Pitch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DemandBoardPage;