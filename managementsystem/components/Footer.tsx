import React from 'react';
import Link from 'next/link';
import { SubscribeForm } from './SubscribeForm';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Luxe<span className="text-teal-600">Cart</span>
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Premium e-commerce experience for modern shoppers. Quality products, seamless delivery.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/products" className="hover:text-teal-600">All Products</Link></li>
              <li><Link href="/products" className="hover:text-teal-600">Electronics</Link></li>
              <li><Link href="/products" className="hover:text-teal-600">Clothing</Link></li>
              <li><Link href="/products" className="hover:text-teal-600">Home & Kitchen</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/" className="hover:text-teal-600">About Us</Link></li>
              <li><Link href="/" className="hover:text-teal-600">Contact</Link></li>
              <li><Link href="/" className="hover:text-teal-600">Careers</Link></li>
              <li><Link href="/" className="hover:text-teal-600">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100">
              Newsletter
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <SubscribeForm layout="vertical" />
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} LuxeCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
