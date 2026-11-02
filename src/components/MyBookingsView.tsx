import React, { useState } from 'react';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  Film,
  Building2,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsViewProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onExploreMovies: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onCancelBooking,
  onExploreMovies
}) => {
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(bookings[0] || null);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <Ticket className="w-6 h-6 text-rose-500" />
            <span>My Cinema Tickets &amp; Passes</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your confirmed e-tickets, auditorium seat allocations, and booking barcodes
          </p>
        </div>

        <button
          onClick={onExploreMovies}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          Book Another Movie
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400 max-w-lg mx-auto">
          <Film className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white">No Tickets Booked Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            You don’t have any active cinema reservations. Browse now showing blockbusters to book your seats.
          </p>
          <button
            onClick={onExploreMovies}
            className="mt-6 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-lg shadow-rose-600/30 cursor-pointer"
          >
            Explore Now Showing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List of Bookings (Left 2 cols or 1 col) */}
          <div className="lg:col-span-1 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Reservations ({bookings.length})
            </span>

            {bookings.map(b => (
              <div
                key={b.bookingId}
                onClick={() => setSelectedTicket(b)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedTicket?.bookingId === b.bookingId
                    ? 'bg-slate-800/90 border-rose-500 shadow-md ring-1 ring-rose-500/40'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={b.moviePoster}
                    alt={b.movieTitle}
                    className="w-14 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-cyan-400">{b.bookingId}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white truncate mt-1">{b.movieTitle}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{b.cinemaName}</p>

                    <div className="flex items-center space-x-2 mt-2 text-xs">
                      <span className="text-slate-300 font-mono font-medium">{b.showtime}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-rose-400 font-mono font-bold">{b.seats.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Inspector Detail (Right 2 cols) */}
          {selectedTicket && (
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
                      Verified Cinema E-Pass
                    </span>
                    <h3 className="text-2xl font-black text-white mt-0.5">
                      {selectedTicket.movieTitle}
                    </h3>
                    <p className="text-xs text-slate-400">{selectedTicket.cinemaName}</p>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Pass</span>
                    </button>
                    {selectedTicket.status === 'confirmed' && (
                      <button
                        onClick={() => onCancelBooking(selectedTicket.bookingId)}
                        className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 text-xs transition-colors cursor-pointer"
                        title="Cancel Reservation & Refund"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Ticket Details Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                  <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono block">DATE</span>
                    <p className="text-sm font-bold text-white mt-0.5">{selectedTicket.showDate}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono block">SHOWTIME</span>
                    <p className="text-sm font-bold text-cyan-300 font-mono mt-0.5">{selectedTicket.showtime}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono block">FORMAT</span>
                    <p className="text-sm font-bold text-amber-400 font-mono mt-0.5">{selectedTicket.format}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono block">SEATS ({selectedTicket.seats.length})</span>
                    <p className="text-sm font-black text-rose-400 font-mono mt-0.5">{selectedTicket.seats.join(', ')}</p>
                  </div>
                </div>

                {/* Pre-ordered snacks if any */}
                {selectedTicket.concessions.length > 0 && (
                  <div className="mb-6 p-4 rounded-2xl bg-amber-950/20 border border-amber-600/30">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                      Pre-ordered Food &amp; Beverage:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedTicket.concessions.map((c, i) => (
                        <div key={i} className="flex items-center space-x-2 text-slate-300">
                          <span className="font-bold text-amber-400 font-mono">{c.quantity}x</span>
                          <span>{c.item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing summary */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Paid:</span>
                    <span className="font-bold text-white font-mono">${selectedTicket.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Channel:</span>
                    <span className="font-medium text-slate-300">{selectedTicket.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Booked For:</span>
                    <span className="font-medium text-white">{selectedTicket.customerName} ({selectedTicket.customerEmail})</span>
                  </div>
                </div>
              </div>

              {/* Barcode & Entry Instructions */}
              <div className="mt-8 pt-6 border-t border-dashed border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">Ready for Entry</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Present this QR code or Booking ID {selectedTicket.bookingId} to the cinema usher at {selectedTicket.screenName}.
                  </p>
                </div>

                <div className="bg-white p-2.5 rounded-2xl shadow-lg shrink-0 w-28 h-28 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
