"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/lib/data";

const PRODUCTS_PER_PAGE = 8;

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [maxPrice, setMaxPrice] = useState(50000);
  const [minPrice, setMinPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryQuery ? [categoryQuery] : []
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1); // Reset page on filter
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1); // Reset page on filter
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const withinPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery) || 
        product.description.toLowerCase().includes(searchQuery);
      
      return withinPrice && matchesCategory && matchesSearch;
    });
  }, [minPrice, maxPrice, selectedCategories, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE, 
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      {/* Page Header */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">All Products</h1>
        <p className="text-slate-500">Find exactly what you're looking for with our extensive collection.</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setMinPrice(0); setMaxPrice(50000); setSelectedCategories([]); setCurrentPage(1); }}
                className="h-auto p-0 text-xs text-teal-700 hover:bg-transparent hover:text-teal-800"
              >
                Clear All
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Categories */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Category</h4>
                <div className="space-y-2">
                  {['Electronics', 'Fashion', 'Home', 'Wearables'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-slate-400 text-teal-600 focus:ring-teal-500" 
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3 border-t border-slate-200 pt-6">
                <h4 className="text-sm font-bold text-slate-900">Price Range (₹)</h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Min</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">₹</span>
                        <input 
                          type="number" 
                          min="0"
                          value={minPrice}
                          onChange={(e) => { 
                            const val = Number(e.target.value);
                            setMinPrice(val < 0 ? 0 : val); 
                            setCurrentPage(1); 
                          }}
                          className="w-full rounded-lg border-2 border-slate-300 bg-white py-2 pl-7 pr-2 text-sm text-slate-900 font-bold focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Max</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">₹</span>
                        <input 
                          type="number" 
                          min="0"
                          value={maxPrice}
                          onChange={(e) => { 
                            const val = Number(e.target.value);
                            setMaxPrice(val < 0 ? 0 : val); 
                            setCurrentPage(1); 
                          }}
                          className="w-full rounded-lg border-2 border-slate-300 bg-white py-2 pl-7 pr-2 text-sm text-slate-900 font-bold focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all" 
                        />
                      </div>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50000" 
                    step="500"
                    value={maxPrice}
                    onChange={handleRangeChange}
                    className="w-full accent-teal-600" 
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> results</p>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="sm:hidden w-full gap-2 font-semibold">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="font-medium text-slate-600">Sort by:</span>
                <button className="flex items-center gap-1 font-bold text-slate-900 hover:text-teal-700">
                  Featured <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-lg font-medium text-slate-900">No products found</p>
              <p className="text-slate-500">Try adjusting your filters or price range.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => { setMinPrice(0); setMaxPrice(50000); setSelectedCategories([]); setCurrentPage(1); }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 rounded-lg border-slate-200"
                >
                  &lt;
                </Button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button 
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "ghost"} 
                    size="icon" 
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 rounded-lg font-bold ${
                      currentPage === i + 1 
                        ? 'bg-teal-600 text-white hover:bg-teal-700' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 rounded-lg border-slate-200"
                >
                  &gt;
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64 text-slate-500 font-medium">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
