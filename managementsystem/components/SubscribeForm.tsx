"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

export function SubscribeForm({ layout = "horizontal" }: { layout?: "horizontal" | "vertical" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  if (layout === "horizontal") {
    return (
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col justify-center gap-4 sm:flex-row w-full max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500"
        />
        <Button 
          type="submit" 
          size="lg" 
          className="h-14 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 transition-all"
        >
          {status === "success" ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
    );
  }

  // Footer layout (smaller)
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email" 
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none dark:bg-slate-900 dark:border-slate-700"
      />
      <button 
        type="submit" 
        className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors whitespace-nowrap"
      >
        {status === "success" ? "Done!" : "Subscribe"}
      </button>
    </form>
  );
}
