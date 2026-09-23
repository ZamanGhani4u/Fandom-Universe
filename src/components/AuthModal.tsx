import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-display text-white">
            {activeTab === 'signin' ? 'Welcome to FandomVerse' : 'Join the Fandom Universe'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Access your curated feeds, local bookmarks, and community events
          </p>
        </div>

        {/* Dummy UI Notice per SRS */}
        <div className="mb-5 p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-2 text-xs text-neutral-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-neutral-200">Demo Account:</strong> UI-only authentication per SRS specifications. No server credentials are created or stored.
          </span>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-neutral-900 rounded-xl mb-5 border border-neutral-800">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'signin'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'signup'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-base font-semibold text-white font-display">Session Initialized!</h3>
            <p className="text-xs text-neutral-400">
              Welcome aboard! You are exploring FandomVerse in guest mode.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Fan Handle / Alias</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. GojoCollector99"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="fan@fandomverse.org"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Passphrase</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-neutral-700 accent-rose-600" />
                <span>Keep session active</span>
              </label>
              <a href="#reset" onClick={(e) => e.preventDefault()} className="hover:text-rose-400 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-rose-950/40 text-sm"
            >
              {activeTab === 'signin' ? 'Sign In as Fan' : 'Create Free Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
