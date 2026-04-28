import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRight, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { PRODUCTS } from "@/lib/data";

import { SubscribeForm } from "@/components/SubscribeForm";

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-16 md:pt-24 lg:pt-32">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex max-w-2xl flex-col justify-center space-y-8 pb-16 lg:pb-32">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-300">
                  <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
                  New Collection Available
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Discover the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                    Extraordinary.
                  </span>
                </h1>
                <p className="max-w-[600px] text-lg text-slate-300 md:text-xl/relaxed">
                  Elevate your lifestyle with our curated selection of premium products. Experience quality, design, and innovation delivered directly to your door.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full bg-teal-500 hover:bg-teal-400 text-slate-900">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full border-slate-600 text-slate-200 hover:bg-slate-800">
                    Explore Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over ₹10,000" },
            { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
            { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
            { icon: Star, title: "Premium Quality", desc: "Top grade products" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center justify-center space-y-3 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm glass">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Featured Products</h2>
            <p className="text-slate-500">Handpicked selections just for you</p>
          </div>
          <Link href="/products" className="hidden text-sm font-semibold text-teal-600 hover:text-teal-700 md:block flex items-center">
            View All <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-24">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get 20% off your first order
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
              Sign up for our newsletter and receive a discount code for your first purchase. Plus, get early access to new product launches.
            </p>
            <SubscribeForm layout="horizontal" />
          </div>
        </div>
      </section>
    </div>
  );
}
