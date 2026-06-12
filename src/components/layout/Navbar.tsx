"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Calendar, ChevronDown } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Hospital Services", 
      dropdown: [
        { name: "About Us", href: "/about" },
        { name: "Departments", href: "/departments" },
        { name: "Find a Doctor", href: "/doctors" },
        { name: "Care Before You Reach™", href: "/emergency-guidance", highlight: true },
        { name: "Insurance & Billing", href: "/insurance" },
      ]
    },
    { name: "Patient Portal", href: "/patient-portal" },
    { name: "Doctor Login", href: "/doctor-portal" },
    { name: "Contact", href: "/contact" },
  ];

  const handleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-white/80 backdrop-blur-md py-5 border-b border-slate-200/50"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
              MD
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-slate-900">
                My Doctor
              </span>
              <span className="text-xs text-secondary font-semibold uppercase tracking-wider">
                Hospital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <button 
                    className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-primary transition-colors py-2"
                  >
                    {link.name} <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  </button>
                ) : (
                  <Link
                    href={link.href!}
                    className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors py-2 block"
                  >
                    {link.name}
                  </Link>
                )}
                
                {/* Desktop Dropdown */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white border border-slate-100 shadow-xl rounded-xl py-2 min-w-[240px] flex flex-col">
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          className={`px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors ${
                            sublink.highlight ? "text-secondary font-bold" : "text-slate-700 hover:text-primary"
                          }`}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/emergency"
              className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Emergency
            </Link>
            <Link
              href="/book-appointment"
              className="flex items-center gap-2 text-sm font-bold text-white bg-primary px-5 py-2.5 rounded-full hover:bg-primary/90 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-900 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 py-4 px-4 flex flex-col shadow-2xl max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col border-b border-slate-50 last:border-0">
              {link.dropdown ? (
                <>
                  <button 
                    className="flex items-center justify-between text-lg font-bold p-3 text-slate-800"
                    onClick={() => handleDropdown(link.name)}
                  >
                    {link.name}
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === link.name && (
                    <div className="flex flex-col bg-slate-50 rounded-xl p-2 mb-2">
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          className={`text-base font-medium p-3 rounded-lg hover:bg-white ${
                            sublink.highlight ? "text-secondary font-bold" : "text-slate-600"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href!}
                  className="text-lg font-bold p-3 text-slate-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/emergency"
              className="flex items-center justify-center gap-2 w-full text-base font-bold text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PhoneCall className="w-5 h-5" />
              Emergency Services
            </Link>
            <Link
              href="/book-appointment"
              className="flex items-center justify-center gap-2 w-full text-base font-bold text-white bg-primary px-4 py-3 rounded-xl shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
