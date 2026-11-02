import { Movie, Cinema, ConcessionItem, City } from '../types';

export const CITIES: City[] = [
  { id: 'nyc', name: 'New York', state: 'NY', isPopular: true },
  { id: 'la', name: 'Los Angeles', state: 'CA', isPopular: true },
  { id: 'sf', name: 'San Francisco', state: 'CA', isPopular: true },
  { id: 'chi', name: 'Chicago', state: 'IL', isPopular: true },
  { id: 'atx', name: 'Austin', state: 'TX', isPopular: false },
  { id: 'ldn', name: 'London', state: 'UK', isPopular: true }
];

export const CINEMAS: Cinema[] = [
  {
    id: 'cin-1',
    name: 'iMovies Grand IMAX - Downtown',
    city: 'New York',
    area: 'Times Square / Broadway',
    address: '742 Broadway & 42nd St, New York, NY 10036',
    screens: ['Screen 1 (IMAX Laser 70mm)', 'Screen 2 (Dolby Atmos)', 'Screen 3 (4DX Motion)'],
    facilities: ['IMAX Laser Dual 4K', 'Dolby Atmos Sound', 'VIP Recliner Seating', 'Dine-In At Seat Service', 'Valet Parking'],
    distance: '0.8 miles'
  },
  {
    id: 'cin-2',
    name: 'iMovies Dolby Cinema - Westfield Luxury Center',
    city: 'New York',
    area: 'Lower Manhattan',
    address: '185 Greenwich St, New York, NY 10007',
    screens: ['Screen 1 (Dolby Cinema)', 'Screen 2 (RealD 3D)', 'Screen 3 (Standard 2D)'],
    facilities: ['Dolby Vision & Atmos', 'Heated Recliner Seats', 'Artisan Cocktail Bar', 'Reserved Parking'],
    distance: '2.4 miles'
  },
  {
    id: 'cin-3',
    name: 'iMovies Royal VIP Lounge - Midtown',
    city: 'New York',
    area: '5th Avenue & Central Park',
    address: '590 5th Ave, New York, NY 10036',
    screens: ['VIP Hall A', 'VIP Hall B (Laser Ultimate)'],
    facilities: ['Full Recliner Beds', 'Complimentary Gourmet Popcorn', 'Private Butler Service', 'Free Valet'],
    distance: '3.1 miles'
  },
  {
    id: 'cin-4',
    name: 'iMovies CineDome 4DX - Metro Center',
    city: 'New York',
    area: 'Brooklyn Promenade',
    address: '300 Atlantic Ave, Brooklyn, NY 11201',
    screens: ['4DX Extreme Hall', 'Screen 2 (Dolby Atmos)', 'Screen 3 (Standard)'],
    facilities: ['4DX Environmental FX', 'Laser Projection', 'Arcade & VR Zone', 'Wheelchair Friendly'],
    distance: '4.5 miles'
  }
];

