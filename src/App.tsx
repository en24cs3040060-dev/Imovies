/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MovieCatalog } from './components/MovieCatalog';
import { CinemasView } from './components/CinemasView';
import { SnackShopView } from './components/SnackShopView';
import { MyBookingsView } from './components/MyBookingsView';
import { BookingModal } from './components/BookingFlow/BookingModal';
import { TrailerModal } from './components/TrailerModal';
import { Footer } from './components/Footer';

import { Movie, Cinema, Booking, City } from './types';
import { MOVIES, CITIES, INITIAL_BOOKINGS } from './data/moviesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'movies' | 'cinemas' | 'snacks' | 'bookings'>('movies');
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [movies] = useState<Movie[]>(MOVIES);

  // Bookings with LocalStorage persistence
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('imovies_user_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem('imovies_user_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Modal triggers
  const [bookingMovie, setBookingMovie] = useState<Movie | null>(null);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);

  const handleBookMovie = (movie: Movie) => {
    setBookingMovie(movie);
  };

  const handleWatchTrailer = (movie: Movie) => {
    setTrailerMovie(movie);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this reservation? A full refund will be credited to your original payment method.')) {
      setBookings(prev =>
        prev.map(b => (b.bookingId === bookingId ? { ...b, status: 'cancelled' } : b))
      );
    }
  };

  const handleSelectCinemaForBooking = (cinema: Cinema) => {
    // Pick the top movie and trigger booking
    const topMovie = movies[0];
    setBookingMovie(topMovie);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        movies={movies}
        onSelectMovie={handleBookMovie}
        bookingCount={bookings.filter(b => b.status === 'confirmed').length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'movies' && (
          <>
            {/* Cinematic Billboard Spotlight */}
            <HeroBanner
              movies={movies}
              onBookMovie={handleBookMovie}
              onWatchTrailer={handleWatchTrailer}
            />

            {/* Now Showing & Coming Soon Catalog */}
            <MovieCatalog
              movies={movies}
              onBookMovie={handleBookMovie}
              onWatchTrailer={handleWatchTrailer}
            />
          </>
        )}

        {activeTab === 'cinemas' && (
          <CinemasView
            selectedCity={selectedCity}
            onSelectCinemaForBooking={handleSelectCinemaForBooking}
          />
        )}

        {activeTab === 'snacks' && (
          <SnackShopView />
        )}

        {activeTab === 'bookings' && (
          <MyBookingsView
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onExploreMovies={() => setActiveTab('movies')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Wizard Modal */}
      <BookingModal
        movie={bookingMovie}
        onClose={() => setBookingMovie(null)}
        onBookingSuccess={handleBookingSuccess}
        onViewMyBookings={() => setActiveTab('bookings')}
      />

      {/* Official HD Trailer Player Modal */}
      <TrailerModal
        movie={trailerMovie}
        onClose={() => setTrailerMovie(null)}
        onBookTickets={handleBookMovie}
      />
    </div>
  );
}
