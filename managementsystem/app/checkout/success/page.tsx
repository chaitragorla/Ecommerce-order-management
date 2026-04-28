"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Generate a random order ID on the client side to avoid hydration mismatches
    const randomId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24 min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 mb-8">
          <CheckCircle2 className="h-12 w-12 text-teal-600" />
        </div>

        {/* Headlines */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Order Confirmed!
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            Thank you for shopping with LuxeCart. Your order has been successfully placed and is being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-teal-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <p className="text-sm font-medium text-slate-500">Order Number</p>
                <p className="text-lg font-bold text-slate-900">
                  {orderId || "Generating..."}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-500">Date</p>
                <p className="text-lg font-bold text-slate-900">
                  {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-900 font-bold">
                  <Package className="h-5 w-5 text-teal-600" /> What happens next?
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You will receive an email confirmation shortly. We will notify you again once your items have shipped.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-900 font-bold">
                  <Truck className="h-5 w-5 text-teal-600" /> Delivery Estimate
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Expected delivery within <span className="font-semibold text-slate-900">3-5 business days</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link href="/products" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 bg-teal-600 hover:bg-teal-700 text-base shadow-lg shadow-teal-600/20 gap-2">
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/home" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-slate-200">
              Back to Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
