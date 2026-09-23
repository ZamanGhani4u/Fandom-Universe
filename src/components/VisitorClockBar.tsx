import React, { useState, useEffect } from 'react';
import { Clock, Users, ShieldCheck } from 'lucide-react';
import { getAndIncrementVisitorCount } from '../utils/storage.ts';

export const VisitorClockBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [visitorCount, setVisitorCount] = useState<number>(148295);

  useEffect(() => {
    // Visitor counter
    const count = getAndIncrementVisitorCount();
    setVisitorCount(count);

    // Live clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-neutral-950/80 border-b border-neutral-800/80 backdrop-blur-md px-4 py-1.5 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Real-time clock */}
        <div className="flex items-center gap-2 font-mono">
          <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="text-neutral-200 font-medium tabular-nums">{currentTime || '12:00:00 AM'}</span>
          <span className="text-neutral-600 hidden sm:inline">·</span>
          <span className="text-neutral-400 hidden sm:inline">{currentDate}</span>
          <span className="text-neutral-600 hidden md:inline">·</span>
          <span className="text-neutral-500 hidden md:inline">UTC / Global Standard</span>
        </div>

        {/* Right: Simulated Visitor Counter & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono">
            <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-400">Total Visits:</span>
            <span className="text-rose-400 font-semibold tabular-nums">
              {visitorCount.toLocaleString()}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-neutral-400 text-[11px]">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>FandomVerse Engine v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
