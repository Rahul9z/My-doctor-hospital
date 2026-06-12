"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, Activity, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function BookAppointmentPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Auth state
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientId, setPatientId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    date: "",
    time: ""
  });

  // Check if user is logged in to pre-fill info or get patient ID
  useEffect(() => {
    let mounted = true;
    
    const fetchUser = async () => {
      // Use getUser() for more secure/reliable fetch than getSession()
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (user && mounted) {
        setIsLoggedIn(true);
        const { data: profileData, error: profileError } = await supabase
          .from("patients")
          .select("*")
          .eq("auth_user_id", user.id)
          .single();
          
        if (profileData && mounted) {
          setPatientId(profileData.id);
          setFormData(prev => ({
            ...prev,
            name: `${profileData.first_name} ${profileData.last_name}`,
            email: profileData.email,
            phone: profileData.phone_number || prev.phone
          }));
        }
      } else if (mounted) {
        setIsLoggedIn(false);
      }
      
      if (mounted) {
        setIsCheckingAuth(false);
      }
    };
    
    fetchUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUser();
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let currentPatientId = patientId;
      
      // Fallback: Double check user session at submission time
      if (!currentPatientId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          let { data: profileData, error: profileError } = await supabase
            .from("patients")
            .select("*")
            .eq("auth_user_id", user.id)
            .single();
            
          // Auto-repair if missing
          if (!profileData && profileError?.code === 'PGRST116') {
            const { data: newProfile } = await supabase.from("patients").insert({
              auth_user_id: user.id,
              first_name: user.email?.split('@')[0] || "Patient",
              last_name: "",
              email: user.email || ""
            }).select().single();
            profileData = newProfile;
          }
            
          if (profileData) {
            currentPatientId = profileData.id;
            setPatientId(profileData.id);
          }
        }
      }

      if (!currentPatientId) {
        throw new Error("Cannot find your patient profile! Please log in to the Patient Portal first to link your account.");
      }
      
      // Logged in user booking
      const { error: insertError } = await supabase.from('appointments').insert([
        {
          patient_id: currentPatientId,
          department: formData.department,
          appointment_date: formData.date,
          appointment_time: formData.time,
          status: 'confirmed'
        }
      ]);
      if (insertError) throw insertError;

      // Trigger WhatsApp Confirmation silently
      try {
        await fetch("/api/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formData.phone,
            name: formData.name,
            department: formData.department,
            date: formData.date,
            time: formData.time
          })
        });
      } catch (waError) {
        console.error("Failed to trigger WhatsApp confirmation", waError);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Booking Error:", err);
      // Supabase errors are often objects with a 'message' property
      if (err && typeof err === 'object') {
        setError(err.message || err.details || JSON.stringify(err));
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center max-w-lg mx-4"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            Your appointment has been successfully booked. We have sent the confirmation details to your email and via SMS.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center max-w-lg mx-4"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Authentication Required</h2>
          <p className="text-slate-600 mb-8">
            You must be logged into the Patient Portal to schedule an appointment. Please log in or register a new account.
          </p>
          <button 
            onClick={() => window.location.href = "/patient-portal"}
            className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Book an <span className="text-primary">Appointment</span></h1>
          <p className="text-lg text-slate-600">Schedule your visit with our expert doctors. Fill in the details below.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 mb-6">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-2">
                  <User className="w-5 h-5 text-primary" /> Patient Details
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input readOnly name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-100 text-slate-500 cursor-not-allowed" placeholder="John Doe" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input readOnly name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-100 text-slate-500 cursor-not-allowed" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input readOnly name="email" value={formData.email} onChange={handleChange} type="email" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-100 text-slate-500 cursor-not-allowed" placeholder="john@example.com" />
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-2">
                  <Activity className="w-5 h-5 text-primary" /> Appointment Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                  <select required name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50">
                    <option value="">Select a Department</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required name="time" value={formData.time} onChange={handleChange} type="time" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" disabled={isLoading} className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calendar className="w-5 h-5" />}
                Confirm Booking
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
