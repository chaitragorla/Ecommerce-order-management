"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  category?: string | null;
}

export function ProductCard({ id, name, price, imageUrl, category }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, imageUrl: imageUrl || '', category: category || '' });
    // Optional: show a toast notification here
  };

  return (
    <Card className="group overflow-hidden border-transparent bg-white/50 hover:bg-white/80 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300">
      <Link href={`/products/${id}`}>
        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm shadow-sm">
              {category}
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-5">
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 hover:text-teal-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="mt-2 text-2xl font-black text-teal-600">
          ₹{Number(price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button className="w-full gap-2 rounded-xl" size="lg" onClick={handleAddToCart}>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
