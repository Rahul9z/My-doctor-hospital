"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Heart, Shield, Users, Calendar, Video, PhoneCall, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const stats = [
    { label: "Patients Treated", value: "50k+" },
    { label: "Expert Doctors", value: "150+" },
    { label: "Departments", value: "25+" },
    { label: "Successful Procedures", value: "10k+" },
    { label: "Emergency Response", value: "<10m" },
  ];

  const quickActions = [
    { title: "Book Appointment", icon: Calendar, href: "/book-appointment", color: "bg-blue-500" },
    { title: "Emergency Assistance", icon: PhoneCall, href: "/emergency", color: "bg-red-500" },
    { title: "Find a Doctor", icon: Search, href: "/doctors", color: "bg-teal-500" },
    { title: "Online Consultation", icon: Video, href: "/telemedicine", color: "bg-indigo-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-semibold"
              >
                <Activity className="w-4 h-4" />
                <span>Next-Generation Smart Hospital</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900"
              >
                Advanced Healthcare. <br />
                <span className="text-primary">Human Compassion.</span> <br />
                <span className="text-secondary">AI-Powered Care.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0"
              >
                Expert doctors, cutting-edge technology, and intelligent healthcare assistance available 24/7. Your health, elevated beyond limits.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto lg:mx-0"
              >
                {quickActions.map((action, index) => (
                  <Link href={action.href} key={index}>
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card hover:-translate-y-1 transition-transform group cursor-pointer text-center h-full">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 ${action.color} shadow-lg group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{action.title}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none"
            >
              <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 mix-blend-multiply" />
                <Image
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop"
                  alt="Modern Hospital Facility"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute top-10 -left-10 glass px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Patient Satisfaction</p>
                  <p className="text-xl font-bold text-slate-900">4.9/5.0</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-100 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">{stat.value}</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Choose My Doctor Hospital?</h2>
            <p className="text-lg text-slate-600">We combine world-class medical expertise with futuristic technology to provide an unparalleled healthcare experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">World-Class Specialists</h3>
              <p className="text-slate-600 leading-relaxed">Our team consists of internationally trained medical professionals dedicated to providing the highest standard of care.</p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-32 h-32 text-secondary" />
              </div>
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors relative z-10">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">AI-Powered Experience</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">From our 24/7 AI Receptionist to advanced diagnostic tools, we leverage technology to make healthcare efficient and accessible.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Patient-Centric Care</h3>
              <p className="text-slate-600 leading-relaxed">We believe in compassionate care, ensuring every patient feels heard, respected, and comfortable throughout their journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Experience Better Healthcare?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Book an appointment today or try our online consultation services from the comfort of your home.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book-appointment" className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-slate-50 transition-colors shadow-xl flex items-center gap-2">
              Book Appointment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
