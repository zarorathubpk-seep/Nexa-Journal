import React from 'react';
import { AUTHORS } from '../../data/authors.ts';
import { ShieldCheck, Award, BookOpen, Users, Compass, Mail } from 'lucide-react';

interface AboutPageProps {
  onNavigateContact: () => void;
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateContact,
  onNavigateHome,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
          <BookOpen className="w-4 h-4" />
          <span>About NexaJournal</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-4">
          Rigorous Technology Journalism for the Digital Citizen
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-2xl">
          NexaJournal was founded to cut through marketing hyperbole and provide objective, tested guidance on personal computing, online privacy, and cognitive productivity.
        </p>
      </div>

      {/* Editorial Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
            Independent Testing
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We test software, browser extensions, and operating system configurations on actual hardware. We never accept payment to inflate reviews or alter editorial verdicts.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
            No Hallucinated Data
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every statistic, citation, and security guideline in our publications is grounded in primary research, RFC specifications, and reproducible documentation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
            Pragmatic Privacy
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We advocate for practical threat modeling. We equip readers with actionable steps that protect their data rights without requiring them to abandon modern computing.
          </p>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="my-16">
        <div className="flex items-center gap-2 pb-3 mb-8 border-b border-slate-200 dark:border-slate-800">
          <Users className="w-5 h-5 text-indigo-600" />
          <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
            Editorial Masthead
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(AUTHORS).map((author) => (
            <div
              key={author.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex gap-4"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  {author.name}
                </h3>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                  {author.role}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Standards & Fact-Checking */}
      <section className="my-14 p-8 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
        <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white mb-4">
          Editorial & Corrections Policy
        </h2>
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Accuracy is paramount to our publication. If an article contains a factual error or if a software update fundamentally changes a feature described in our guides, our editorial team promptly updates the text with an explicit revision timestamp.
          </p>
          <p>
            Readers who identify an inaccuracy or who wish to suggest an editorial revision can submit inquiries directly via our{' '}
            <button
              onClick={onNavigateContact}
              className="text-indigo-600 dark:text-indigo-400 font-medium underline"
            >
              Contact Department
            </button>.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="p-8 rounded-2xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-serif font-bold text-xl mb-1">
            Have a story pitch or research tip?
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Our editors welcome inquiries from researchers, software engineers, and digital rights advocates.
          </p>
        </div>
        <button
          onClick={onNavigateContact}
          className="px-6 py-3 rounded-xl bg-white text-indigo-900 font-semibold text-xs whitespace-nowrap hover:bg-indigo-50 transition-colors shrink-0 shadow-md flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          <span>Get in Touch</span>
        </button>
      </div>
    </div>
  );
};
