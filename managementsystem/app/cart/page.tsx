"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="container mx-auto px-4 py-12 text-center text-slate-500 font-medium">Loading your cart...</div>;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 10000 ? 0 : (subtotal > 0 ? 500 : 0); // Free shipping over 10k
  const tax = subtotal * 0.18; // GST 18%
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Shopping Cart</h1>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm glass overflow-hidden">
            {cartItems.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 transition-colors hover:bg-slate-50/50">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    
                    <div className="flex flex-1 flex-col justify-between space-y-4 sm:space-y-0 sm:flex-row sm:items-center">
                      <div className="space-y-1 text-center sm:text-left">
                        <Link href={`/products/${item.id}`} className="font-semibold text-slate-900 hover:text-teal-600 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-lg font-bold text-slate-900">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center justify-center gap-4 sm:justify-end">
                        <div className="flex items-center rounded-lg border border-slate-200 bg-white shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-teal-600 hover:bg-slate-50 rounded-l-lg transition-colors"
                          >
                            -
                          </button>
                          <span className="flex h-9 w-10 items-center justify-center font-bold text-slate-900 text-sm border-x border-slate-200 bg-slate-50">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-teal-600 hover:bg-slate-50 rounded-r-lg transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <ShoppingBag className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">Your cart is empty</h3>
                <p className="mb-8 text-slate-500 max-w-sm">Looks like you haven't added anything to your cart yet. Discover our premium collection!</p>
                <Link href="/products">
                  <Button size="lg" className="rounded-xl px-8 shadow-lg shadow-teal-500/20">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm glass">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">
                  {subtotal === 0 ? "₹0.00" : (shipping === 0 ? <span className="text-teal-600 font-bold">Free</span> : formatPrice(shipping))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (18% GST)</span>
                <span className="font-medium text-slate-900">{formatPrice(tax)}</span>
              </div>
              
              <div className="my-6 border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-teal-600">{formatPrice(total)}</span>
                </div>
              </div>
              
              <Link href="/checkout" className="block mt-6" onClick={(e) => cartItems.length === 0 && e.preventDefault()}>
                <Button 
                  size="lg" 
                  className="w-full rounded-xl gap-2 h-14 text-base bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="h-4 w-4 text-teal-600" />
                Secure Checkout Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
