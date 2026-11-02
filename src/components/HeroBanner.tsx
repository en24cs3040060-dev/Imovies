import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Ticket, 
  Star, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Movie } from '../types';

interface HeroBannerProps {
  movies: Movie[];
  onBookMovie: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movies,
  onBookMovie,
  onWatchTrailer
}) => {
  const featuredMovies = movies.filter(m => m.status === 'now_showing').slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  const currentMovie = featuredMovies[currentIndex] || featuredMovies[0];

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] bg-slate-950 overflow-hidden">
      {/* Background Banner Image with Gradient Masks */}
      <div className="absolute inset-0">
        <img
          key={currentMovie.id}
          src={currentMovie.banner}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 scale-105 filter brightness-[0.45] contrast-125"
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent w-full lg:w-3/4" />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="max-w-2xl space-y-4">
          {/* Formats & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-rose-600/90 text-white font-black text-xs tracking-wider uppercase shadow-md shadow-rose-600/30">
              FEATURED IN CINEMAS
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/80 text-amber-400 font-bold text-xs flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{currentMovie.rating} / 10 ({currentMovie.votes})</span>
            </span>
            <span className="px-2 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs font-mono font-bold">
              {currentMovie.certificate}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs flex items-center space-x-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentMovie.duration}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
            {currentMovie.title}
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-rose-300 font-semibold italic">
            &quot;{currentMovie.tagline}&quot;
          </p>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed max-w-xl">
            {currentMovie.synopsis}
          </p>

          {/* Available Formats Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Experience in:</span>
            {currentMovie.formats.map(fmt => (
              <span
                key={fmt}
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800/90 text-cyan-300 border border-cyan-500/30"
              >
                {fmt}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onBookMovie(currentMovie)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 flex items-center space-x-2 transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Tickets</span>
            </button>

            <button
              onClick={() => onWatchTrailer(currentMovie)}
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700/80 backdrop-blur-md flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>

        {/* Carousel Indicators & Controls */}
        <div className="absolute bottom-6 right-6 sm:right-8 flex items-center space-x-3">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-sm transition-colors cursor-pointer"
            title="Previous Movie"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-1.5">
            {featuredMovies.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-7 bg-rose-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
                title={m.title}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-sm transition-colors cursor-pointer"
            title="Next Movie"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
