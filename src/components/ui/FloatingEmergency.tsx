"use client";

import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export function FloatingEmergency() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Action */}
      <a
        href="https://wa.me/919347756793"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute left-full ml-4 px-3 py-1 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Emergency Call Action */}
      <Link
        href="/emergency"
        className="group relative flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Phone className="w-7 h-7 animate-pulse" />
        <span className="absolute left-full ml-4 px-3 py-1 bg-white text-red-600 text-sm font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Emergency Services
        </span>
      </Link>
    </div>
  );
}
