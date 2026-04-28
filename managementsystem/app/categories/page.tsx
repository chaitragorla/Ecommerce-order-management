import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Laptop, Shirt, Home as HomeIcon, Watch } from "lucide-react";

const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Cutting-edge gadgets and audio gear.",
    icon: Laptop,
    imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800",
    color: "from-blue-500/20 to-teal-500/20"
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Premium apparel and accessories.",
    icon: Shirt,
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "home",
    name: "Home",
    description: "Smart and minimalist living essentials.",
    icon: HomeIcon,
    imageUrl: "https://images.unsplash.com/photo-1556020685-e631933fddce?q=80&w=800",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Next-gen fitness and health tracking.",
    icon: Watch,
    imageUrl: "https://images.unsplash.com/photo-1434493789847-2902a52dda8c?q=80&w=800",
    color: "from-emerald-500/20 to-green-500/20"
  }
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-20">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Category</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Discover our curated collections. Whether you're looking to upgrade your tech, your wardrobe, or your home, we have exactly what you need.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {CATEGORIES.map((category) => (
          <Link href={`/products?category=${encodeURIComponent(category.name)}`} key={category.id} className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 z-0">
              {/* Using img tag to prevent hostname issues with external images */}
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50"
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${category.color} backdrop-blur-[2px]`} />
            </div>
            
            <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end p-8 sm:p-10">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                <category.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {category.name}
              </h2>
              <p className="mb-6 text-lg font-medium text-slate-800">
                {category.description}
              </p>
              
              <div className="inline-flex items-center font-bold text-teal-700">
                Explore Collection <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
