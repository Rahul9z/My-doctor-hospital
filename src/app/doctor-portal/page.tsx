"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Stethoscope, Lock, Mail, User, ShieldAlert, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

export default function DoctorPortalPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    specialty: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        if (data.user) {
          router.push("/doctor-dashboard");
        }
      } else {
        // Registration
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // Add to doctors table
          const { error: dbError } = await supabase.from('doctors').insert([
            {
              auth_user_id: authData.user.id,
              name: formData.name,
              specialty: formData.specialty,
            }
          ]);

          if (dbError) throw dbError;
          router.push("/doctor-dashboard");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
              <Stethoscope className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Doctor <span className="text-blue-600">Portal</span></h1>
            <p className="text-slate-600">Secure access for medical professionals only.</p>
          </div>

          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
          >
            {/* Toggle */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
              <button 
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name with Title</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        required 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        type="text" 
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" 
                        placeholder="Dr. John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Specialty</label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select 
                        required 
                        name="specialty" 
                        value={formData.specialty} 
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none" 
                      >
                        <option value="">Select Specialty</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="General Practice">General Practice</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Staff Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    type="email" 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" 
                    placeholder="doctor@hospital.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange}
                    type="password" 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" 
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {isLoading ? "Processing..." : isLogin ? "Access Portal" : "Create Account"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </motion.div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Not a doctor? <Link href="/patient-portal" className="font-bold text-primary hover:underline">Go to Patient Portal</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
