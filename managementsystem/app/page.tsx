"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SplashPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/splash_bg.png"
          alt="LuxeCart Luxury Background"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-4 text-center">
        
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-400 to-blue-600 text-white shadow-[0_0_80px_rgba(45,212,191,0.4)] backdrop-blur-md">
            <ShoppingBag className="h-12 w-12" />
          </div>
          <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
            Luxe<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Cart</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-2xl font-light tracking-wide">
            Redefining Premium E-Commerce
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-8 w-full max-w-md mx-auto sm:max-w-none"
        >
          <Link href="/home" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 text-lg font-bold shadow-[0_0_40px_rgba(45,212,191,0.3)] transition-all hover:scale-105">
              Enter Store <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-full border-white/20 bg-white/5 backdrop-blur-md text-white text-lg font-medium hover:bg-white/10 transition-all">
              <LogIn className="mr-2 h-5 w-5" /> Sign In
            </Button>
          </Link>
        </motion.div>

      </div>
      
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 hidden lg:block h-32 w-32 rounded-full bg-teal-500/10 blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, 30, 0] }} 
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-40 right-20 hidden lg:block h-48 w-48 rounded-full bg-blue-600/10 blur-3xl"
      />
    </div>
  );
}
