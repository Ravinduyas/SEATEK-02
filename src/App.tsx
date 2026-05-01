/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Wrench, 
  Layers, 
  Hammer, 
  Target, 
  ShieldCheck, 
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Ship,
  Box,
  Layout
} from 'lucide-react';

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = 'px-6 py-3 font-semibold transition-all duration-300 flex items-center gap-2 group';
  const variants = {
    primary: 'bg-brand-accent text-brand-primary hover:bg-brand-accent-hover',
    secondary: 'bg-white text-brand-primary hover:bg-gray-100',
    outline: 'border border-white text-white hover:bg-white hover:text-brand-primary',
    dark: 'bg-brand-primary text-white hover:bg-brand-primary-900 border border-brand-primary',
    ghost: 'text-brand-primary hover:bg-brand-muted',
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionTag = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 border ${dark ? 'border-white/30 text-white' : 'border-brand-primary/20 text-brand-primary/60'}`}>
    {children}
  </span>
);

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'HAVN Catalogue', href: '#' },
    { name: 'Capabilities', href: '#' },
    { name: 'Repairs', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Past Projects', href: '#' },
  ];

  const disciplines = [
    {
      title: 'Fabric Works',
      description: 'Marine upholstery, canvas fabrication, and custom textile solutions for interior and exterior applications.',
      icon: <Layers size={24} />,
      image: 'https://picsum.photos/seed/fabric/800/600',
    },
    {
      title: 'Fiberglass Works',
      description: 'Hull repairs, composite fabrication, and structural reinforcement with advanced lamination techniques.',
      icon: <Ship size={24} />,
      image: 'https://picsum.photos/seed/fiberglass/800/600',
    },
    {
      title: 'Metal Works',
      description: 'Precision welding, stainless steel fabrication, and structural metalwork for marine and commercial environments.',
      icon: <Hammer size={24} />,
      image: 'https://picsum.photos/seed/metal/800/600',
    },
  ];

  const havnProducts = [
    {
      title: 'Deck Equipment',
      description: 'Marine-grade hardware and fixtures designed for long-term installation.',
      image: 'https://picsum.photos/seed/deck/600/600',
    },
    {
      title: 'Interior Fittings',
      description: 'Premium interior components for yacht and marine hospitality applications.',
      image: 'https://picsum.photos/seed/interior/600/600',
    },
    {
      title: 'Custom Furniture',
      description: 'Made-to-specification furniture solutions for hospitality and commercial spaces.',
      image: 'https://picsum.photos/seed/furniture/600/600',
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-brand-accent selection:text-brand-primary">
      {/* Navigation */}
      <nav id="navbar" className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-primary py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-brand-accent flex items-center justify-center font-display font-bold text-brand-primary text-xl">S</div>
            <span className="text-2xl font-display font-bold text-white tracking-widest uppercase">Seatek</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="text-sm">Get in Touch</Button>
          </div>
          
          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-brand-primary flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold text-white tracking-widest uppercase">Seatek</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-display font-bold text-white hover:text-brand-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <Button variant="primary" className="w-full justify-center">Get in Touch</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/industrial/1920/1080?grayscale" 
            alt="Industrial Workshop" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8">
              Technical Excellence. <br />
              <span className="text-brand-accent">Custom Solutions.</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
              SEATEK delivers specialized workshop and service solutions across marine, hospitality, and commercial sectors. From repairs to custom fabrication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary">
                Start a Project <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline">Explore Capabilities</Button>
              <Button variant="outline">HAVN Catalogue</Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-px h-16 bg-white/30 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-accent"></div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="bg-brand-muted text-brand-primary/60 text-xs font-bold px-3 py-1 uppercase tracking-widest mb-6 inline-block">Formerly Solar Impulse Workshop Division</span>
              <h2 className="text-4xl md:text-5xl mb-8">Welcome to SEATEK</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                SEATEK represents the evolution of our workshop and technical service operations. We specialize in repairs and maintenance, custom projects, and subcontracting across three core disciplines: fabric works, fiberglass works, and metal works.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {disciplines.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative h-64 mb-6 overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white flex items-center justify-center text-brand-primary shadow-lg">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {item.description}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-accent transition-colors group/link uppercase text-sm tracking-widest">
                  Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Split Section */}
      <section className="py-24 bg-brand-muted overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl mb-8">Custom Solutions, Technical Precision</h2>
              <p className="text-lg text-gray-600 mb-6">
                Every project is unique. SEATEK specializes in made-to-measure solutions that address specific technical requirements across marine, hospitality, and commercial applications.
              </p>
              <p className="text-lg text-gray-600 mb-10">
                From initial design consultation to final installation, our team delivers custom fabrication work that meets exact specifications and exceeds performance expectations.
              </p>
              <Button variant="dark">
                View All Capabilities <ChevronRight size={18} />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="aspect-[3/4] bg-gray-200">
                    <img src="https://picsum.photos/seed/craft1/600/800" alt="Craftsmanship" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-gray-200">
                    <img src="https://picsum.photos/seed/craft2/600/800" alt="Planning" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-accent/20 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Repairs Section */}
      <section id="repairs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 h-[600px] bg-gray-100"
            >
              <img 
                src="https://picsum.photos/seed/repair/800/1200" 
                alt="Expert Repairs" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <SectionTag><Wrench size={14} className="inline mr-2" /> Repair Services</SectionTag>
              <h2 className="text-4xl md:text-5xl mb-8">Expert Repairs. <br />Reliable Maintenance.</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                SEATEK provides comprehensive repair and maintenance services to keep your equipment, vessels, and installations operating at peak performance.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Emergency repair response for marine and commercial operations',
                  'Scheduled maintenance programs and service contracts',
                  'Technical diagnostics and condition assessments',
                  'Refurbishment and restoration services'
                ].map((item) => (
                  <li key={item} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-2 h-2 bg-brand-accent shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#" className="inline-flex items-center gap-2 text-brand-primary font-bold group border-b-2 border-brand-accent pb-1">
                View Repair Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HAVN Section */}
      <section id="havn" className="py-24 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionTag dark><Box size={14} className="inline mr-2" /> Product Division</SectionTag>
            <h2 className="text-4xl md:text-5xl mb-8">Introducing HAVN</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              HAVN is our dedicated product sub-brand, offering fixed marine-related products designed for durability and performance in demanding environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {havnProducts.map((product, idx) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-1 border border-white/10 group hover:border-brand-accent/50 transition-colors"
              >
                <div className="aspect-square overflow-hidden mb-6">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-4 text-brand-accent">{product.title}</h3>
                  <p className="text-white/60 mb-6">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="primary">
              Browse HAVN Catalogue <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <SectionTag><Target size={14} className="inline mr-2" /> Trusted Partner</SectionTag>
              <h2 className="text-4xl md:text-5xl mb-8">Built on Experience. <br />Driven by Excellence.</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                SEATEK brings together skilled craftspeople, modern workshop facilities, and a commitment to quality that spans marine, hospitality, and commercial sectors.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                As part of a wider technical ecosystem, we collaborate with designers, operators, and industry partners to deliver solutions that work in real-world conditions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-video lg:aspect-square bg-gray-100">
                <img 
                  src="https://picsum.photos/seed/workshop/1000/1000" 
                  alt="Modern Workshop" 
                  className="w-full h-full object-cover shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-accent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-muted border-y border-brand-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Years Combined Experience', value: '25+' },
              { label: 'Projects Completed', value: '500+' },
              { label: 'Core Disciplines', value: '3' },
              { label: 'Quality Focused', value: '100%' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-brand-primary/40 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-accent">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl mb-8 text-brand-primary">Ready to Start Your Project?</h2>
            <p className="text-xl text-brand-primary/70 mb-12 leading-relaxed">
              Whether you need repairs, custom fabrication, or product enquiries, our team is ready to deliver technical solutions that work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="dark">
                Contact SEATEK <ArrowRight size={20} />
              </Button>
              <Button variant="outline" className="!border-brand-primary !text-brand-primary hover:!bg-brand-primary hover:!text-white">
                View Past Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-brand-accent flex items-center justify-center font-display font-bold text-brand-primary text-lg">S</div>
                <span className="text-xl font-display font-bold tracking-widest uppercase">Seatek</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Technical workshop and service provider for marine, hospitality, and commercial sectors.
              </p>
              <div className="flex gap-4">
                {/* Social icons would go here */}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-accent">Services</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Repairs & Maintenance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fabric Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fiberglass Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Metal Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-accent">Company</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">About SEATEK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Past Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HAVN Catalogue</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-accent">Contact</h4>
              <ul className="space-y-6 text-sm text-white/50">
                <li className="flex gap-4">
                  <MapPin size={18} className="text-brand-accent shrink-0" />
                  <span>123 Marine Industrial Park<br />Workshop Street<br />City, Country 12345</span>
                </li>
                <li className="flex gap-4">
                  <Phone size={18} className="text-brand-accent shrink-0" />
                  <span>+00 000 000 000</span>
                </li>
                <li className="flex gap-4">
                  <Mail size={18} className="text-brand-accent shrink-0" />
                  <span>info@seatek.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-top border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 uppercase tracking-widest font-bold">
            <p>© 2026 SEATEK. All rights reserved. Formerly Solar Impulse Workshop Division.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <button className="w-14 h-14 bg-brand-accent text-brand-primary rounded-full shadow-2xl flex items-center justify-center">
          <Mail size={24} />
        </button>
      </div>
    </div>
  );
}
