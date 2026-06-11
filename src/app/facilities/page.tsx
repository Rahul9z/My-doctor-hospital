"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "Advanced ICU",
      description: "State-of-the-art Intensive Care Units equipped with the latest monitoring technology and 24/7 specialized staff.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Operation Theaters",
      description: "Modular operation theaters with laminar airflow, ensuring the highest standards of infection control during surgeries.",
      image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Diagnostic Labs",
      description: "Fully automated, NABL accredited laboratories providing accurate and rapid test results.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Premium Patient Rooms",
      description: "Comfortable, spacious, and hygienic rooms designed to promote faster recovery and patient well-being.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">World-Class <span className="text-primary">Facilities</span></h1>
          <p className="text-lg text-slate-600">Experience healthcare in an environment designed for healing, comfort, and advanced medical procedures.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">{facility.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
