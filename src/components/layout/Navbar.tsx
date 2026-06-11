"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PhoneCall, Calendar } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Departments", href: "/departments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Facilities", href: "/facilities" },
    { name: "Care Before You Reach™", href: "/emergency-guidance", highlight: true },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
              MD
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-foreground">
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
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  link.highlight ? "text-secondary font-bold" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/emergency"
              className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
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
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full glass border-t border-border/50 py-4 px-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-lg font-medium p-2 rounded-lg hover:bg-accent ${
                link.highlight ? "text-secondary font-bold" : "text-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/50">
            <Link
              href="/emergency"
              className="flex items-center justify-center gap-2 w-full text-base font-bold text-red-600 bg-red-50 px-4 py-3 rounded-xl"
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
