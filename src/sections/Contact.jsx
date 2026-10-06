import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Send } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { isSupabaseConfigured, supabase } from '../lib/supabase.js';
import { profile } from '../data/portfolio.js';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || form.message.trim().length < 12) {
      toast.error('Add your name, a valid email, and a longer message.');
      return;
    }
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('contact_messages').insert(form);
        if (error) throw error;
      } else {
        console.info('Supabase not configured. Contact payload:', form);
      }
      toast.success(isSupabaseConfigured ? 'Message sent to Supabase.' : 'Message validated. Configure Supabase to store it.');
      setForm(initialForm);
    } catch (error) {
      toast.error(error.message || 'Message failed. Check Supabase settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Contact" title="Let’s build something precise, fast, and memorable." text="The form is Supabase-ready and gracefully validates locally when environment variables are not configured yet." />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-cyanGlow/12 text-cyanGlow shadow-glow">
              <Mail size={25} />
            </div>
            <h3 className="mt-8 text-3xl font-black text-white">Open channel</h3>
            <p className="mt-4 leading-8 text-slate-300">Send a note about product design, frontend systems, animation, or a role where craft matters.</p>
            <a className="mt-8 inline-flex text-cyanGlow hover:text-white" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="mt-8 flex gap-3">
              {profile.socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/8 text-white/76 transition hover:border-cyanGlow/70 hover:text-cyanGlow" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl md:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-white/80">Name<input name="name" value={form.name} onChange={updateField} className="rounded-lg border border-white/10 bg-ink/55 px-4 py-3 text-white outline-none transition focus:border-cyanGlow" placeholder="Your name" /></label>
              <label className="grid gap-2 text-sm font-semibold text-white/80">Email<input name="email" value={form.email} onChange={updateField} className="rounded-lg border border-white/10 bg-ink/55 px-4 py-3 text-white outline-none transition focus:border-cyanGlow" placeholder="you@example.com" /></label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-white/80">Subject<input name="subject" value={form.subject} onChange={updateField} className="rounded-lg border border-white/10 bg-ink/55 px-4 py-3 text-white outline-none transition focus:border-cyanGlow" placeholder="Project, role, or collaboration" /></label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-white/80">Message<textarea name="message" value={form.message} onChange={updateField} rows="6" className="resize-none rounded-lg border border-white/10 bg-ink/55 px-4 py-3 text-white outline-none transition focus:border-cyanGlow" placeholder="Tell me what you are building..." /></label>
            <div className="mt-6">
              <MagneticButton as="button" type="submit" disabled={loading} className="w-full bg-cyanGlow text-ink shadow-glow disabled:cursor-not-allowed disabled:opacity-60 md:w-auto">
                {loading ? 'Sending...' : 'Send Message'} <Send size={17} />
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
