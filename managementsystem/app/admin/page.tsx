import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Users, ShoppingCart, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Overview of your store's performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">₹34,52,231.89</div>
            <p className="flex items-center text-xs text-teal-600 mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+2350</div>
            <p className="flex items-center text-xs text-teal-600 mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +180.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+12,234</div>
            <p className="flex items-center text-xs text-teal-600 mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +19% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+573</div>
            <p className="flex items-center text-xs text-red-500 mt-1">
              <ArrowDownRight className="mr-1 h-3 w-3" /> -1.2% since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="glass-card col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { name: "Ravi Kumar", email: "ravi.kumar@email.com", amount: "+₹85,999.00" },
                { name: "Priya Sharma", email: "priya.sharma@email.com", amount: "+₹12,499.00" },
                { name: "Amit Patel", email: "amit.patel@email.com", amount: "+₹4,500.00" },
                { name: "Neha Singh", email: "neha.singh@email.com", amount: "+₹32,000.00" },
                { name: "Vikram Reddy", email: "vikram.reddy@email.com", amount: "+₹18,500.00" }
              ].map((sale, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
                    {sale.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-900">{sale.name}</p>
                    <p className="text-sm text-slate-500">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-medium text-slate-900">{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Sony WH-1000XM5", sales: 124, rev: "₹35,94,760" },
                { name: "Apple Watch Series 9", sales: 98, rev: "₹41,06,200" },
                { name: "Mechanical Keyboard", sales: 210, rev: "₹18,89,790" },
                { name: "Minimalist Coffee Mug", sales: 450, rev: "₹5,84,550" }
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.sales} sales</p>
                  </div>
                  <div className="text-sm font-medium text-teal-600">{product.rev}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