export const MOVIES: Movie[] = [
  {
    id: 'mov-1',
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    duration: '2h 46m',
    rating: 8.6,
    votes: '480K',
    certificate: 'PG-13',
    releaseDate: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    director: 'Denis Villeneuve',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides' },
      { name: 'Zendaya', role: 'Chani' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica' },
      { name: 'Javier Bardem', role: 'Stilgar' },
      { name: 'Austin Butler', role: 'Feyd-Rautha' }
    ],
    status: 'now_showing',
    formats: ['IMAX 3D', 'Dolby Cinema', '4DX', 'Standard 2D'],
    basePrice: 15.00
  },
  {
    id: 'mov-2',
    title: 'Oppenheimer',
    tagline: 'The world forever changes.',
    genres: ['Biography', 'Drama', 'History'],
    duration: '3h 00m',
    rating: 8.9,
    votes: '720K',
    certificate: 'R',
    releaseDate: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    synopsis: 'The pulse-pounding paradox of the enigmatic man who must risk destroying the world in order to save it. During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project.',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
      { name: 'Emily Blunt', role: 'Kitty Oppenheimer' },
      { name: 'Matt Damon', role: 'Leslie Groves' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss' }
    ],
    status: 'now_showing',
    formats: ['IMAX 3D', 'Dolby Cinema', 'Standard 2D'],
    basePrice: 16.50
  },
  {
    id: 'mov-3',
    title: 'Spider-Man: Across the Spider-Verse',
    tagline: 'It’s how you wear the mask that matters.',
    genres: ['Animation', 'Action', 'Sci-Fi'],
    duration: '2h 20m',
    rating: 8.7,
    votes: '390K',
    certificate: 'PG',
    releaseDate: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg',
    synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.',
    director: 'Joaquim Dos Santos, Kemp Powers',
    cast: [
      { name: 'Shameik Moore', role: 'Miles Morales' },
      { name: 'Hailee Steinfeld', role: 'Gwen Stacy' },
      { name: 'Oscar Isaac', role: 'Miguel O’Hara' },
      { name: 'Daniel Kaluuya', role: 'Hobart Brown' }
    ],
    status: 'now_showing',
    formats: ['IMAX 3D', 'Dolby Cinema', '4DX', 'RealD 3D'],
    basePrice: 14.00
  },
  {
    id: 'mov-4',
    title: 'Interstellar: 10th Anniversary IMAX',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    duration: '2h 49m',
    rating: 8.7,
    votes: '1.9M',
    certificate: 'PG-13',
    releaseDate: 'Exclusive IMAX Re-Release',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers through a newly discovered wormhole in search of a new home for mankind.',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper' },
      { name: 'Anne Hathaway', role: 'Brand' },
      { name: 'Jessica Chastain', role: 'Murph' },
      { name: 'Michael Caine', role: 'Professor Brand' }
    ],
    status: 'now_showing',
    formats: ['IMAX 3D', 'Dolby Cinema'],
    basePrice: 17.00
  },
  {
    id: 'mov-5',
    title: 'Deadpool & Wolverine',
    tagline: 'Everyone deserves a happy ending.',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    duration: '2h 08m',
    rating: 8.0,
    votes: '310K',
    certificate: 'R',
    releaseDate: 'Now Showing',
    poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/73_1biulkYk',
    synopsis: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit up with an even more reluctant Wolverine.',
    director: 'Shawn Levy',
    cast: [
      { name: 'Ryan Reynolds', role: 'Wade Wilson / Deadpool' },
      { name: 'Hugh Jackman', role: 'Logan / Wolverine' },
      { name: 'Emma Corrin', role: 'Cassandra Nova' }
    ],
    status: 'now_showing',
    formats: ['IMAX 3D', '4DX', 'Dolby Cinema', 'Standard 2D'],
    basePrice: 15.50
  },
  {
    id: 'mov-6',
    title: 'Inception',
    tagline: 'Your mind is the scene of the crime.',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    duration: '2h 28m',
    rating: 8.8,
    votes: '2.4M',
    certificate: 'PG-13',
    releaseDate: 'Special Showing',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Cobb' },
      { name: 'Joseph Gordon-Levitt', role: 'Arthur' },
      { name: 'Elliot Page', role: 'Ariadne' },
      { name: 'Tom Hardy', role: 'Eames' }
    ],
    status: 'now_showing',
    formats: ['Dolby Cinema', 'Standard 2D'],
    basePrice: 13.50
  },
  {
    id: 'mov-7',
    title: 'Gladiator II',
    tagline: 'What we do in life echoes in eternity.',
    genres: ['Action', 'Drama', 'Adventure'],
    duration: '2h 30m',
    rating: 8.4,
    votes: 'Expected',
    certificate: 'R',
    releaseDate: 'Coming This Friday',
    poster: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/4rgYUipGJNo',
    synopsis: 'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.',
    director: 'Ridley Scott',
    cast: [
      { name: 'Paul Mescal', role: 'Lucius Verus' },
      { name: 'Pedro Pascal', role: 'Marcus Acacius' },
      { name: 'Denzel Washington', role: 'Macrinus' }
    ],
    status: 'coming_soon',
    formats: ['IMAX 3D', 'Dolby Cinema', '4DX'],
    basePrice: 16.00
  },
  {
    id: 'mov-8',
    title: 'Avatar: Fire and Ash',
    tagline: 'Return to Pandora in breathtaking IMAX 3D.',
    genres: ['Sci-Fi', 'Fantasy', 'Adventure'],
    duration: '3h 15m',
    rating: 8.8,
    votes: 'Expected',
    certificate: 'PG-13',
    releaseDate: 'Coming Soon',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://www.youtube.com/embed/d9MyW72ELq0',
    synopsis: 'Jake Sully and Neytiri journey across undiscovered regions of Pandora and encounter a volatile, aggressive Na’vi fire tribe known as the Ash People.',
    director: 'James Cameron',
    cast: [
      { name: 'Sam Worthington', role: 'Jake Sully' },
      { name: 'Zoe Saldana', role: 'Neytiri' },
      { name: 'Sigourney Weaver', role: 'Kiri' }
    ],
    status: 'coming_soon',
    formats: ['IMAX 3D', 'Dolby Cinema', 'RealD 3D'],
    basePrice: 18.00
  }
];

