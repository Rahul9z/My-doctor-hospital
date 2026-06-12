"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut, Calendar, Activity, CheckCircle2, UserCheck, Stethoscope } from "lucide-react";

type DoctorProfile = {
  id: string;
  name: string;
  specialty: string;
};

type AppointmentData = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  department: string;
  status: string;
  patient_name?: string;
  patient_phone?: string;
  patients?: { first_name: string; last_name: string; phone_number: string };
};

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/doctor-portal");
        return;
      }

      // Fetch doctor profile
      let { data: profileData, error: profileError } = await supabase
        .from("doctors")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .single();
        
      // Auto-repair if missing
      if (!profileData && profileError?.code === 'PGRST116') {
        const { data: newProfile } = await supabase.from("doctors").insert({
          auth_user_id: session.user.id,
          name: session.user.email ? `Dr. ${session.user.email.split('@')[0]}` : "Doctor",
          specialty: "General Practice",
        }).select().single();
        profileData = newProfile;
      }
        
      if (profileData) {
        setProfile(profileData);

        // Fetch appointments and filter in memory to avoid PostgREST parsing errors with spaces
        const { data: apptData, error: apptError } = await supabase
          .from("appointments")
          .select("*, patients(first_name, last_name, phone_number)")
          .order("appointment_date", { ascending: true });
          
        if (apptError) {
          console.error("Error fetching appointments:", apptError);
        }
          
        if (apptData) {
          // Case-insensitive filtering
          const filteredAppts = apptData.filter(appt => {
            const docSpec = (profileData.specialty || "").toLowerCase().trim();
            const apptDept = (appt.department || "").toLowerCase().trim();
            return (
              appt.doctor_id === profileData.id || 
              apptDept === docSpec ||
              (apptDept === 'general' && docSpec === 'general practice') ||
              (apptDept === 'general consultation' && docSpec === 'general practice') ||
              apptDept.includes(docSpec) || docSpec.includes(apptDept)
            );
          });
          
          // Debug fallback: If it's still empty, just show ALL appointments so the user isn't stuck
          if (filteredAppts.length === 0 && apptData.length > 0) {
            setAppointments(apptData); // Show them all
          } else {
            setAppointments(filteredAppts);
          }
        }
      }
      
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/doctor-portal");
  };

  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    
    // Database update
    await supabase.from("appointments").update({ status: newStatus }).eq("id", id);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Stethoscope className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{profile?.name}</h1>
              <p className="text-slate-600 font-medium text-lg flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> {profile?.specialty} Department
              </p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-200 transition-colors w-full md:w-auto justify-center"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Calendar className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Appointments</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{appointments.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0"><Activity className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Action</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0"><CheckCircle2 className="w-6 h-6" /></div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Completed Today</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{appointments.filter(a => a.status === 'completed').length}</h3>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-2xl font-bold text-slate-900">Patient Roster</h2>
            <p className="text-slate-500 mt-1">Manage your upcoming and past patient consultations.</p>
          </div>
          
          <div className="p-6 md:p-8">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <UserCheck className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700">Your schedule is clear!</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">No patients are currently scheduled for your department.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appt) => {
                  // Determine patient name from either linked patient account or guest fallback
                  const patientName = appt.patients ? `${appt.patients.first_name} ${appt.patients.last_name}` : appt.patient_name || "Unknown Patient";
                  const phone = appt.patients?.phone_number || appt.patient_phone || "No phone";
                  
                  return (
                    <div key={appt.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-5 border border-slate-100 rounded-2xl hover:shadow-md transition-shadow bg-white">
                      
                      {/* Left: Date & Time */}
                      <div className="flex items-center gap-5 mb-4 lg:mb-0 lg:w-1/4">
                        <div className="bg-blue-50 text-blue-700 p-3 rounded-xl text-center min-w-[75px] shrink-0">
                          <div className="text-xs font-black uppercase tracking-wider">{new Date(appt.appointment_date).toLocaleDateString('en-US', { month: 'short' })}</div>
                          <div className="text-2xl font-black">{new Date(appt.appointment_date).getDate()}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-900">{appt.appointment_time}</div>
                          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            appt.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            appt.status === 'completed' ? 'bg-slate-200 text-slate-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {appt.status}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Patient Info */}
                      <div className="lg:w-2/4 mb-5 lg:mb-0 lg:px-4">
                        <h3 className="font-bold text-slate-900 text-xl">{patientName}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">📞 {phone}</span>
                          {appt.department !== profile?.specialty && (
                            <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">Department: {appt.department}</span>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 lg:w-1/4 lg:justify-end shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                        {appt.status !== 'completed' && (
                          <button 
                            onClick={() => updateStatus(appt.id, 'completed')}
                            className="flex-1 lg:flex-none px-4 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors shadow-sm"
                          >
                            Mark Completed
                          </button>
                        )}
                        {appt.status === 'pending' && (
                          <button 
                            onClick={() => updateStatus(appt.id, 'confirmed')}
                            className="flex-1 lg:flex-none px-4 py-2.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-200 transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                          <button 
                            onClick={() => updateStatus(appt.id, 'cancelled')}
                            className="px-4 py-2.5 bg-red-50 text-red-600 text-sm font-bold rounded-xl hover:bg-red-100 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
