import React, { useState } from 'react';
import { 
  Popcorn, 
  Sparkles, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Flame,
  Coffee
} from 'lucide-react';
import { ConcessionItem } from '../types';
import { CONCESSIONS } from '../data/moviesData';
import confetti from 'canvas-confetti';

export const SnackShopView: React.FC = () => {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = ['All', 'Combos', 'Popcorn', 'Snacks', 'Beverages'];

  const filteredItems = selectedCategory === 'All'
    ? CONCESSIONS
    : CONCESSIONS.filter(c => c.category === selectedCategory);

  const handleUpdate = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalCount = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const totalAmount = Object.entries(cart).reduce((sum, [id, q]) => {
    const item = CONCESSIONS.find(c => c.id === id);
    return sum + (item ? item.price * q : 0);
  }, 0);

  const handleCheckoutSnacks = () => {
    if (totalCount === 0) return;
    setOrderPlaced(true);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {}
    setTimeout(() => {
      setCart({});
      setOrderPlaced(false);
    }, 3500);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Popcorn className="w-4 h-4" />
            <span>iMovies Gourmet Concessions</span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1">
            Cinema Food, Snacks &amp; Drinks
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Pre-book your favorite popcorn tubs, nachos with warm queso, and handcrafted combos. Skip the cinema queues!
          </p>
        </div>

        {/* Cart summary badge */}
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shrink-0 self-start sm:self-auto">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Order Total</span>
            <span className="text-sm font-black text-amber-400 font-mono">
              ${totalAmount.toFixed(2)} ({totalCount} items)
            </span>
          </div>
          {totalCount > 0 && (
            <button
              onClick={handleCheckoutSnacks}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Order Now
            </button>
          )}
        </div>
      </div>

      {orderPlaced && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-sm font-bold flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>Snack order confirmed! Pickup at iMovies Express Counter with your barcode.</span>
          </div>
          <span className="font-mono text-xs text-emerald-400">Order #SNK-99214</span>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const qty = cart[item.id] || 0;

          return (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-amber-400 font-mono text-[10px] font-bold">
                  {item.calories}
                </span>
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md text-slate-300 text-[10px] font-semibold">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-base font-black text-amber-400 font-mono">
                    ${item.price.toFixed(2)}
                  </span>

                  <div className="flex items-center space-x-2">
                    {qty > 0 && (
                      <>
                        <button
                          onClick={() => handleUpdate(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white w-4 text-center">
                          {qty}
                        </span>
                      </>
                    )}
                    <button
                      onClick={() => handleUpdate(item.id, 1)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1 cursor-pointer shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{qty === 0 ? 'Add to Cart' : ''}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
