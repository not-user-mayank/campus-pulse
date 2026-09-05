import React, { useState } from 'react';
import { ThumbsUp, Plus, Sparkles, MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface EventRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  hasVoted: boolean;
  status: 'community_idea' | 'under_review' | 'approved';
  createdBy: string;
  createdAt: string;
}

const INITIAL_REQUESTS: EventRequest[] = [
  {
    id: '1',
    title: 'Hands-on Generative AI & Agent Workshop',
    description: 'We need an in-depth practical session on building autonomous AI agents using LangChain and modern LLM APIs.',
    category: 'Technical',
    votes: 142,
    hasVoted: false,
    status: 'under_review',
    createdBy: 'Rohan Sharma',
    createdAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Inter-Department E-Sports Tournament (Valorant / BGMI)',
    description: 'Host a structured weekend LAN / online tournament with proper streaming and campus leaderboard.',
    category: 'Gaming & Sports',
    votes: 218,
    hasVoted: true,
    status: 'approved',
    createdBy: 'Ananya Verma',
    createdAt: '4 days ago',
  },
  {
    id: '3',
    title: 'UI/UX Portfolio Review & Critique Session',
    description: 'Bring industry seniors or alum to review student portfolios and give live actionable feedback.',
    category: 'Design',
    votes: 89,
    hasVoted: false,
    status: 'community_idea',
    createdBy: 'Priya Patel',
    createdAt: '1 day ago',
  },
];

export default function DemandBoardPage() {
  const [requests, setRequests] = useState<EventRequest[]>(INITIAL_REQUESTS);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Technical');
  const [newDescription, setNewDescription] = useState('');

  const toggleVote = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              hasVoted: !req.hasVoted,
              votes: req.hasVoted ? req.votes - 1 : req.votes + 1,
            }
          : req
      )
    );
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newReq: EventRequest = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      category: newCategory,
      votes: 1,
      hasVoted: true,
      status: 'community_idea',
      createdBy: 'Alex Rivers',
      createdAt: 'Just now',
    };

    setRequests([newReq, ...requests]);
    setNewTitle('');
    setNewDescription('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Campus Demand Board <Sparkles className="w-6 h-6 text-amber-400" />
          </h1>
          <p className="text-slate-400 mt-1">
            Request event topics and upvote ideas you want campus clubs to host.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm flex items-center gap-2 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Request New Event
        </button>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => {
          return (
            <div
              key={req.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">
                    {req.category}
                  </span>

                  {req.status === 'approved' && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Event Scheduled
                    </span>
                  )}
                  {req.status === 'under_review' && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Under Review
                    </span>
                  )}
                  {req.status === 'community_idea' && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Community Idea
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{req.title}</h3>
                <p className="text-xs text-slate-400 mb-3">{req.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>By {req.createdBy}</span> • <span>{req.createdAt}</span>
                </div>

                <button
                  onClick={() => toggleVote(req.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    req.hasVoted
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{req.votes} Votes</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Request Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold text-white">Submit an Event Request</h2>
            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Event Topic / Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Cybersecurity & Ethical Hacking Bootcamp"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Design">Design</option>
                  <option value="Gaming & Sports">Gaming & Sports</option>
                  <option value="Career & Entrepreneurship">Career & Entrepreneurship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description & Details</label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain why students would attend and what skills or activities should be included..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition"
                >
                  Post Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}