export const CONCESSIONS: ConcessionItem[] = [
  {
    id: 'snack-1',
    name: 'Jumbo Butter Popcorn',
    category: 'Popcorn',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80',
    description: 'Hot, freshly popped corn tossed in rich gourmet creamy butter.',
    calories: '650 cal'
  },
  {
    id: 'snack-2',
    name: 'Gourmet Caramel Crunch Popcorn',
    category: 'Popcorn',
    price: 10.50,
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=400&q=80',
    description: 'Crispy kettle-popped corn coated with artisan brown sugar toffee caramel glaze.',
    calories: '780 cal'
  },
  {
    id: 'snack-3',
    name: 'Nachos Grande with Warm Queso',
    category: 'Snacks',
    price: 8.75,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80',
    description: 'Stone-ground crispy tortilla chips served with spicy jalapeños and melted cheese sauce.',
    calories: '540 cal'
  },
  {
    id: 'snack-4',
    name: 'IMAX Couple Blockbuster Combo',
    category: 'Combos',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80',
    description: '1 Tub of Jumbo Popcorn + 2 Large Fountain Sodas + 1 Choice of M&Ms or Twizzlers.',
    calories: '1100 cal'
  },
  {
    id: 'snack-5',
    name: 'Artisan Loaded Beef Hot Dog',
    category: 'Snacks',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80',
    description: 'All-beef grilled frank topped with melted cheddar, relish, and diced red onions.',
    calories: '510 cal'
  },
  {
    id: 'snack-6',
    name: 'Chilled ICEE Slushie (Blue Raspberry)',
    category: 'Beverages',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=400&q=80',
    description: 'Classic icy frozen slushie beverage with vibrant blue raspberry flavor.',
    calories: '240 cal'
  },
  {
    id: 'snack-7',
    name: 'Molten Belgian Chocolate Lava Cake',
    category: 'Snacks',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
    description: 'Warm, gooey molten dark chocolate center served with whipped cream.',
    calories: '490 cal'
  }
];

export const INITIAL_BOOKINGS: any[] = [
  {
    bookingId: 'IMV-771920',
    movieId: 'mov-1',
    movieTitle: 'Dune: Part Two',
    moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    movieCertificate: 'PG-13',
    cinemaId: 'cin-1',
    cinemaName: 'iMovies Grand IMAX - Downtown',
    screenName: 'Screen 1 (IMAX Laser)',
    format: 'IMAX 3D',
    showDate: 'Today, Nov 2',
    showtime: '06:00 PM',
    seats: ['D5', 'D6'],
    seatTiers: [
      { seat: 'D5', tier: 'premium', price: 18.00 },
      { seat: 'D6', tier: 'premium', price: 18.00 }
    ],
    concessions: [
      {
        item: {
          id: 'snack-1',
          name: 'Jumbo Butter Popcorn',
          category: 'Popcorn',
          price: 9.50,
          image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80',
          description: 'Hot, freshly popped corn tossed in rich gourmet creamy butter.'
        },
        quantity: 1
      }
    ],
    subtotal: 45.50,
    discount: 5.00,
    convenienceFee: 3.50,
    tax: 3.20,
    totalAmount: 47.20,
    customerName: 'Puneeth Golla',
    customerEmail: 'puneethgolla41460@gmail.com',
    customerPhone: '+1 (555) 349-8201',
    bookedAt: '2026-11-01 19:42',
    paymentMethod: 'Apple Pay',
    qrCodeToken: 'IMV-DUNE2-D5D6-TOKEN-VERIFIED-99128',
    status: 'confirmed'
  }
];
