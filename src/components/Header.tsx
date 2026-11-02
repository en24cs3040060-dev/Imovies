import React, { useState } from 'react';
import { 
  Film, 
  MapPin, 
  Search, 
  Ticket, 
  Popcorn, 
  Building2, 
  User, 
  ChevronDown, 
  X,
  Sparkles,
  Clapperboard,
  Check
} from 'lucide-react';
import { City, Movie } from '../types';
import { CITIES } from '../data/moviesData';

interface HeaderProps {
  activeTab: 'movies' | 'cinemas' | 'snacks' | 'bookings';
  onTabChange: (tab: 'movies' | 'cinemas' | 'snacks' | 'bookings') => void;
  selectedCity: City;
  onSelectCity: (city: City) => void;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  bookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  selectedCity,
  onSelectCity,
  movies,
  onSelectMovie,
  bookingCount
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // Search results
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : movies.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.cast.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & City Selector */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <button
              onClick={() => onTabChange('movies')}
              className="flex items-center space-x-2.5 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 p-0.5 shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Clapperboard className="w-5 h-5 text-rose-500 group-hover:rotate-6 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-black tracking-tight text-white">
                    i<span className="text-rose-500">Movies</span>
                  </span>
                </div>
                <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">
                  Cinema Booking
                </span>
              </div>
            </button>

            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold">{selectedCity.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showCityDropdown && (
                <div className="absolute left-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                  <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 tracking-wider">
                    Select Your City
                  </p>
                  <div className="space-y-1">
                    {CITIES.map(city => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onSelectCity(city);
                          setShowCityDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          selectedCity.id === city.id
                            ? 'bg-rose-500/10 text-rose-400 font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{city.name}, {city.state}</span>
                        {selectedCity.id === city.id && (
                          <Check className="w-3.5 h-3.5 text-rose-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onTabChange('movies')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'movies'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Movies
            </button>

            <button
              onClick={() => onTabChange('cinemas')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'cinemas'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Cinemas</span>
            </button>

            <button
              onClick={() => onTabChange('snacks')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'snacks'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Popcorn className="w-4 h-4" />
              <span>Food &amp; Drinks</span>
            </button>

            <button
              onClick={() => onTabChange('bookings')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center space-x-1.5 relative ${
                activeTab === 'bookings'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Tickets</span>
              {bookingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Icons: Search & Profile */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                title="Search movies..."
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Search Dropdown / Popup */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2 flex-1">
                      <Search className="w-4 h-4 text-rose-500" />
                      <input
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search movies, genres, actors..."
                        className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
                      />
                    </div>
                    <button
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 max-h-64 overflow-y-auto space-y-2">
                    {searchQuery.trim() === '' ? (
                      <div className="py-4 text-center text-xs text-slate-500">
                        Type to search current blockbusters &amp; trailers
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="py-4 text-center text-xs text-slate-400">
                        No movies found matching &quot;{searchQuery}&quot;
                      </div>
                    ) : (
                      searchResults.map(movie => (
                        <button
                          key={movie.id}
                          onClick={() => {
                            onSelectMovie(movie);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-slate-800/80 flex items-center space-x-3 transition-colors cursor-pointer"
                        >
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-10 h-14 object-cover rounded-lg shrink-0"
                          />
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-white truncate">{movie.title}</h4>
                            <p className="text-[11px] text-slate-400 truncate">{movie.genres.join(' • ')}</p>
                            <span className="text-[10px] text-rose-400 font-semibold font-mono">★ {movie.rating} • {movie.duration}</span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Profile */}
            <button
              onClick={() => setShowUserModal(true)}
              className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                PG
              </div>
              <span className="text-xs font-semibold hidden sm:inline-block">Puneeth</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950/95 py-2 px-1">
        <button
          onClick={() => onTabChange('movies')}
          className={`flex flex-col items-center space-y-1 py-1 px-3 text-[11px] font-semibold cursor-pointer ${
            activeTab === 'movies' ? 'text-rose-500' : 'text-slate-400'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Movies</span>
        </button>

        <button
          onClick={() => onTabChange('cinemas')}
          className={`flex flex-col items-center space-y-1 py-1 px-3 text-[11px] font-semibold cursor-pointer ${
            activeTab === 'cinemas' ? 'text-rose-500' : 'text-slate-400'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Cinemas</span>
        </button>

        <button
          onClick={() => onTabChange('snacks')}
          className={`flex flex-col items-center space-y-1 py-1 px-3 text-[11px] font-semibold cursor-pointer ${
            activeTab === 'snacks' ? 'text-rose-500' : 'text-slate-400'
          }`}
        >
          <Popcorn className="w-4 h-4" />
          <span>Snacks</span>
        </button>

        <button
          onClick={() => onTabChange('bookings')}
          className={`flex flex-col items-center space-y-1 py-1 px-3 text-[11px] font-semibold cursor-pointer relative ${
            activeTab === 'bookings' ? 'text-rose-500' : 'text-slate-400'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Tickets</span>
          {bookingCount > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black flex items-center justify-center">
              {bookingCount}
            </span>
          )}
        </button>
      </div>

      {/* User Profile Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2 pb-4 border-b border-slate-800">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 mx-auto flex items-center justify-center font-black text-xl text-white shadow-lg mb-3">
                PG
              </div>
              <h3 className="text-base font-bold text-white">Puneeth Golla</h3>
              <p className="text-xs text-slate-400">puneethgolla41460@gmail.com</p>
              <div className="inline-flex items-center space-x-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>iMovies VIP Premiere Member</span>
              </div>
            </div>

            <div className="py-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Member Status:</span>
                <span className="font-semibold text-emerald-400">Active</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Tickets Booked:</span>
                <span className="font-semibold text-white font-mono">{bookingCount} reservation(s)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">VIP Reward Points:</span>
                <span className="font-semibold text-amber-400 font-mono">1,450 pts</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Home Theater:</span>
                <span className="font-semibold text-white">iMovies Grand IMAX - Downtown</span>
              </div>
            </div>

            <button
              onClick={() => setShowUserModal(false)}
              className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
