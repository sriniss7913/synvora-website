'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SynvoraLogo } from '../ui/SynvoraLogo';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { NAVIGATION_LINKS } from '@/lib/constants';
import { ChevronDown, Menu, X, ArrowRight, ShieldCheck, BrainCircuit, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceIcons = {
    'ai-workflow-optimization': BrainCircuit,
    'digital-security-risk-assessment': ShieldCheck,
    'business-process-digitization': LayoutDashboard,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-soft py-3'
          : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <SynvoraLogo variant="compact" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              if (link.children) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'text-synvora-blue-900 dark:text-synvora-blue-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:text-synvora-blue-900 dark:hover:text-white'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 mt-1 bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 p-3 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.children.map((child) => {
                          const IconComp = child.href.includes('ai-workflow')
                            ? BrainCircuit
                            : child.href.includes('security')
                            ? ShieldCheck
                            : LayoutDashboard;

                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="group p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-start gap-3"
                            >
                              <div className="p-2 rounded-md bg-synvora-blue-50 dark:bg-slate-800 text-synvora-blue-700 dark:text-synvora-blue-400 group-hover:bg-synvora-blue-900 group-hover:text-white transition-colors">
                                <IconComp className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-synvora-blue-900 dark:group-hover:text-synvora-blue-400 transition-colors">
                                  {child.name}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                                  {child.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-synvora-blue-900 dark:text-synvora-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-synvora-blue-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-synvora-emerald-100 text-synvora-emerald-800 dark:bg-synvora-emerald-950 dark:text-synvora-emerald-300 rounded-full uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & Theme Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button href="/contact" variant="primary" size="sm">
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {NAVIGATION_LINKS.map((link) => (
            <div key={link.name}>
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base font-semibold ${
                  pathname === link.href
                    ? 'text-synvora-blue-900 dark:text-synvora-blue-400'
                    : 'text-slate-800 dark:text-slate-200'
                }`}
              >
                {link.name}
              </Link>
              {link.children && (
                <div className="pl-4 space-y-2 mt-1 border-l-2 border-slate-100 dark:border-slate-800">
                  {link.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-slate-600 dark:text-slate-400 py-1 hover:text-synvora-blue-900"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button href="/contact" variant="primary" className="w-full" onClick={() => setMobileMenuOpen(false)}>
              Contact Enterprise Team
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
