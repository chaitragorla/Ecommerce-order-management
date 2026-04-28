import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { AddToCartButton } from "@/components/AddToCartButton";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <Link href="/products" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-600 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 glass">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 cursor-pointer border-2 border-transparent hover:border-teal-500 transition-all">
                <img
                  src={product.imageUrl}
                  alt={`${product.name} view ${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-teal-600">{product.category}</span>
            <div className="flex items-center gap-1 text-sm text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current text-slate-300" />
              <span className="ml-1 text-slate-500">(128 reviews)</span>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mb-6 text-3xl font-black text-slate-900">
            ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>

          <p className="mb-8 text-slate-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8 space-y-4">
            <h3 className="font-semibold text-slate-900">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-auto space-y-6 pt-8 border-t border-slate-200">
            <AddToCartButton product={product} />
            
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 rounded-xl gap-2 h-12">
                <Heart className="h-5 w-5 text-slate-500" /> Add to Wishlist
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl gap-2 h-12">
                <Share2 className="h-5 w-5 text-slate-500" /> Share
              </Button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Free Delivery</p>
                <p className="text-xs text-slate-500">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">1 Year Warranty</p>
                <p className="text-xs text-slate-500">100% authentic</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
