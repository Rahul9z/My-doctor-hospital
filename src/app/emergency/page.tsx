"use client";

import { motion } from "framer-motion";
import { PhoneCall, AlertTriangle, MapPin, Ambulance } from "lucide-react";
import Link from "next/link";

export default function EmergencyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-red-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6 animate-pulse">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Emergency <span className="text-red-600">Services</span></h1>
          <p className="text-xl text-slate-600">Immediate medical attention available 24/7. Do not hesitate to call if you are experiencing a medical emergency.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-red-600 text-center flex flex-col items-center justify-center"
          >
            <PhoneCall className="w-16 h-16 text-red-600 mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Emergency Hotline</h2>
            <p className="text-slate-500 mb-6">Call us immediately for critical care</p>
            <a href="tel:911" className="text-4xl font-bold text-red-600 hover:text-red-700 transition-colors">1-800-EMERGENCY</a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-primary text-center flex flex-col items-center justify-center"
          >
            <Ambulance className="w-16 h-16 text-primary mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Ambulance</h2>
            <p className="text-slate-500 mb-6">Our advanced life support ambulances are on standby</p>
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg w-full">
              Dispatch Ambulance Now
            </button>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-slate-100 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">While you wait for help...</h3>
          <p className="text-lg text-slate-600 mb-8">
            Access our Care Before You Reach™ guide for immediate first-aid instructions and precautionary steps.
          </p>
          <Link href="/emergency-guidance" className="inline-flex items-center gap-2 px-8 py-4 bg-red-100 text-red-700 font-bold rounded-full hover:bg-red-200 transition-colors">
            View First-Aid Guidance <AlertTriangle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
