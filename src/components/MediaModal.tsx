import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Film, Headphones, Clock, Tag } from 'lucide-react';
import { MediaItem } from '../data/types.ts';
import { CATEGORIES } from '../data/categories.ts';

interface MediaModalProps {
  media: MediaItem | null;
  onClose: () => void;
  onBookmarkToggle?: (media: MediaItem) => void;
  isFavorited?: boolean;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  media,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioProgress, setAudioProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
    setAudioProgress(10);
  }, [media]);

  // Audio timer simulation
  useEffect(() => {
    if (!media?.isAudio || !isPlaying) return;
    const interval = setInterval(() => {
      setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [media?.isAudio, isPlaying]);

  if (!media) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <div className="flex items-center gap-2">
            {media.isAudio ? (
              <Headphones className="w-5 h-5 text-rose-500" />
            ) : (
              <Film className="w-5 h-5 text-rose-500" />
            )}
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
              {media.type.replace('_', ' ')} · {CATEGORIES[media.category]?.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close media player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Container */}
        <div className="relative aspect-video bg-neutral-900 flex items-center justify-center overflow-hidden">
          {media.isAudio ? (
            /* Audio Player UI */
            <div className="w-full h-full p-8 flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div className="w-24 h-24 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6 shadow-xl relative overflow-hidden group">
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>

              {/* Sound Wave Animation */}
              <div className="flex items-center gap-1 h-12 w-full max-w-md justify-center mb-4">
                {[40, 65, 80, 50, 90, 75, 45, 85, 95, 60, 40, 70, 85, 55, 65, 90, 45, 75, 50].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-rose-500 animate-pulse' : 'bg-neutral-700'
                      }`}
                      style={{
                        height: isPlaying ? `${Math.max(15, (h * (audioProgress % 10 + 5)) / 12)}%` : '20%',
                      }}
                    />
                  )
                )}
              </div>

              {/* Progress Slider */}
              <div className="w-full max-w-md space-y-2">
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>02:14</span>
                  <span>{media.duration}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Video Player */
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <img
                src={media.thumbnail}
                alt={media.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 ml-1" />
                </button>
                <div className="mt-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-mono text-neutral-300">
                  High-Definition Cinema Stream
                </div>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-rose-400">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-rose-400">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-neutral-300 text-[11px]">{media.duration}</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  1080p 60fps · FandomVerse Media
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Media Details */}
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold font-display text-white">{media.title}</h3>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{media.duration}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {media.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs text-neutral-400">
            <Tag className="w-3.5 h-3.5 text-neutral-500 mr-1" />
            {media.tags.map((tag, idx) => (
              <span key={tag} className="text-neutral-400">
                #{tag}{idx < media.tags.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
