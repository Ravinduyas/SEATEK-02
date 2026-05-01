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
    { name: 'Capabilities & Custom Projects', href: '#', hasDropdown: true },
    { name: 'Repairs & Maintenance', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Past Projects', href: '#' },
  ];

  const disciplines = [
    {
      title: 'Fabric Works',
      description: 'Marine upholstery, canvas fabrication, and custom textile solutions for interior and exterior applications.',
      icon: <Layers size={22} />,
      image: 'https://images.unsplash.com/photo-1524311583145-d43997636e05?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Fiberglass Works',
      description: 'Hull repairs, composite fabrication, and structural reinforcement with advanced lamination techniques.',
      icon: <Ship size={22} />,
      image: 'https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Metal Works',
      description: 'Precision welding, stainless steel fabrication, and structural metalwork for marine and commercial environments.',
      icon: <Hammer size={22} />,
      image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const havnProducts = [
    {
      title: 'Deck Equipment',
      description: 'Marine-grade hardware and fixtures designed for long-term installation.',
      image: 'https://images.unsplash.com/photo-1544253710-9a62bc9b51a4?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Interior Fittings',
      description: 'Premium interior components for yacht and marine hospitality applications.',
      image: 'https://images.unsplash.com/photo-1499916057420-c17612689280?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Custom Furniture',
      description: 'Made-to-specification furniture solutions for hospitality and commercial spaces.',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav id="navbar" className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0f1130] py-3 shadow-xl' : 'bg-[#0f1130]/10 backdrop-blur-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-brand-accent flex items-center justify-center font-display font-bold text-[#0f1130] text-xl relative overflow-hidden">
               <span className="relative z-10">S</span>
               <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
            <span className="text-2xl font-display font-bold text-brand-accent tracking-widest uppercase">Seatek</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-bold text-white hover:text-brand-accent transition-colors tracking-widest uppercase flex items-center gap-1"
              >
                {link.name}
                {link.hasDropdown && <ChevronRight size={12} className="rotate-90" />}
              </a>
            ))}
            <Button variant="primary" className="text-[11px] uppercase tracking-widest px-8 font-black">Get in Touch</Button>
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
            className="fixed inset-0 z-[60] bg-[#0f1130] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold text-brand-accent tracking-widest uppercase">Seatek</span>
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
              <Button variant="primary" className="w-full justify-center text-sm uppercase tracking-widest">Get in Touch</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#0f1130]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920" 
            alt="Industrial Workshop" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1130] via-[#0f1130]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[100px] text-white leading-[0.95] mb-12 font-black uppercase tracking-tight">
              Technical Excellence.<br />
              <span className="text-brand-accent">Custom Solutions.</span>
            </h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl font-medium">
              SEATEK delivers specialized workshop and service solutions across marine, hospitality, and commercial sectors. From repairs to custom fabrication, we bring technical expertise to every project.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" className="uppercase px-10 text-xs font-black tracking-widest">
                Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="uppercase px-10 text-xs font-black tracking-widest border-2">Explore Capabilities</Button>
              <Button variant="outline" className="uppercase px-10 text-xs font-black tracking-widest border-2">HAVN Catalogue</Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-[#fef9c3] text-[#b45309] text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.2em] mb-10 inline-block border border-[#fde68a]">Formerly Solar Impulse Workshop Division</span>
              <h2 className="text-5xl md:text-6xl mb-10 text-[#0f1130] font-black uppercase tracking-tight">Welcome to SEATEK</h2>
              <p className="text-lg text-[#0f1130]/60 leading-[1.8] font-medium">
                SEATEK represents the evolution of our workshop and technical service operations. We specialize in repairs and maintenance, custom projects, and subcontracting across three core disciplines: fabric works, fiberglass works, and metal works.
              </p>
              <p className="text-lg text-[#0f1130]/60 leading-[1.8] font-medium mt-6">
                Our team combines decades of technical expertise with modern manufacturing capabilities to deliver solutions that meet the exacting standards of marine operators, hospitality businesses, and commercial partners worldwide.
              </p>
            </motion.div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 text-[#0f1130] font-black uppercase tracking-tight">Three Disciplines. One Workshop. Many Solutions Tailored To Your Needs.</h2>
            <p className="text-[#0f1130]/40 uppercase tracking-widest text-[10px] font-black">Comprehensive fabrication capabilities across materials and techniques</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {disciplines.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-[#f8fafc] p-1 shadow-sm border border-[#0f1130]/5"
              >
                <div className="relative h-64 overflow-hidden mb-8">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 left-0 w-14 h-14 bg-white flex items-center justify-center text-[#0f1130] shadow-sm">
                    {item.icon}
                  </div>
                </div>
                <div className="px-8 pb-12">
                  <h3 className="text-3xl mb-6 text-[#0f1130] font-black uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[#0f1130]/60 mb-8 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-brand-accent font-black hover:text-[#0f1130] transition-colors group/link uppercase text-[10px] tracking-[0.2em] bg-[#0f1130]/5 px-4 py-2">
                    Learn More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Split Section */}
      <section className="py-32 bg-[#f4f6f8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-7xl mb-10 text-[#0f1130] leading-[0.95] font-black uppercase tracking-tight">Custom Solutions,<br />Technical Precision</h2>
              <p className="text-lg text-[#0f1130]/60 mb-8 leading-relaxed font-medium">
                Every project is unique. SEATEK specializes in made-to-measure solutions that address specific technical requirements across marine, hospitality, and commercial applications.
              </p>
              <p className="text-lg text-[#0f1130]/60 mb-12 leading-relaxed font-medium">
                From initial design consultation to final installation, our team delivers custom fabrication work that meets exact specifications and exceeds performance expectations.
              </p>
              <Button variant="dark" className="bg-[#0f1130] text-white px-10 uppercase text-xs tracking-widest font-black py-5">
                View All Capabilities <ChevronRight size={16} />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex gap-6 items-start">
                <div className="w-1/2 pt-20">
                   <img src="https://images.unsplash.com/photo-1503387837343-bc76906a5bbb?auto=format&fit=crop&q=80&w=600" alt="Planning" className="w-full h-[450px] object-cover shadow-2xl" referrerPolicy="no-referrer" />
                </div>
                <div className="w-1/2">
                  <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600" alt="Craftsmanship" className="w-full h-[400px] object-cover shadow-2xl" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Repairs Section */}
      <section id="repairs" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] lg:h-[700px] shadow-2xl relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1544320290-8c9e948f3199?auto=format&fit=crop&q=80&w=800" 
                alt="Expert Repairs" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-accent/20 -z-10"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f6f8] text-[#0f1130]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-[#0f1130]/10">
                <Wrench size={12} /> Repair Services
              </div>
              <h2 className="text-5xl md:text-7xl mb-10 text-[#0f1130] leading-[0.95] font-black uppercase tracking-tight">Expert Repairs.<br />Reliable Maintenance.</h2>
              <p className="text-lg text-[#0f1130]/60 mb-10 max-w-2xl leading-relaxed font-medium">
                SEATEK provides comprehensive repair and maintenance services to keep your equipment, vessels, and installations operating at peak performance.
              </p>
              
              <ul className="space-y-6 mb-14">
                {[
                  'Emergency repair response for marine and commercial operations',
                  'Scheduled maintenance programs and service contracts',
                  'Technical diagnostics and condition assessments',
                  'Refurbishment and restoration services'
                ].map((item) => (
                  <li key={item} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-3 h-3 bg-brand-accent shrink-0 rounded-none"></div>
                    <span className="text-[#0f1130] font-bold uppercase text-[11px] tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#" className="inline-flex items-center gap-3 text-[#0f1130] font-black group uppercase text-[11px] tracking-widest border-b-4 border-brand-accent pb-2 hover:bg-brand-accent transition-all px-2">
                View Repair Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HAVN Section */}
      <section id="havn" className="py-32 bg-[#0d0f28] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-accent text-[#0f1130] text-[10px] font-black uppercase tracking-[0.2em] mb-10 mx-auto">
              <Box size={14} /> Product Division
            </div>
            <h2 className="text-5xl md:text-7xl mb-10 text-white font-black uppercase tracking-tight">Introducing HAVN</h2>
            <p className="text-lg text-white/40 leading-relaxed font-medium">
              HAVN is our dedicated product sub-brand, offering fixed marine-related products designed for durability and performance in demanding environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {havnProducts.map((product, idx) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 p-1 flex flex-col border border-white/5 group hover:border-brand-accent/50 transition-all duration-700"
              >
                <div className="aspect-[4/5] overflow-hidden mb-8">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-10 pb-12">
                  <h3 className="text-3xl mb-6 text-brand-accent font-black uppercase tracking-tight">{product.title}</h3>
                  <p className="text-white/40 mb-6 leading-relaxed font-medium">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="primary" className="uppercase px-14 py-5 text-xs font-black tracking-widest mx-auto">
              Browse HAVN Catalogue <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f4f6f8] text-[#0f1130]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-[#0f1130]/10">
                <Target size={12} /> Trusted Partner
              </div>
              <h2 className="text-5xl md:text-7xl mb-10 text-[#0f1130] leading-[0.95] font-black uppercase tracking-tight">Built on Experience.<br />Driven by Excellence.</h2>
              <p className="text-lg text-[#0f1130]/60 mb-8 leading-relaxed font-medium">
                SEATEK brings together skilled craftspeople, modern workshop facilities, and a commitment to quality that spans marine, hospitality, and commercial sectors.
              </p>
              <p className="text-lg text-[#0f1130]/60 leading-relaxed font-medium mb-10">
                As part of a wider technical ecosystem, we collaborate with designers, operators, and industry partners to deliver solutions that work in real-world conditions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] bg-gray-100 shadow-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Workshop" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#f8fafc] border-y border-[#0f1130]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {[
              { label: 'Years Combined \nExperience', value: '25+' },
              { label: 'Projects \nCompleted', value: '500+' },
              { label: 'Core \nDisciplines', value: '3' },
              { label: 'Quality \nFocused', value: '100%' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-6xl md:text-8xl font-display font-black text-[#0f1130] mb-6">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#0f1130]/30 font-black whitespace-pre-line leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brand-accent">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl lg:text-[110px] mb-12 text-[#0f1130] leading-[0.85] font-black uppercase tracking-tight">Ready to Start<br />Your Project?</h2>
            <p className="text-xl text-[#0f1130]/70 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
              Whether you need repairs, custom fabrication, or product enquiries, our team is ready to deliver technical solutions that work.
            </p>
            <div className="flex flex-wrap gap-8 justify-center">
              <Button variant="dark" className="bg-[#0f1130] text-white px-14 py-6 uppercase text-xs tracking-widest font-black rounded-none">
                Contact SEATEK <ArrowRight size={20} />
              </Button>
              <Button variant="outline" className="!border-[#0f1130] !text-[#0f1130] hover:!bg-[#0f1130] hover:!text-white px-14 py-6 uppercase text-xs tracking-widest font-black border-2 bg-transparent rounded-none transition-all">
                View Past Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1130] text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-24">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-brand-accent flex items-center justify-center font-display font-bold text-[#0f1130] text-xl">S</div>
                <span className="text-3xl font-display font-bold tracking-[0.2em] uppercase text-brand-accent">Seatek</span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed mb-10 font-medium max-w-xs">
                Technical workshop and service provider for marine, hospitality, and commercial sectors.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-brand-accent">Services</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <li><a href="#" className="hover:text-white transition-colors">Repairs & Maintenance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fabric Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fiberglass Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Metal Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-brand-accent">Company</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <li><a href="#" className="hover:text-white transition-colors">About SEATEK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Past Projects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HAVN Catalogue</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-brand-accent">Contact</h4>
              <ul className="space-y-10 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
                <li className="flex gap-6 items-start">
                  <MapPin size={22} className="text-brand-accent shrink-0" />
                  <span className="leading-loose">123 Marine Industrial Park<br />Workshop Street<br />City, Country 12345</span>
                </li>
                <li className="flex gap-6 items-center">
                  <Phone size={20} className="text-brand-accent shrink-0" />
                  <span>+00 000 000 000</span>
                </li>
                <li className="flex gap-6 items-center">
                  <Mail size={18} className="text-brand-accent shrink-0" />
                  <span className="lowercase">info@seatek.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
            <p>© 2026 SEATEK. All rights reserved. Formerly Solar Impulse Workshop Division.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-10 right-10 z-[100] lg:hidden">
        <button className="w-20 h-20 bg-brand-accent text-[#0f1130] rounded-none shadow-2xl flex items-center justify-center group active:scale-90 transition-all">
           <Mail size={32} />
        </button>
      </div>
    </div>
  );
}
