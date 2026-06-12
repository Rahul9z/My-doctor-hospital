"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut, User, Calendar, Activity, ChevronRight, FileText, PlusCircle } from "lucide-react";
import Link from "next/link";

type ProfileData = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  date_of_birth?: string;
};

type AppointmentData = {
  id: string;
  appointment_date: string;
  appointment_time: string;
  department: string;
  status: string;
  doctors?: { name: string; specialty?: string };
};

type MedicalRecordData = {
  id: string;
  record_type: string;
  created_at: string;
  doctors?: { name: string };
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [records, setRecords] = useState<MedicalRecordData[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "appointments" | "records">("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/patient-portal");
        return;
      }

      // Fetch patient profile
      let { data: profileData, error: profileError } = await supabase
        .from("patients")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .single();
        
      // Auto-repair: If user exists in Auth but has no patient profile (happens if tables were created later)
      if (!profileData && profileError?.code === 'PGRST116') {
        const { data: newProfile } = await supabase.from("patients").insert({
          auth_user_id: session.user.id,
          first_name: session.user.email?.split('@')[0] || "Patient",
          last_name: "",
          email: session.user.email || ""
        }).select().single();
        
        profileData = newProfile;
      }
        
      if (profileData) {
        setProfile(profileData);

        // Fetch appointments
        const { data: apptData } = await supabase
          .from("appointments")
          .select("*, doctors(name, specialty)")
          .eq("patient_id", profileData.id)
          .order("appointment_date", { ascending: true });
        if (apptData) setAppointments(apptData);

        // Fetch medical records
        const { data: recordData } = await supabase
          .from("medical_records")
          .select("*, doctors(name)")
          .eq("patient_id", profileData.id)
          .order("created_at", { ascending: false });
        if (recordData) setRecords(recordData);
      }
      
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/patient-portal");
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center pt-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {profile?.first_name || "Patient"}!</h1>
            <p className="text-slate-600">Patient ID: {profile?.id?.split('-')[0].toUpperCase()}</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 pb-4 overflow-x-auto">
          {["overview", "appointments", "records", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "overview" | "appointments" | "records" | "profile")}
              className={`px-6 py-2.5 rounded-full font-semibold capitalize whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10">
          
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div 
                onClick={() => setActiveTab("profile")}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">My Profile</h2>
                <p className="text-sm text-slate-500 flex items-center justify-between">
                  Manage details <ChevronRight className="w-4 h-4" />
                </p>
              </div>

              <div 
                onClick={() => setActiveTab("appointments")}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 cursor-pointer hover:border-green-500/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Appointments</h2>
                <p className="text-sm text-slate-500 flex items-center justify-between">
                  {appointments.length} upcoming <ChevronRight className="w-4 h-4" />
                </p>
              </div>

              <div 
                onClick={() => setActiveTab("records")}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 cursor-pointer hover:border-purple-500/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Medical Records</h2>
                <p className="text-sm text-slate-500 flex items-center justify-between">
                  {records.length} files available <ChevronRight className="w-4 h-4" />
                </p>
              </div>
            </div>
          )}

          {/* APPOINTMENTS TAB */}
          {activeTab === "appointments" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Your Appointments</h2>
                <Link href="/book-appointment" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">
                  <PlusCircle className="w-4 h-4" /> Book New
                </Link>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-700">No appointments found</h3>
                  <p className="text-slate-500 mb-4">You don&apos;t have any upcoming or past appointments.</p>
                  <Link href="/book-appointment" className="text-primary font-bold hover:underline">
                    Schedule one now
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div key={appt.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-slate-100 rounded-2xl hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="bg-primary/10 text-primary p-3 rounded-xl text-center min-w-[80px]">
                          <div className="text-xs font-bold uppercase">{new Date(appt.appointment_date).toLocaleDateString('en-US', { month: 'short' })}</div>
                          <div className="text-2xl font-bold">{new Date(appt.appointment_date).getDate()}</div>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">{appt.department} Consultation</h3>
                          <p className="text-sm text-slate-600">With {appt.doctors?.name || "Assigned Doctor"}</p>
                          <p className="text-xs text-slate-500 mt-1">{appt.appointment_time}</p>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        appt.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                        appt.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* RECORDS TAB */}
          {activeTab === "records" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Medical Records & Test Results</h2>
              {records.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-700">No records found</h3>
                  <p className="text-slate-500">Your lab results, prescriptions, and visit summaries will appear here.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {records.map((record) => (
                    <div key={record.id} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:border-primary/30 transition-colors cursor-pointer group">
                      <div className="bg-purple-50 text-purple-600 p-3 rounded-lg group-hover:bg-purple-100 transition-colors">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 capitalize">{record.record_type.replace('_', ' ')}</h3>
                        <p className="text-xs text-slate-500 mb-1">From: {record.doctors?.name || "Hospital Staff"}</p>
                        <p className="text-xs text-slate-400">{new Date(record.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Patient Information</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">First Name</label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium">{profile?.first_name}</div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Last Name</label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium">{profile?.last_name}</div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium">{profile?.email}</div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium">{profile?.phone_number || "Not provided"}</div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date of Birth</label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-medium">{profile?.date_of_birth || "Not provided"}</div>
                </div>
              </div>
              <button className="mt-8 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                Edit Profile
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
