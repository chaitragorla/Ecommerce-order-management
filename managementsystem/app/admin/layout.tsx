import React from "react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Admin<span className="text-teal-600">Panel</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-teal-50 px-3 py-2 text-sm font-medium text-teal-600">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Package className="h-4 w-4" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <ShoppingCart className="h-4 w-4" /> Orders
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Users className="h-4 w-4" /> Customers
          </Link>
        </nav>
        <div className="border-t border-slate-200 p-4">
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Settings className="h-4 w-4" /> Settings
          </Link>
          <Link href="/" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" /> Exit to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
