import React, { useState } from 'react';
import { 
  Film, 
  Star, 
  Clock, 
  Play, 
  Ticket, 
  SlidersHorizontal, 
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';
import { Movie, MovieStatus } from '../types';

interface MovieCatalogProps {
  movies: Movie[];
  onBookMovie: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
}

export const MovieCatalog: React.FC<MovieCatalogProps> = ({
  movies,
  onBookMovie,
  onWatchTrailer
}) => {
  const [activeTab, setActiveTab] = useState<MovieStatus>('now_showing');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Animation', 'Comedy', 'Adventure'];
  const formats = ['All', 'IMAX 3D', 'Dolby Cinema', '4DX', 'Standard 2D'];

  // Filter movies based on status, genre, and format
  const filteredMovies = movies.filter(movie => {
    const matchesStatus = movie.status === activeTab;
    const matchesGenre = selectedGenre === 'All' || movie.genres.includes(selectedGenre);
    const matchesFormat = selectedFormat === 'All' || movie.formats.includes(selectedFormat as any);
    return matchesStatus && matchesGenre && matchesFormat;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Category Tabs: Now Showing vs Coming Soon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('now_showing')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'now_showing'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Now Showing ({movies.filter(m => m.status === 'now_showing').length})
          </button>

          <button
            onClick={() => setActiveTab('coming_soon')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'coming_soon'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coming Soon ({movies.filter(m => m.status === 'coming_soon').length})
          </button>
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mr-2 hidden lg:inline-block">
            Format:
          </span>
          {formats.map(fmt => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFormat === fmt
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mr-1 hidden sm:inline-block">
          Genre:
        </span>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedGenre === genre
                ? 'bg-slate-100 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-slate-900/50 border border-slate-800 text-slate-400">
          <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-base font-semibold text-white">No movies match your filters</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the genre or cinema format filter.</p>
          <button
            onClick={() => { setSelectedGenre('All'); setSelectedFormat('All'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col group"
            >
              {/* Poster with Overlay CTAs */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Rating & Cert Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-amber-400 font-bold text-xs flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{movie.rating}</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-slate-300 font-mono text-[10px] font-bold">
                    {movie.certificate}
                  </span>
                </div>

                {/* Duration */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-slate-300 font-mono text-[10px]">
                    {movie.duration}
                  </span>
                </div>

                {/* Hover Play Trailer Button */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={() => onWatchTrailer(movie)}
                    className="p-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-600/50 transform scale-90 group-hover:scale-100 transition-all cursor-pointer"
                    title="Watch Trailer"
                  >
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white truncate group-hover:text-rose-400 transition-colors">
                    {movie.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {movie.genres.join(' • ')}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {movie.formats.slice(0, 3).map(fmt => (
                      <span
                        key={fmt}
                        className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">From</span>
                    <span className="text-sm font-black text-white font-mono">
                      ${movie.basePrice.toFixed(2)}
                    </span>
                  </div>

                  {movie.status === 'now_showing' ? (
                    <button
                      onClick={() => onBookMovie(movie)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-md shadow-rose-600/20 flex items-center space-x-1.5 transition-all cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onWatchTrailer(movie)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>Preview</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
