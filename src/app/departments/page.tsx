"use client";

import { motion } from "framer-motion";
import { Activity, Brain, HeartPulse, Baby, Eye, Ear, Bone, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DepartmentsPage() {
  const departments = [
    { name: "Cardiology", icon: HeartPulse, desc: "Advanced heart care and surgeries.", color: "bg-red-100 text-red-600" },
    { name: "Neurology", icon: Brain, desc: "Comprehensive brain and spine treatments.", color: "bg-purple-100 text-purple-600" },
    { name: "Orthopedics", icon: Bone, desc: "Expert care for bones, joints, and muscles.", color: "bg-orange-100 text-orange-600" },
    { name: "Pediatrics", icon: Baby, desc: "Specialized healthcare for infants and children.", color: "bg-pink-100 text-pink-600" },
    { name: "Ophthalmology", icon: Eye, desc: "Advanced eye care and vision correction.", color: "bg-blue-100 text-blue-600" },
    { name: "ENT", icon: Ear, desc: "Ear, nose, and throat specialized treatments.", color: "bg-teal-100 text-teal-600" },
    { name: "General Medicine", icon: Stethoscope, desc: "Comprehensive primary healthcare services.", color: "bg-green-100 text-green-600" },
    { name: "Intensive Care Unit", icon: Activity, desc: "24/7 critical care monitoring.", color: "bg-slate-100 text-slate-800" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Centers of <span className="text-primary">Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Discover our world-class medical departments equipped with the latest technology and staffed by renowned specialists.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/departments/${dept.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="glass-card p-6 h-full hover:-translate-y-2 transition-transform group cursor-pointer border border-slate-200 hover:border-primary/30">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${dept.color}`}>
                    <dept.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{dept.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{dept.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Can't decide which department?</h2>
            <p className="text-slate-600 mb-6">Our AI-Powered Symptom Checker can guide you to the right specialist based on your symptoms.</p>
            <Link href="/symptom-checker" className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-colors shadow-lg">
              <Activity className="w-5 h-5" />
              Use Symptom Checker
            </Link>
          </div>
          <div className="flex-1 relative w-full aspect-video md:aspect-auto md:h-64 rounded-2xl overflow-hidden">
             <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
                alt="Medical Consultation"
                fill
                className="object-cover"
              />
          </div>
        </div>
      </div>
    </div>
  );
}
