import React from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Tv, 
  CheckCircle2, 
  Car, 
  Wine, 
  Armchair, 
  Compass, 
  Ticket,
  ChevronRight
} from 'lucide-react';
import { Cinema, City, Movie } from '../types';
import { CINEMAS } from '../data/moviesData';

interface CinemasViewProps {
  selectedCity: City;
  onSelectCinemaForBooking: (cinema: Cinema) => void;
}

export const CinemasView: React.FC<CinemasViewProps> = ({
  selectedCity,
  onSelectCinemaForBooking
}) => {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-2 text-rose-500 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>Cinemas &amp; Formats in {selectedCity.name}</span>
        </div>
        <h2 className="text-3xl font-black text-white mt-1">
          State-of-the-Art iMovies Theatres
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Immerse yourself in crystal-clear IMAX Laser projection, Dolby Atmos three-dimensional spatial sound, and luxurious power recliners.
        </p>
      </div>

      {/* Cinema Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CINEMAS.map(cinema => (
          <div
            key={cinema.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-md shadow-rose-600/20 shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-rose-500">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                      {cinema.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{cinema.address}</span>
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full shrink-0">
                  {cinema.distance}
                </span>
              </div>

              {/* Screens List */}
              <div className="my-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Screens &amp; Technology:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cinema.screens.map(screen => (
                    <span
                      key={screen}
                      className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 text-cyan-300 border border-slate-700"
                    >
                      {screen}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="my-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Signature Amenities:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                  {cinema.facilities.map(fac => (
                    <span
                      key={fac}
                      className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-800/40 border border-slate-800 text-[11px]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{fac}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400 font-medium">
                {cinema.area}
              </span>

              <button
                onClick={() => onSelectCinemaForBooking(cinema)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Book at this Cinema</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
