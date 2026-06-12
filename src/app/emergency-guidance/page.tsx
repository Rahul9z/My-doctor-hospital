"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Heart, Droplets, Flame, Brain } from "lucide-react";
import { MedicalGuidanceChat } from "@/components/ui/MedicalGuidanceChat";

export default function EmergencyGuidancePage() {
  const guidelines = [
    {
      title: "Heart Attack",
      icon: Heart,
      color: "bg-red-100 text-red-600",
      steps: [
        "Call emergency services immediately.",
        "Have the person sit down, rest, and try to keep calm.",
        "Loosen any tight clothing.",
        "If they are prescribed nitroglycerin, help them take it.",
        "Begin CPR if the person becomes unconscious and stops breathing."
      ]
    },
    {
      title: "Severe Bleeding",
      icon: Droplets,
      color: "bg-orange-100 text-orange-600",
      steps: [
        "Apply direct pressure to the wound with a clean cloth.",
        "Keep the pressure continuous for at least 10 minutes.",
        "If possible, elevate the injured area above the heart.",
        "Do not remove the cloth if it becomes soaked; add another on top.",
        "Keep the person warm to prevent shock."
      ]
    },
    {
      title: "Burns",
      icon: Flame,
      color: "bg-amber-100 text-amber-600",
      steps: [
        "Cool the burn under cool (not cold) running water for 10-15 minutes.",
        "Remove rings or tight items from the burned area quickly.",
        "Do NOT break blisters.",
        "Apply a sterile, non-fluffy dressing or cloth.",
        "Do NOT apply ice, butter, or ointments to severe burns."
      ]
    },
    {
      title: "Stroke Suspected",
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
      steps: [
        "Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911.",
        "Note the time when symptoms first appeared.",
        "Do not give them anything to eat or drink.",
        "Keep the person comfortable and reassure them.",
        "Wait for emergency services; do not drive them to the hospital yourself."
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl mb-12 flex gap-4 max-w-4xl mx-auto shadow-sm">
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-800 mb-1">Disclaimer</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              The information provided here is for temporary guidance and first-aid purposes only. It is NOT a substitute for professional medical treatment. Always call emergency services or seek immediate medical help for serious conditions.
            </p>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Care Before You <span className="text-primary">Reach™</span></h1>
          <p className="text-lg text-slate-600">Immediate precautionary guidance and first-aid instructions while you are traveling to the hospital or waiting for an ambulance.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {guidelines.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${guide.color}`}>
                  <guide.icon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{guide.title}</h2>
              </div>
              <ul className="space-y-4">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex gap-3 text-slate-600">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">{stepIndex + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* AI Assistant Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ask the AI Medical Assistant</h2>
            <p className="text-slate-600">If your situation is not listed above, describe it below for immediate preliminary guidance.</p>
          </div>
          <MedicalGuidanceChat />
        </div>
      </div>
    </div>
  );
}
