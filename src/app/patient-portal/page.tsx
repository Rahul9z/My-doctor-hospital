"use client";

import { useState } from "react";
import { Lock, FileText, Calendar, Activity, Loader2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function PatientPortalPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        // Handle Login
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        
        // Redirect to dashboard (to be built)
        router.push("/dashboard");
      } else {
        // Handle Signup
        if (!formData.firstName || !formData.lastName) {
          throw new Error("First and Last name are required for registration.");
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // Insert into public.patients table
          const { error: dbError } = await supabase.from('patients').insert([
            {
              auth_user_id: authData.user.id,
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
            }
          ]);

          if (dbError) {
            console.error("Profile creation error:", dbError);
            throw new Error("Account created, but failed to setup patient profile.");
          }
        }

        setSuccess("Registration successful! Please check your email to verify your account, or log in if verification is disabled.");
        setIsLogin(true); // Switch back to login view
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Patient Portal</h1>
            <p className="text-slate-600">
              {isLogin ? "Sign in to access your medical records." : "Create your patient account."}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl text-sm border border-green-100">
                {success}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required={!isLogin}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" 
                      placeholder="John" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      required={!isLogin}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" 
                    placeholder="Enter Email" 
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  {isLogin && <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLogin ? "Sign In to Portal" : "Create Account"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-600 mb-4">
                {isLogin ? "Don't have an account yet?" : "Already have an account?"}
              </p>
              <button 
                type="button" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setSuccess(null);
                }}
                className="w-full py-3 bg-white text-primary font-bold rounded-xl border-2 border-primary/20 hover:bg-primary/5 transition-colors"
              >
                {isLogin ? "Register as New Patient" : "Sign In instead"}
              </button>
            </div>
          </div>
          
          {isLogin && (
            <div className="mt-8 flex justify-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-1"><FileText className="w-4 h-4"/> Records</div>
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4"/> Appointments</div>
              <div className="flex items-center gap-1"><Activity className="w-4 h-4"/> Lab Results</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
