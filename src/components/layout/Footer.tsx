import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & About */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                MD
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none text-white">
                  My Doctor
                </span>
                <span className="text-xs text-secondary font-semibold uppercase tracking-wider">
                  Hospital
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Elevating Healthcare Beyond Limits. Advanced medical care combined with human compassion and AI-powered intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/departments" className="hover:text-white transition-colors">Departments</Link></li>
              <li><Link href="/doctors" className="hover:text-white transition-colors">Find a Doctor</Link></li>
              <li><Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Health Blog</Link></li>
            </ul>
          </div>

          {/* Special Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Special Services</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/emergency-guidance" className="hover:text-secondary text-secondary transition-colors font-medium">Care Before You Reach™</Link></li>
              <li><Link href="/telemedicine" className="hover:text-white transition-colors">Online Consultation</Link></li>
              <li><Link href="/insurance" className="hover:text-white transition-colors">Insurance & Billing</Link></li>
              <li><Link href="/patient-portal" className="hover:text-white transition-colors">Patient Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">123 Health Avenue, Medical District, NY 10001, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">contact@mydoctorhospital.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} My Doctor Hospital. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
