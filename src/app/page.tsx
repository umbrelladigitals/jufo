'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Mail, 
  Building2, 
  X,
  Globe
} from 'lucide-react';

export default function JufoHomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [b2bModalOpen, setB2bModalOpen] = useState(false);
  const [b2bSubmitting, setB2bSubmitting] = useState(false);
  const [b2bSuccess, setB2bSuccess] = useState(false);
  const [logoExists, setLogoExists] = useState(false);

  // B2B Form State
  const [b2bForm, setB2bForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    note: ''
  });

  // Countdown timer calculation (Target: 30 days from launch)
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    // Check if logo image exists in public directory
    const img = new Image();
    img.src = '/logo.png';
    img.onload = () => setLogoExists(true);
    img.onerror = () => {
      const svg = new Image();
      svg.src = '/logo.svg';
      svg.onload = () => setLogoExists(true);
    };

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    const newInquiry = {
      id: `jufo_sub_${Date.now()}`,
      name: 'Lansman Abonesi',
      email: email,
      brand: 'Jufo',
      subject: 'Jufo Lansman Ön Kayıt',
      message: 'Jufo markası için erken erişim lansman haber bülteni abonesi.',
      date: new Date().toLocaleString('tr-TR'),
      status: 'pending'
    };

    // 1. LocalStorage Sync
    try {
      const existing = localStorage.getItem('sn_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInquiry);
      localStorage.setItem('sn_inquiries', JSON.stringify(list));
    } catch (e) {
      console.warn("LocalStorage save error", e);
    }

    // 2. API Call
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    try {
      await fetch(`${apiURL}/api/v1/brands/jufo/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newInquiry.name,
          email: newInquiry.email,
          subject: newInquiry.subject,
          message: newInquiry.message
        })
      });
    } catch (err) {
      console.warn("API logging fallback to local state", err);
    } finally {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setB2bSubmitting(true);

    const newInquiry = {
      id: `jufo_b2b_${Date.now()}`,
      name: `${b2bForm.contactName} (${b2bForm.companyName})`,
      email: b2bForm.email,
      brand: 'Jufo',
      subject: `Jufo B2B Bayilik Talebi - ${b2bForm.city}`,
      message: `Firma: ${b2bForm.companyName}\nTelefon: ${b2bForm.phone}\nŞehir: ${b2bForm.city}\nNot: ${b2bForm.note}`,
      date: new Date().toLocaleString('tr-TR'),
      status: 'pending'
    };

    // 1. LocalStorage Sync
    try {
      const existing = localStorage.getItem('sn_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInquiry);
      localStorage.setItem('sn_inquiries', JSON.stringify(list));
    } catch (e) {
      console.warn("LocalStorage save error", e);
    }

    // 2. API Call
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    try {
      await fetch(`${apiURL}/api/v1/brands/jufo/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newInquiry.name,
          email: newInquiry.email,
          subject: newInquiry.subject,
          message: newInquiry.message
        })
      });
    } catch (err) {
      console.warn("API logging fallback to local state", err);
    } finally {
      setB2bSubmitting(false);
      setB2bSuccess(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[160px]" />
        <div className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo_jufo.svg" alt="JUFO Logo" className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setB2bModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-display font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 cursor-pointer flex items-center gap-2"
          >
            <Building2 size={14} />
            <span>B2B & Bayilik Talebi</span>
          </button>
        </div>
      </header>

      {/* Main Showcase Hero */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex-grow flex flex-col items-center justify-center text-center space-y-10">
        
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-purple-300 text-xs font-mono uppercase tracking-widest"
        >
          <Sparkles size={14} className="text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>YENİLİKÇİ VE LEZZETLİ GIDA ÜRÜNLERİ</span>
        </motion.div>

        {/* LOGO SHOWCASE (Clean Floating Vector) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-lg mx-auto flex items-center justify-center py-4"
        >
          <img 
            src="/logo_jufo.svg" 
            alt="JUFO Main Logo" 
            className="h-28 sm:h-36 md:h-44 w-auto object-contain filter drop-shadow-[0_0_35px_rgba(236,72,153,0.55)] hover:scale-105 transition-transform duration-300" 
          />
        </motion.div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 uppercase leading-none drop-shadow-lg"
          >
            ÇOK YAKINDA
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Yüksek kalite standartlarında hazırlanan yenilikçi gıda lezzetleri Jufo ile buluşuyor. Çok yakında raflarda ve sofralarınızda!
          </motion.p>
        </div>

        {/* Countdown Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl mx-auto"
        >
          {[
            { label: 'GÜN', val: timeLeft.days },
            { label: 'SAAT', val: timeLeft.hours },
            { label: 'DAKİKA', val: timeLeft.minutes },
            { label: 'SANİYE', val: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-500/40 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight font-mono">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-purple-300 font-bold uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Newsletter Registration Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-lg mx-auto"
        >
          {subscribed ? (
            <div className="p-6 rounded-2xl glass-card-accent border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-400">
              <CheckCircle2 size={22} />
              <span className="font-display font-bold text-sm">
                Harika! Lansman gününde ilk bilgi sana ulaşacak.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl glass-card border border-white/15 focus-within:border-purple-500/60 transition-all shadow-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresini yaz, ilk sen duy..."
                  required
                  className="flex-grow bg-transparent px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>HABERDAR ET!</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                * Spamsız, sadece büyük lansman gününde özel bildirim gönderilir.
              </p>
            </form>
          )}
        </motion.div>

        {/* Contact Email Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full max-w-xl mx-auto pt-8 border-t border-white/10"
        >
          <div className="glass-card p-6 rounded-2xl space-y-3 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 glow-purple">
              <Mail size={24} />
            </div>
            <h4 className="font-display font-bold text-lg text-white">İletişim & Danışma</h4>
            <p className="text-xs text-slate-300">
              Her türlü soru, görüş ve ön sipariş talepleriniz için bize ulaşın:
            </p>
            <a 
              href="mailto:info@jufo.com.tr" 
              className="inline-block font-mono font-bold text-sm text-pink-300 hover:text-pink-200 transition-colors pt-1"
            >
              info@jufo.com.tr
            </a>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-purple-400" />
          <span>© 2026 Jufo - Tüm Hakları Saklıdır.</span>
        </div>
        <div className="font-mono text-slate-400 text-center">
          <strong className="text-white">Jufo Quality Food Products</strong>
        </div>
      </footer>

      {/* B2B / Bayilik Modal */}
      <AnimatePresence>
        {b2bModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setB2bModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl glass-card-accent p-8 rounded-3xl border border-purple-500/30 text-left shadow-2xl z-10"
            >
              <button
                onClick={() => setB2bModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {b2bSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white uppercase">
                    Talebiniz Alındı!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    B2B ön başvuru talebiniz satış departmanımıza iletilmiştir. Lansman öncesi temsilcimiz sizinle bağlantıya geçecektir.
                  </p>
                  <button
                    onClick={() => {
                      setB2bModalOpen(false);
                      setB2bSuccess(false);
                    }}
                    className="px-6 py-3 bg-purple-600 text-white font-display font-bold text-xs uppercase rounded-xl"
                  >
                    KAPAT
                  </button>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
                      JUFO B2B & DİSTRİBÜTÖRLÜK TALEBİ
                    </span>
                    <h3 className="font-display font-black text-2xl text-white uppercase">
                      Bayilik ve Toplu Alım Başvurusu
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Firma / Kurum Adı *</label>
                      <input
                        type="text"
                        required
                        value={b2bForm.companyName}
                        onChange={(e) => setB2bForm({ ...b2bForm, companyName: e.target.value })}
                        placeholder="Örn. ABC Gıda A.Ş."
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Yetkili Adı Soyadı *</label>
                      <input
                        type="text"
                        required
                        value={b2bForm.contactName}
                        onChange={(e) => setB2bForm({ ...b2bForm, contactName: e.target.value })}
                        placeholder="Ad Soyad"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">E-posta Adresi *</label>
                      <input
                        type="email"
                        required
                        value={b2bForm.email}
                        onChange={(e) => setB2bForm({ ...b2bForm, email: e.target.value })}
                        placeholder="ornek@firma.com"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Telefon Numarası *</label>
                      <input
                        type="tel"
                        required
                        value={b2bForm.phone}
                        onChange={(e) => setB2bForm({ ...b2bForm, phone: e.target.value })}
                        placeholder="+90 (555) 000 00 00"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Şehir / Bölge *</label>
                    <input
                      type="text"
                      required
                      value={b2bForm.city}
                      onChange={(e) => setB2bForm({ ...b2bForm, city: e.target.value })}
                      placeholder="Örn. Ankara / İç Anadolu Bölgesi"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Not / Talebiniz</label>
                    <textarea
                      rows={3}
                      value={b2bForm.note}
                      onChange={(e) => setB2bForm({ ...b2bForm, note: e.target.value })}
                      placeholder="Tahmini koli/palet gereksinimi veya sorularınız..."
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={b2bSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {b2bSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>B2B TALEBİNİ İLET</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
