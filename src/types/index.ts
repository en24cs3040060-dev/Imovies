export type MovieStatus = 'now_showing' | 'coming_soon';

export interface CastMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  genres: string[];
  duration: string;
  rating: number; // e.g. 8.6
  votes: string;
  certificate: 'PG' | 'PG-13' | 'R' | 'G';
  releaseDate: string;
  poster: string;
  banner: string;
  trailerUrl: string;
  synopsis: string;
  director: string;
  cast: CastMember[];
  status: MovieStatus;
  formats: ('IMAX 3D' | 'Dolby Cinema' | '4DX' | 'Standard 2D' | 'RealD 3D')[];
  basePrice: number;
}

export interface Cinema {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  screens: string[];
  facilities: string[];
  distance: string;
}

export interface Showtime {
  id: string;
  cinemaId: string;
  movieId: string;
  time: string;
  format: 'IMAX 3D' | 'Dolby Cinema' | '4DX' | 'Standard 2D' | 'RealD 3D';
  screenName: string;
  date: string;
  pricing: {
    standard: number;
    premium: number;
    vip: number;
  };
  fillingFast?: boolean;
}

export type SeatTier = 'standard' | 'premium' | 'vip';
export type SeatStatus = 'available' | 'reserved' | 'selected';

export interface Seat {
  id: string; // e.g. "C4"
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  status: SeatStatus;
}

export interface ConcessionItem {
  id: string;
  name: string;
  category: 'Combos' | 'Popcorn' | 'Snacks' | 'Beverages';
  price: number;
  image: string;
  description: string;
  calories?: string;
  quantity?: number;
}

export interface Booking {
  bookingId: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  movieCertificate: string;
  cinemaId: string;
  cinemaName: string;
  screenName: string;
  format: string;
  showDate: string;
  showtime: string;
  seats: string[];
  seatTiers: { seat: string; tier: string; price: number }[];
  concessions: { item: ConcessionItem; quantity: number }[];
  subtotal: number;
  discount: number;
  convenienceFee: number;
  tax: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookedAt: string;
  paymentMethod: string;
  qrCodeToken: string;
  status: 'confirmed' | 'cancelled';
}

export interface City {
  id: string;
  name: string;
  state: string;
  isPopular: boolean;
}
