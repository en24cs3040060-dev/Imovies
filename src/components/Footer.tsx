import React from 'react';
import { Clapperboard, Film, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Clapperboard className="w-4 h-4 text-rose-500" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                i<span className="text-rose-500">Movies</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The premier cinema destination. Seamless online movie ticket booking, real-time seat reservation, and IMAX Laser experience.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Secure Cinema Checkout</span>
            </div>
          </div>

          {/* Formats & Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Cinematic Formats
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">IMAX with Laser 70mm</li>
              <li className="hover:text-white transition-colors cursor-pointer">Dolby Cinema &amp; Atmos</li>
              <li className="hover:text-white transition-colors cursor-pointer">4DX Sensory Motion</li>
              <li className="hover:text-white transition-colors cursor-pointer">Royal VIP Recliner Lounges</li>
              <li className="hover:text-white transition-colors cursor-pointer">RealD 3D Immersive</li>
            </ul>
          </div>

          {/* Guest Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">iMovies Premiere Club</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cinema Gift Cards &amp; Vouchers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Instant Ticket Cancellation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Express Concessions Pickup</li>
              <li className="hover:text-white transition-colors cursor-pointer">Accessibility &amp; Assistive Audio</li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Flagship Theatres
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>New York • Times Square IMAX</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Los Angeles • Dolby Theatre West</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>San Francisco • Metreon 4DX</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Chicago • Millennium Dome</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>London • Leicester Square VIP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 iMovies Entertainment Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
