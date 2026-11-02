import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Calendar, 
  Ticket, 
  Check, 
  Sparkles, 
  Popcorn, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Plus, 
  Minus, 
  Film,
  Building2,
  Printer,
  Download
} from 'lucide-react';
import { Movie, Cinema, ConcessionItem, Booking } from '../../types';
import { CINEMAS, CONCESSIONS } from '../../data/moviesData';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  movie: Movie | null;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
  onViewMyBookings: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  movie,
  onClose,
  onBookingSuccess,
  onViewMyBookings
}) => {
  if (!movie) return null;

  // Multi-step Wizard State: 1 = Showtime, 2 = Seats, 3 = Snacks, 4 = Checkout, 5 = Confirmation Pass
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Date & Cinema & Time Selection
  const dates = [
    { label: 'Today', date: 'Today, Nov 2' },
    { label: 'Tomorrow', date: 'Tomorrow, Nov 3' },
    { label: 'Wednesday', date: 'Wed, Nov 4' },
    { label: 'Thursday', date: 'Thu, Nov 5' },
  ];
  const [selectedDate, setSelectedDate] = useState(dates[0].date);
  const [selectedCinema, setSelectedCinema] = useState<Cinema>(CINEMAS[0]);
  const [selectedFormat, setSelectedFormat] = useState<string>(movie.formats[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('06:00 PM');

  // Step 2: Seat Map State
  // Rows: G (VIP), E-F (Premium), A-D (Standard)
  const rows = [
    { row: 'G', tier: 'vip' as const, label: 'VIP Recliner Lounge', price: movie.basePrice + 7.00 },
    { row: 'F', tier: 'premium' as const, label: 'Premium Prime View', price: movie.basePrice + 3.50 },
    { row: 'E', tier: 'premium' as const, label: 'Premium Prime View', price: movie.basePrice + 3.50 },
    { row: 'D', tier: 'standard' as const, label: 'Classic Standard', price: movie.basePrice },
    { row: 'C', tier: 'standard' as const, label: 'Classic Standard', price: movie.basePrice },
    { row: 'B', tier: 'standard' as const, label: 'Classic Standard', price: movie.basePrice },
    { row: 'A', tier: 'standard' as const, label: 'Classic Standard', price: movie.basePrice },
  ];

  // Hardcoded occupied seats for realistic feeling
  const occupiedSeats = ['G4', 'G5', 'F5', 'F6', 'E3', 'E4', 'D7', 'D8', 'C2', 'B5'];
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Step 3: Concessions State
  const [concessionCart, setConcessionCart] = useState<{ [snackId: string]: number }>({});

  // Step 4: Customer Details & Promo
  const [customerName, setCustomerName] = useState('Puneeth Golla');
  const [customerEmail, setCustomerEmail] = useState('puneethgolla41460@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 349-8201');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Apple Pay' | 'Credit Card' | 'Google Pay'>('Apple Pay');

  // Step 5: Created Ticket state
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Seat toggle handler
  const handleToggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert('Maximum 8 tickets allowed per reservation.');
        return;
      }
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  // Concession counter
  const handleUpdateSnack = (snackId: string, delta: number) => {
    setConcessionCart(prev => {
      const current = prev[snackId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[snackId];
        return copy;
      }
      return { ...prev, [snackId]: next };
    });
  };

  // Price calculations
  const getSeatTierPrice = (seatId: string) => {
    const rowChar = seatId[0];
    const rowConfig = rows.find(r => r.row === rowChar);
    return rowConfig ? rowConfig.price : movie.basePrice;
  };

  const getSeatTierName = (seatId: string) => {
    const rowChar = seatId[0];
    const rowConfig = rows.find(r => r.row === rowChar);
    return rowConfig ? rowConfig.tier : 'standard';
  };

  const seatsSubtotal = selectedSeats.reduce((sum, seatId) => sum + getSeatTierPrice(seatId), 0);

  const snacksSubtotal = Object.entries(concessionCart).reduce((sum, [snackId, qty]) => {
    const item = CONCESSIONS.find(c => c.id === snackId);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const discountAmount = promoApplied ? Math.round((seatsSubtotal + snacksSubtotal) * 0.2 * 100) / 100 : 0;
  const convenienceFee = selectedSeats.length > 0 ? 2.50 : 0;
  const taxAmount = Math.round((seatsSubtotal + snacksSubtotal - discountAmount) * 0.0825 * 100) / 100;
  const grandTotal = Math.max(0, seatsSubtotal + snacksSubtotal - discountAmount + convenienceFee + taxAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'IMOVIE20' || promoCode.trim().toUpperCase() === 'CINEMA20') {
      setPromoApplied(true);
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      } catch {}
    } else {
      alert('Invalid code. Try using promo code: IMOVIE20 for 20% off!');
    }
  };

  // Final booking execution
  const handleFinalCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return;

    const concessionItems = Object.entries(concessionCart).map(([snackId, qty]) => {
      const item = CONCESSIONS.find(c => c.id === snackId)!;
      return { item, quantity: qty };
    });

    const newBooking: Booking = {
      bookingId: `IMV-${Math.floor(100000 + Math.random() * 900000)}`,
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      movieCertificate: movie.certificate,
      cinemaId: selectedCinema.id,
      cinemaName: selectedCinema.name,
      screenName: `${selectedFormat} Auditorium 1`,
      format: selectedFormat,
      showDate: selectedDate,
      showtime: selectedShowtime,
      seats: [...selectedSeats],
      seatTiers: selectedSeats.map(s => ({
        seat: s,
        tier: getSeatTierName(s),
        price: getSeatTierPrice(s)
      })),
      concessions: concessionItems,
      subtotal: seatsSubtotal + snacksSubtotal,
      discount: discountAmount,
      convenienceFee,
      tax: taxAmount,
      totalAmount: grandTotal,
      customerName,
      customerEmail,
      customerPhone,
      bookedAt: new Date().toLocaleString(),
      paymentMethod,
      qrCodeToken: `IMV-TOKEN-${movie.id.toUpperCase()}-${Date.now()}`,
      status: 'confirmed'
    };

    setCreatedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep(5);

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Wizard Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-700">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-white truncate max-w-xs sm:max-w-md">
                  {movie.title}
                </h3>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono font-bold px-1.5 py-0.5 rounded border border-slate-700">
                  {movie.certificate}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {movie.genres.join(', ')} • {movie.duration}
              </p>
            </div>
          </div>

          {/* Stepper Dots (desktop) */}
          <div className="hidden sm:flex items-center space-x-2">
            {[
              { num: 1, label: 'Showtime' },
              { num: 2, label: 'Seats' },
              { num: 3, label: 'Snacks' },
              { num: 4, label: 'Payment' }
            ].map(s => (
              <div key={s.num} className="flex items-center space-x-1.5">
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                  step === s.num
                    ? 'bg-rose-600 text-white shadow-md'
                    : step > s.num
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </span>
                <span className={`text-xs font-medium ${step === s.num ? 'text-white' : 'text-slate-500'}`}>
                  {s.label}
                </span>
                {s.num < 4 && <ChevronRight className="w-3.5 h-3.5 text-slate-700" />}
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CINEMA, DATE & SHOWTIME */}
        {step === 1 && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Date Tabs */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                1. Select Date
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dates.map(d => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedDate === d.date
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-[11px] text-slate-400 block font-medium">{d.label}</span>
                    <span className="text-sm font-bold text-white block mt-0.5">{d.date.split(',')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cinema Selection */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                2. Select Cinema Hall
              </span>
              <div className="space-y-2.5">
                {CINEMAS.map(cinema => (
                  <button
                    key={cinema.id}
                    onClick={() => setSelectedCinema(cinema)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedCinema.id === cinema.id
                        ? 'bg-slate-800/90 border-rose-500 shadow-md ring-1 ring-rose-500/50'
                        : 'bg-slate-800/30 border-slate-800 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <Building2 className={`w-5 h-5 ${selectedCinema.id === cinema.id ? 'text-rose-500' : 'text-slate-400'}`} />
                        <div>
                          <h4 className="text-sm font-bold text-white">{cinema.name}</h4>
                          <p className="text-xs text-slate-400">{cinema.address} • {cinema.distance}</p>
                        </div>
                      </div>
                      {selectedCinema.id === cinema.id && (
                        <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Format & Showtimes */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                3. Select Showtime &amp; Format
              </span>

              {/* Format pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.formats.map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      selectedFormat === fmt
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {/* Showtime slots */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['10:30 AM', '02:15 PM', '06:00 PM', '09:45 PM'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedShowtime(time)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedShowtime === time
                        ? 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white border-transparent shadow-lg font-bold'
                        : 'bg-slate-800/40 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-sm font-extrabold font-mono block">{time}</span>
                    <span className="text-[10px] text-cyan-300 block mt-0.5">{selectedFormat}</span>
                    <span className="text-[9px] text-emerald-400 block mt-0.5 font-medium">Available</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: INTERACTIVE CURVED CINEMA SEAT MAP */}
        {step === 2 && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 flex flex-col items-center">
            {/* Screen visualizer */}
            <div className="w-full max-w-lg text-center mt-2">
              <div className="h-3 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-lg shadow-cyan-400/50" />
              <p className="text-[10px] font-mono tracking-widest text-cyan-300 mt-2 uppercase">
                ALL EYES ON THE SCREEN • {selectedFormat.toUpperCase()}
              </p>
            </div>

            {/* Seat Rows Matrix */}
            <div className="w-full max-w-xl space-y-2.5 my-2">
              {rows.map(r => (
                <div key={r.row} className="flex items-center justify-center space-x-2">
                  <span className="w-6 text-xs font-mono font-bold text-slate-400 text-right">
                    {r.row}
                  </span>

                  <div className="flex items-center space-x-1 sm:space-x-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                      const seatId = `${r.row}${num}`;
                      const isOccupied = occupiedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isOccupied}
                          onClick={() => handleToggleSeat(seatId)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                            isOccupied
                              ? 'bg-slate-800/60 text-slate-600 border border-slate-800 cursor-not-allowed'
                              : isSelected
                              ? 'bg-rose-500 text-white ring-2 ring-rose-400 scale-105 shadow-md shadow-rose-500/50'
                              : r.tier === 'vip'
                              ? 'bg-amber-950/40 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950'
                              : r.tier === 'premium'
                              ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500 hover:text-white'
                              : 'bg-slate-800/90 text-slate-300 border border-slate-700 hover:bg-slate-700'
                          }`}
                          title={`${seatId} - ${r.label} ($${r.price.toFixed(2)})`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono w-12 text-left pl-1">
                    ${r.price.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 border-t border-slate-800 pt-3 w-full">
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700" />
                <span>Classic ($15.00)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-indigo-950 border border-indigo-500 text-indigo-300" />
                <span>Premium ($18.50)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-amber-950 border border-amber-500 text-amber-300" />
                <span>VIP Recliner ($22.00)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-rose-500" />
                <span className="text-rose-400 font-bold">Selected</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded bg-slate-800 text-slate-600" />
                <span>Occupied</span>
              </div>
            </div>

            {/* Selection notification bar */}
            <div className="w-full max-w-lg p-3 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Selected Seats: </span>
                <span className="font-bold text-white font-mono">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Subtotal: </span>
                <span className="font-extrabold text-rose-400 font-mono text-sm">
                  ${seatsSubtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: FOOD & BEVERAGES (CONCESSIONS) */}
        {step === 3 && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Popcorn className="w-4 h-4 text-amber-400" />
                  <span>Cinema Snacks &amp; Combos</span>
                </h4>
                <p className="text-xs text-slate-400">Pre-order for express pickup at the counter or seat delivery</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                Snacks Total: ${snacksSubtotal.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONCESSIONS.map(snack => {
                const qty = concessionCart[snack.id] || 0;

                return (
                  <div
                    key={snack.id}
                    className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center space-x-3.5 hover:bg-slate-800/70 transition-colors"
                  >
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="w-16 h-16 object-cover rounded-xl shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{snack.name}</h5>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{snack.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-extrabold text-amber-400 font-mono">
                          ${snack.price.toFixed(2)}
                        </span>

                        <div className="flex items-center space-x-2">
                          {qty > 0 && (
                            <>
                              <button
                                onClick={() => handleUpdateSnack(snack.id, -1)}
                                className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono text-xs font-bold text-white w-4 text-center">
                                {qty}
                              </span>
                            </>
                          )}
                          <button
                            onClick={() => handleUpdateSnack(snack.id, 1)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{qty === 0 ? 'Add' : ''}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: CHECKOUT & PAYMENT */}
        {step === 4 && (
          <form onSubmit={handleFinalCheckout} className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Contact & Payment Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Contact Information
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email for Digital Ticket</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone (SMS Confirmation)</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Apple Pay', 'Credit Card', 'Google Pay'] as const).map(method => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          paymentMethod === method
                            ? 'bg-rose-500/20 border-rose-500 text-white'
                            : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Promo Code */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                    <span>Order Breakdown</span>
                    <span className="text-xs text-rose-400 font-mono">{selectedSeats.length} Ticket(s)</span>
                  </h4>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between pb-2 border-b border-slate-800">
                      <span className="text-slate-400">Cinema &amp; Hall:</span>
                      <span className="font-semibold text-white truncate max-w-[170px]">{selectedCinema.name}</span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-800">
                      <span className="text-slate-400">Show Date &amp; Time:</span>
                      <span className="font-semibold text-cyan-300 font-mono">{selectedDate} • {selectedShowtime}</span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-800">
                      <span className="text-slate-400">Seats ({selectedSeats.join(', ')}):</span>
                      <span className="font-semibold text-white font-mono">${seatsSubtotal.toFixed(2)}</span>
                    </div>

                    {snacksSubtotal > 0 && (
                      <div className="flex justify-between pb-2 border-b border-slate-800">
                        <span className="text-slate-400">Concessions / Food:</span>
                        <span className="font-semibold text-amber-400 font-mono">${snacksSubtotal.toFixed(2)}</span>
                      </div>
                    )}

                    {promoApplied && (
                      <div className="flex justify-between pb-2 border-b border-slate-800 text-emerald-400">
                        <span>Promo Code (20% OFF):</span>
                        <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between pb-2 border-b border-slate-800">
                      <span className="text-slate-400">Convenience Fee:</span>
                      <span className="font-mono text-slate-300">${convenienceFee.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between pb-2 border-b border-slate-800">
                      <span className="text-slate-400">Estimated Taxes:</span>
                      <span className="font-mono text-slate-300">${taxAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-extrabold text-white">Grand Total:</span>
                      <span className="text-xl font-black text-rose-500 font-mono">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Promo Input */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code: IMOVIE20"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-[10px] text-emerald-400 mt-1 font-semibold">
                        ✓ 20% discount applied successfully!
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ${grandTotal.toFixed(2)} with {paymentMethod}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* STEP 5: BOOKING CONFIRMATION & DIGITAL E-TICKET PASS */}
        {step === 5 && createdBooking && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 flex flex-col items-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-black text-white">Tickets Confirmed!</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                We have emailed your digital ticket to <span className="text-white font-medium">{createdBooking.customerEmail}</span>
              </p>
            </div>

            {/* High-fidelity Cinema Ticket Pass */}
            <div className="w-full max-w-md bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              {/* Notches for authentic ticket look */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-r border-slate-700" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-l border-slate-700" />

              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">
                    iMovies Cinema Pass
                  </span>
                  <h4 className="text-lg font-black text-white">{createdBooking.movieTitle}</h4>
                  <p className="text-xs text-slate-400">{createdBooking.cinemaName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 block">BOOKING REF</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{createdBooking.bookingId}</span>
                </div>
              </div>

              {/* Pass Details Grid */}
              <div className="grid grid-cols-3 gap-3 py-4 text-xs border-b border-dashed border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">Date</span>
                  <p className="font-bold text-white mt-0.5">{createdBooking.showDate}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Time</span>
                  <p className="font-bold text-cyan-300 font-mono mt-0.5">{createdBooking.showtime}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Seats</span>
                  <p className="font-black text-rose-400 font-mono mt-0.5">{createdBooking.seats.join(', ')}</p>
                </div>
              </div>

              {/* Concessions on Ticket if any */}
              {createdBooking.concessions.length > 0 && (
                <div className="py-2.5 border-b border-dashed border-slate-800 text-[11px] text-slate-300">
                  <span className="text-slate-400 font-medium">Pre-ordered Snacks: </span>
                  <span>{createdBooking.concessions.map(c => `${c.quantity}x ${c.item.name}`).join(', ')}</span>
                </div>
              )}

              {/* QR Code and Barcode */}
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 block">SCAN AT AUDITORIUM DOOR</span>
                  <p className="text-xs font-mono font-bold text-slate-300 mt-1">
                    Hall: {createdBooking.screenName}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    Total Paid: ${createdBooking.totalAmount.toFixed(2)}
                  </p>
                </div>

                <div className="w-20 h-20 bg-white p-1.5 rounded-xl shadow-md shrink-0 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
              </div>
            </div>

            {/* Post Booking Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewMyBookings();
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Go to My Tickets
              </button>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        {step < 5 && (
          <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-4">
              {step === 2 && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Total</span>
                  <span className="text-sm font-bold text-white font-mono">${seatsSubtotal.toFixed(2)}</span>
                </div>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  disabled={step === 2 && selectedSeats.length === 0}
                  onClick={() => setStep((step + 1) as any)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    step === 2 && selectedSeats.length === 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                  }`}
                >
                  <span>{step === 3 ? 'Proceed to Checkout' : 'Continue'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
