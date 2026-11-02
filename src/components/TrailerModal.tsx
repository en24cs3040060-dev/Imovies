import React from 'react';
import { X, Play, Ticket, Star, Clock } from 'lucide-react';
import { Movie } from '../types';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
  onBookTickets: (movie: Movie) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  movie,
  onClose,
  onBookTickets
}) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col">
        {/* Top Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Official HD Trailer
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`${movie.trailerUrl}?autoplay=1&mute=0&controls=1&rel=0`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom Details & CTA */}
        <div className="p-4 sm:p-5 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-black text-white">{movie.title}</h3>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">
                {movie.certificate}
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center space-x-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{movie.rating}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Directed by {movie.director} • Starring {movie.cast.map(c => c.name).slice(0, 3).join(', ')}
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookTickets(movie);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer shrink-0"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Tickets Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
