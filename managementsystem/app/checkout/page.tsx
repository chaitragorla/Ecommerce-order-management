"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Truck, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CheckoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setIsMounted(true);
    // If cart is empty, redirect back to products
    if (cartItems.length === 0 && !isProcessing) {
      router.push("/products");
    }
  }, [cartItems.length, router, isProcessing]);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1500);
  };

  if (!isMounted || (cartItems.length === 0 && !isProcessing)) {
    return <div className="container mx-auto px-4 py-12 text-center text-slate-500 font-medium">Loading checkout...</div>;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 10000 ? 0 : (subtotal > 0 ? 500 : 0);
  const tax = subtotal * 0.18; // GST 18%
  const total = subtotal + shipping + tax;
  
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12 bg-slate-50/50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Checkout</h1>
        <div className="flex items-center gap-2 text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full border border-teal-100 shadow-sm">
          <Lock className="h-4 w-4" /> Secure SSL Connection
        </div>
      </div>

      <form onSubmit={handleCheckout} className="grid gap-12 lg:grid-cols-3">
        {/* Checkout Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Address */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm text-white">1</span>
              Shipping Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
                <Input placeholder="Ravi" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Last Name <span className="text-red-500">*</span></label>
                <Input placeholder="Kumar" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                <Input type="email" placeholder="ravi.kumar@example.com" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">Street Address <span className="text-red-500">*</span></label>
                <Input placeholder="123 Main St" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">City <span className="text-red-500">*</span></label>
                <Input placeholder="Mumbai" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">State <span className="text-red-500">*</span></label>
                  <Input placeholder="MH" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">PIN Code <span className="text-red-500">*</span></label>
                  <Input placeholder="400001" pattern="[0-9]{6}" title="6 digit PIN code" required />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm text-white">2</span>
              Payment Method
            </h2>
            
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <label 
                className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-colors ${
                  paymentMethod === "card" ? "border-teal-500 bg-teal-50/50" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 cursor-pointer" 
                  />
                  <span className="font-medium text-slate-900">Credit / Debit Card</span>
                </div>
                <CreditCard className={`h-6 w-6 ${paymentMethod === "card" ? "text-teal-600" : "text-slate-400"}`} />
              </label>
              
              <label 
                className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-colors ${
                  paymentMethod === "upi" ? "border-teal-500 bg-teal-50/50" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 cursor-pointer" 
                  />
                  <span className="font-medium text-slate-900">UPI / Net Banking</span>
                </div>
                <div className={`font-bold ${paymentMethod === "upi" ? "text-teal-600" : "text-slate-400"}`}>UPI</div>
              </label>
            </div>

            {paymentMethod === "card" ? (
              <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Card Number <span className="text-red-500">*</span></label>
                  <Input placeholder="0000 0000 0000 0000" pattern="[0-9\s]{13,19}" title="Valid Card Number" className="bg-white" required={paymentMethod === "card"} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Expiry Date <span className="text-red-500">*</span></label>
                    <Input placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/[0-9]{2}" title="MM/YY format" className="bg-white" required={paymentMethod === "card"} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">CVV <span className="text-red-500">*</span></label>
                    <Input placeholder="123" pattern="[0-9]{3,4}" type="password" maxLength={4} className="bg-white" required={paymentMethod === "card"} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Name on Card <span className="text-red-500">*</span></label>
                  <Input placeholder="Ravi Kumar" className="bg-white" required={paymentMethod === "card"} />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 text-center animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-sm text-slate-600 mb-4">You will be redirected to your UPI provider to complete the payment securely.</p>
                <div className="space-y-2 text-left max-w-sm mx-auto">
                  <label className="text-sm font-medium text-slate-700">Enter UPI ID (Optional)</label>
                  <Input placeholder="name@bank" className="bg-white text-center" />
                </div>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            size="lg" 
            disabled={isProcessing}
            className={`w-full rounded-xl h-14 text-lg shadow-xl transition-all ${
              isProcessing 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-teal-600 hover:bg-teal-700 shadow-teal-600/20"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">Processing Payment...</span>
            ) : (
              <span className="flex items-center gap-2"><Lock className="h-5 w-5" /> Pay {formatPrice(total)}</span>
            )}
          </Button>

        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Order Details</h2>
            
            <div className="mb-6 space-y-4 divide-y divide-slate-100 max-h-[400px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between py-4 first:pt-0">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">
                  {shipping === 0 ? <span className="text-teal-600 font-bold">Free</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (GST 18%)</span>
                <span className="font-medium text-slate-900">{formatPrice(tax)}</span>
              </div>
              
              <div className="my-4 border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-teal-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
