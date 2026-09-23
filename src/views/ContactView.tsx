import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Compass, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  Crosshair,
  Maximize2
} from 'lucide-react';
import { CATEGORY_LIST } from '../data/categories.ts';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('anime');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [gpsStatus, setGpsStatus] = useState<'locked' | 'calibrating'>('locked');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  const handleRecalibrateGPS = () => {
    setGpsStatus('calibrating');
    setTimeout(() => setGpsStatus('locked'), 800);
  };

  return (
    <div className="space-y-12 pb-24 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <Navigation className="w-4 h-4" />
          <span>Liaison & Communications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
          Contact FandomVerse
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Have an inquiry, event announcement, or article contribution? Reach the FandomVerse editorial network and portal coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Map & GPS Radar */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
            {/* Map Top Bar */}
            <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-rose-500" />
                <span className="font-mono text-neutral-200 font-semibold">
                  Interactive GPS Grid Beacon
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-neutral-400">
                  {gpsStatus === 'locked' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      GPS FIX: 34.0522° N, 118.2437° W
                    </span>
                  ) : (
                    <span className="text-amber-400">Acquiring Satellites...</span>
                  )}
                </span>
              </div>
            </div>

            {/* Simulated Vector Map Canvas */}
            <div className="relative aspect-[16/10] bg-neutral-950 flex items-center justify-center overflow-hidden">
              {/* Radial Grid Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] rounded-full border border-neutral-800/60" />
                <div className="w-[200px] h-[200px] rounded-full border border-neutral-800/80 absolute" />
                <div className="w-[90px] h-[90px] rounded-full border border-rose-500/20 absolute" />
                {/* Crosshairs */}
                <div className="w-full h-px bg-neutral-800/60 absolute" />
                <div className="h-full w-px bg-neutral-800/60 absolute" />
              </div>

              {/* Radar Sweep Effect */}
              <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-r from-transparent via-rose-500/5 to-rose-500/20 animate-spin pointer-events-none" style={{ animationDuration: '8s' }} />

              {/* Central Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-rose-500/30 animate-ping absolute" />
                  <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-950 border-2 border-neutral-950">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-2.5 px-3 py-1 bg-neutral-900/90 backdrop-blur-md rounded-lg border border-neutral-700/80 text-center shadow-xl">
                  <div className="text-xs font-bold font-display text-white">
                    FandomVerse Global Nexus HQ
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    Convention Center Blvd, Sector 7
                  </div>
                </div>
              </div>

              {/* Map Floating Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-20">
                <button
                  onClick={() => setMapZoom((z) => Math.min(2, z + 0.2))}
                  className="w-8 h-8 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center text-sm font-bold shadow-md"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  onClick={() => setMapZoom((z) => Math.max(0.6, z - 0.2))}
                  className="w-8 h-8 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center text-sm font-bold shadow-md"
                  title="Zoom Out"
                >
                  -
                </button>
                <button
                  onClick={handleRecalibrateGPS}
                  className="w-8 h-8 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 flex items-center justify-center shadow-md"
                  title="Recalibrate Radar"
                >
                  <Crosshair className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded text-[10px] font-mono text-neutral-400">
                Scale: 1:{(10000 / mapZoom).toFixed(0)}m · EPSG:4326 WGS 84
              </div>
            </div>

            {/* Map Info Bar */}
            <div className="p-4 bg-neutral-950/90 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-neutral-500 font-mono text-[11px] block">Location:</span>
                <span className="text-neutral-200 font-medium">Los Angeles / Neo-Tokyo Hub</span>
              </div>
              <div>
                <span className="text-neutral-500 font-mono text-[11px] block">Coordinates:</span>
                <span className="text-neutral-200 font-mono">34.0522° N, 118.2437° W</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-neutral-500 font-mono text-[11px] block">Dispatches:</span>
                <span className="text-emerald-400 font-medium">Operational 24/7</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl flex items-start gap-3">
              <Mail className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white font-display">Editorial & Press</h4>
                <div className="text-xs text-neutral-300 font-mono mt-0.5">press@fandomverse.portal</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Responses within 24 business hours</div>
              </div>
            </div>

            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl flex items-start gap-3">
              <Phone className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white font-display">Fan Hotline & Voice</h4>
                <div className="text-xs text-neutral-300 font-mono mt-0.5">+1 (800) 555-FANDOM</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Mon–Fri: 09:00 - 18:00 PST</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-white">Send Direct Dispatch</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Connect with category curators, recommend new character profiles, or suggest upcoming conventions.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-semibold text-white font-display">Dispatch Received!</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Thank you for reaching out to FandomVerse! A category coordinator will review your inquiry shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ren Amamiya"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fan@fandomverse.org"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Category of Interest</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                  >
                    {CATEGORY_LIST.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                    <option value="general">General Fandom Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Suggestion for Anime Expo Panel"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your thoughts, questions, or fan project recommendations..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-950/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
