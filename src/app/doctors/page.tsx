"use client";

import { motion } from "framer-motion";
import { Search, Star, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DoctorsPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiology",
      experience: "15 Years",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      experience: "12 Years",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      experience: "10 Years",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1594824436998-dd40e4f69188?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      experience: "20 Years",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=500&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our <span className="text-primary">Specialists</span></h1>
            <p className="text-lg text-slate-600 max-w-2xl">Find and book appointments with our world-class medical professionals.</p>
          </div>
          
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name, specialty, or condition..." 
              className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-900 flex items-center gap-1 shadow-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {doctor.rating}
                </div>
              </div>
              <div className="p-6">
                <p className="text-primary font-semibold text-sm mb-1">{doctor.specialty}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{doctor.name}</h3>
                <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{doctor.experience} Exp.</span>
                  </div>
                </div>
                <Link href={`/book-appointment?doctor=${doctor.id}`} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-primary hover:text-white text-slate-900 font-semibold rounded-xl transition-colors border border-slate-200 hover:border-primary">
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
