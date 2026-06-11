"use client";

import { motion } from "framer-motion";
import { Shield, Award, HeartHandshake, Users } from "lucide-react";

export default function AboutPage() {
  const values = [
    { title: "Excellence", icon: Award, desc: "We strive for the highest standards in clinical outcomes and patient safety." },
    { title: "Compassion", icon: HeartHandshake, desc: "Treating every patient with dignity, respect, and empathy." },
    { title: "Innovation", icon: Shield, desc: "Embracing cutting-edge technology and AI to improve healthcare delivery." },
    { title: "Teamwork", icon: Users, desc: "Collaborating across disciplines to provide comprehensive care." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About <span className="text-primary">My Doctor Hospital</span></h1>
          <p className="text-lg text-slate-600">
            Founded on the principles of advanced medical technology and human compassion, we are redefining what it means to experience world-class healthcare.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            To deliver exceptional, AI-enhanced, and compassionate healthcare to every individual, ensuring a healthier and brighter future for our community. We believe that technology should empower doctors and comfort patients, bridging the gap between clinical efficiency and personal care.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-6">Core Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <value.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
