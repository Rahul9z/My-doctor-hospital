"use client";

import { motion } from "framer-motion";
import { Video, ShieldCheck, FileText, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TelemedicinePage() {
  const features = [
    { title: "HD Video Consultations", icon: Video, desc: "Crystal clear video calls with your doctor from anywhere." },
    { title: "Secure & Private", icon: ShieldCheck, desc: "End-to-end encrypted sessions complying with healthcare standards." },
    { title: "Digital Prescriptions", icon: FileText, desc: "Receive valid digital prescriptions instantly after consultation." },
    { title: "Flexible Scheduling", icon: Calendar, desc: "Book appointments that fit your schedule easily." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto mb-20">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              Telemedicine Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Consult Top Doctors <span className="text-indigo-600">Online</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Get expert medical advice, prescriptions, and follow-ups from the comfort of your home. Our secure telemedicine platform connects you with specialists in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-appointment" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                Start Consultation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg">
             <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop"
                  alt="Online Consultation"
                  fill
                  className="object-cover"
                />
              </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Platform Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center hover:-translate-y-1 transition-transform"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
