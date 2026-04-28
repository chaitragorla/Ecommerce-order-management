"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { PRODUCTS } from '@/lib/data';
import { useCartStore } from '@/lib/store';

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  
  const cartItems = useCartStore((state) => state.cartItems);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const searchResults = PRODUCTS.filter(p => 
    searchQuery.trim() && (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ).slice(0, 5);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/home" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/30">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="hidden text-xl font-bold tracking-tight text-slate-800 md:block">
              Luxe<span className="text-teal-600">Cart</span>
            </span>
          </Link>
          <div className="hidden gap-6 md:flex">
            <Link href="/home" className="text-sm font-medium text-slate-600 hover:text-teal-600">Home</Link>
            <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-teal-600">Shop</Link>
            <Link href="/categories" className="text-sm font-medium text-slate-600 hover:text-teal-600">Categories</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form ref={searchRef} onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search products..." 
              className="h-10 w-64 lg:w-80 rounded-full border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
            />
            
            {/* Live Search Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 max-h-96 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {searchResults.map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate text-sm font-bold text-slate-900">{product.name}</span>
                          <span className="text-xs font-medium text-teal-600">₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                    <button 
                      type="submit"
                      className="mt-2 rounded-lg bg-slate-50 p-2 text-center text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-teal-600 transition-colors"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm font-medium text-slate-500">
                    No products found.
                  </div>
                )}
              </div>
            )}
          </form>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingBag className="h-5 w-5" />
              {isMounted && cartItemsCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
