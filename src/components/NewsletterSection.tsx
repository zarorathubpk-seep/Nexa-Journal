import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // Persist in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('nexajournal_subscribers') || '[]');
      if (!existing.includes(cleanEmail)) {
        existing.push(cleanEmail);
        localStorage.setItem('nexajournal_subscribers', JSON.stringify(existing));
      }
    } catch {
      // ignore
    }

    setStatus('success');
    setMessage('Thank you for subscribing to NexaJournal Dispatch. Check your inbox on Friday.');
    setEmail('');
  };

  return (
    <section className="my-16 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
      {/* Background aesthetic grid / glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex p-3 rounded-xl bg-white/10 text-indigo-300 mb-4 backdrop-blur-xs">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
          The Weekly NexaJournal Dispatch
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Every Friday morning, our editors send a curated breakdown of privacy updates, emerging AI tooling, and high-impact digital workflows. Zero spam.
        </p>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 flex items-center justify-center gap-2.5 text-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm whitespace-nowrap transition-colors shadow-md"
              >
                Subscribe
              </button>
            </div>

            {status === 'error' && (
              <p className="text-rose-400 text-xs mt-1.5">{message}</p>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4">
              <Shield className="w-3.5 h-3.5" />
              <span>We respect your inbox. Unsubscribe anytime with 1 click.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
