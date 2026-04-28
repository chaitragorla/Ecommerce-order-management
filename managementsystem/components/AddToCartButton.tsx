"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItems = useCartStore((state) => state.cartItems);

  const handleAddToCart = () => {
    // Check if it's already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      // If it exists, just add the selected quantity to the existing quantity
      updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      // If it doesn't exist, add it n times using a loop or add it once and immediately update quantity
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
      });
      if (quantity > 1) {
        updateQuantity(product.id, quantity);
      }
    }
    
    // Optional: Reset local quantity or show a success toast here
    setQuantity(1);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-sm">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="flex h-12 w-12 items-center justify-center text-slate-500 hover:text-teal-600 hover:bg-slate-50 rounded-l-xl transition-colors"
        >
          -
        </button>
        <span className="flex h-12 w-12 items-center justify-center font-bold text-slate-900 border-x border-slate-200 bg-slate-50">
          {quantity}
        </span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="flex h-12 w-12 items-center justify-center text-slate-500 hover:text-teal-600 hover:bg-slate-50 rounded-r-xl transition-colors"
        >
          +
        </button>
      </div>
      <Button 
        size="lg" 
        onClick={handleAddToCart}
        className="flex-1 h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-lg font-semibold gap-2 shadow-lg shadow-teal-600/20"
      >
        <ShoppingCart className="h-5 w-5" /> Add to Cart
      </Button>
    </div>
  );
}
