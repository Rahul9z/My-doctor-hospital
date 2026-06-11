"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, FileText, CheckCircle2 } from "lucide-react";

export default function InsurancePage() {
  const insurancePartners = [
    "Aetna", "Blue Cross Blue Shield", "Cigna", "Humana", "UnitedHealthcare", "Medicare", "Medicaid"
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Insurance & <span className="text-primary">Billing</span></h1>
          <p className="text-lg text-slate-600">We believe in transparent pricing and hassle-free insurance processing so you can focus on your recovery.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Accepted Insurance</h3>
            <p className="text-slate-600 text-sm">We accept most major health insurance plans and offer cashless treatment facilities.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Flexible Payments</h3>
            <p className="text-slate-600 text-sm">Pay your bills securely online with credit cards, EMI options, or direct bank transfers.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Transparent Pricing</h3>
            <p className="text-slate-600 text-sm">Get clear estimates for treatments and procedures without hidden costs.</p>
          </div>
        </div>

        <div className="bg-white max-w-5xl mx-auto rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Major Insurance Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {insurancePartners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 font-semibold text-slate-700 text-center hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors">
                {partner}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-primary mb-2">Need help with billing?</h3>
            <p className="text-slate-700 mb-4">Our financial counselors are here to assist you.</p>
            <button className="px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">
              Contact Billing Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
