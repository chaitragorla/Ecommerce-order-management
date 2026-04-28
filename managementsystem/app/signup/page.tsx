import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/20 bg-white/60 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/30">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Create an account</h2>
          <p className="mt-2 text-sm text-slate-500">Join us for a premium shopping experience</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <Input placeholder="John Doe" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <Input type="email" placeholder="name@example.com" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Input type="password" placeholder="Create a password" required />
              <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters long</p>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800">
            Create Account
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white/60 px-2 text-slate-500 backdrop-blur-sm">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" className="w-full bg-white h-11 border-slate-200 text-slate-600 hover:bg-slate-50">
              Google
            </Button>
            <Button variant="outline" type="button" className="w-full bg-white h-11 border-slate-200 text-slate-600 hover:bg-slate-50">
              GitHub
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/" className="font-semibold text-teal-600 hover:text-teal-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
