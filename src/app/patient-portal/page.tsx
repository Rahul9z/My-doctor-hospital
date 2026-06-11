"use client";

import { motion } from "framer-motion";
import { Lock, User, FileText, Calendar, Activity } from "lucide-react";
import Link from "next/link";

export default function PatientPortalPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Patient Portal</h1>
            <p className="text-slate-600">Sign in to access your medical records.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Patient ID or Email</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" placeholder="Enter ID or Email" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="password" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" placeholder="••••••••" />
                </div>
              </div>

              <button type="button" className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md">
                Sign In to Portal
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-600 mb-4">Don't have an account yet?</p>
              <button type="button" className="w-full py-3 bg-white text-primary font-bold rounded-xl border-2 border-primary/20 hover:bg-primary/5 transition-colors">
                Register as New Patient
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-1"><FileText className="w-4 h-4"/> Records</div>
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4"/> Appointments</div>
            <div className="flex items-center gap-1"><Activity className="w-4 h-4"/> Lab Results</div>
          </div>
        </div>
      </div>
    </div>
  );
}
