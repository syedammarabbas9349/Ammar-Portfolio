import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Camera, Instagram, Mail, Menu, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

type Photo = {
  id: string;
  title: string;
  place: string;
  year: string;
  orientation: string;
  src: string;
  alt: string;
};

// Replace these Unsplash URLs with Ammar's own image URLs when the final edit is ready.
const photos: Photo[] = [
  {
    id: 'lahore-morning',
    title: 'Before the city wakes',
    place: 'Lahore, Pakistan',
    year: '2023',
    orientation: 'portrait',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
    alt: 'A quiet street with a person walking through morning light',
  },
  {
    id: 'salt-range',
    title: 'The long way home',
    place: 'Salt Range',
    year: '2022',
    orientation: 'landscape',
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80',
    alt: 'A mountain landscape with a road moving into the distance',
  },
  {
    id: 'hands',
    title: 'Working hands',
    place: 'Rawalpindi, Pakistan',
    year: '2024',
    orientation: 'portrait',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hands of a craftsperson working with a tool',
  },
  {
    id: 'monsoon-window',
    title: 'After the monsoon',
    place: 'Islamabad, Pakistan',
    year: '2023',
    orientation: 'landscape',
    src: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Rain on a window overlooking a soft landscape',
  },
  {
    id: 'one-chair',
    title: 'One chair, afternoon',
    place: 'Karachi, Pakistan',
    year: '2024',
    orientation: 'portrait',
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    alt: 'A solitary chair in a stark room with hard afternoon light',
  },
  {
    id: 'coastline',
    title: 'Where the land gives way',
    place: 'Gwadar, Pakistan',
    year: '2022',
    orientation: 'landscape',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    alt: 'A quiet coastline seen from above',
  },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Selected work', '#work'],
    ['About', '#about'],
    ['Contact', '#contact'],
  ];
  const close = () => setOpen(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-20 px-6 py-6 md:px-10 md:py-8" data-testid="site-header">
      <div className="mx-auto flex max-w-[1440px] items-start justify-between">
        <a href="#top" onClick={close} className="group" data-testid="link-home">
          <span className="block text-[1.08rem] font-medium tracking-[-.05em]">AMMAR</span>
          <span className="mono mt-1 block text-[.58rem] uppercase tracking-[.22em] text-[hsl(var(--muted-foreground))]">Photographer / Pakistan</span>
        </a>
        <nav className="hidden items-center gap-8 pt-1 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a className="nav-link" href={href} key={href} data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
          ))}
        </nav>
        <button
          className="grid h-10 w-10 place-items-center border border-[hsl(var(--border))] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu mx-auto mt-5 max-w-[1440px] border-y border-[hsl(var(--border))] bg-[hsl(var(--background))] py-5 md:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a className="block px-1 py-3 font-mono text-xs uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]" href={href} onClick={close} key={href} data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero({ onWorkClick }: { onWorkClick: () => void }) {
  return (
    <section id="top" className="relative flex min-h-[720px] items-end border-b border-[hsl(var(--border))] px-6 pb-12 pt-36 md:min-h-[860px] md:px-10 md:pb-16" data-testid="section-hero">
      <div className="pointer-events-none absolute right-[7%] top-[18%] hidden h-px w-[17vw] bg-[hsl(var(--border))] md:block" />
      <div className="pointer-events-none absolute right-[7%] top-[18%] hidden translate-x-1/2 -translate-y-1/2 font-mono text-[.58rem] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))] md:block">31° 32' N / 74° 21' E</div>
      <div className="mx-auto grid w-full max-w-[1440px] gap-14 md:grid-cols-[1.05fr_.95fr] md:items-end md:gap-10">
        <div className="reveal">
          <span className="eyebrow">A visual practice by Ammar</span>
          <h1 className="display mt-7 max-w-[760px] text-[clamp(4.25rem,11vw,10.5rem)] leading-[.8] tracking-[-.065em]">
            The quiet<br /><em>between</em> things.
          </h1>
          <div className="mt-10 flex max-w-md items-start justify-between gap-8 md:mt-14">
            <p className="max-w-[18rem] text-sm leading-[1.65] text-[hsl(var(--muted-foreground))]">
              Black-and-white photographs of people, places, and the small evidence of a life in motion.
            </p>
            <button className="group flex shrink-0 flex-col items-center gap-3 pt-1" onClick={onWorkClick} aria-label="Scroll to selected work" data-testid="button-scroll-work">
              <span className="mono text-[.58rem] uppercase tracking-[.16em] [writing-mode:vertical-rl]">View work</span>
              <ArrowDown size={15} strokeWidth={1.2} className="transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative ml-auto w-full max-w-[560px] md:mb-1">
          <div className="image-frame aspect-[.82] md:aspect-[.78]">
            <img src={photos[0].src} alt={photos[0].alt} />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
            <span>01 — First light</span><span>Lahore, 2023</span>
          </div>
          <div className="absolute -bottom-10 -left-4 hidden font-serif text-6xl italic text-[hsl(var(--accent))] md:block">A</div>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 font-mono text-[.55rem] uppercase tracking-[.2em] text-[hsl(var(--muted-foreground))] md:block">Scroll to enter</div>
    </section>
  );
}

function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section id="work" className="px-6 py-28 md:px-10 md:py-40" data-testid="section-work">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 flex flex-col justify-between gap-7 md:mb-20 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Selected work / 2022—24</span>
            <h2 className="display mt-5 text-[clamp(3.4rem,7vw,7rem)] leading-[.84] tracking-[-.055em]">Things I<br /><em>notice.</em></h2>
          </div>
          <p className="max-w-[18rem] text-sm leading-[1.65] text-[hsl(var(--muted-foreground))] md:pb-1">A growing archive of gestures, weather, and the shape of everyday life across Pakistan.</p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-y-24">
          {photos.slice(1).map((photo, index) => (
            <figure className={`gallery-card md:col-span-5 ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-8 md:mt-36'}`} key={photo.id} data-testid={`card-photo-${photo.id}`}>
              <button onClick={() => onOpen(index + 1)} aria-label={`Open ${photo.title}`} data-testid={`button-open-${photo.id}`}>
                <div className={`image-frame ${photo.orientation === 'portrait' ? 'aspect-[.78]' : 'aspect-[1.28]'}`}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <figcaption className="gallery-caption flex justify-between gap-4 py-3.5">
                  <span className="text-sm">{photo.title}</span>
                  <span className="mono text-[.58rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{photo.place} / {photo.year}</span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
        <div className="mt-20 flex items-center gap-4 md:mt-28">
          <span className="h-px w-16 bg-[hsl(var(--foreground))]" />
          <span className="mono text-[.6rem] uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">More work in progress</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-6 py-24 md:px-10 md:py-36" data-testid="section-about">
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <span className="eyebrow">About Ammar</span>
          <div className="mt-12 hidden h-[1px] w-full bg-[hsl(var(--border))] md:block" />
          <p className="mono mt-5 text-[.6rem] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">Lahore — Islamabad — Anywhere the light is good</p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="display text-[clamp(2.65rem,5.4vw,5.7rem)] leading-[.93] tracking-[-.045em]">I make pictures for the <em>unhurried.</em></p>
          <div className="mt-12 grid gap-10 text-sm leading-[1.75] text-[hsl(var(--muted-foreground))] md:mt-16 md:grid-cols-2 md:gap-14">
            <p>I am Ammar, a photographer based in Pakistan. I am drawn to the pause before a thing happens: a worker looking out of frame, a room changing with the afternoon, the last light on a road home.</p>
            <p>My work moves between editorial portraiture, quiet documentary, and places that ask to be looked at twice. Available for commissions, collaborations, and conversations about making something honest.</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[hsl(var(--border))] pt-5 md:mt-16">
            {['Portraits', 'Editorial', 'Documentary', 'Places'].map((item) => <span key={item} className="mono text-[.6rem] uppercase tracking-[.14em]">{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-40" data-testid="section-contact">
      <div className="mx-auto grid max-w-[1440px] gap-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <span className="eyebrow">Start a conversation</span>
          <h2 className="display mt-7 text-[clamp(4rem,8vw,8rem)] leading-[.8] tracking-[-.06em]">Say<br /><em>hello.</em></h2>
          <p className="mt-10 max-w-[20rem] text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">Have a story, a commission, or a place I should see? I would like to hear about it.</p>
          <a href="mailto:hello@ammar.photo" className="mt-8 inline-flex items-center gap-3 border-b border-[hsl(var(--foreground))] pb-2 text-sm" data-testid="link-email"><Mail size={15} strokeWidth={1.4} /> hello@ammar.photo</a>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          {sent ? (
            <div className="border-t border-[hsl(var(--foreground))] pt-5" data-testid="status-message-sent">
              <span className="eyebrow">Message received</span>
              <p className="display mt-7 text-4xl leading-[.95]">Thank you. I will be in touch soon.</p>
              <button className="outline-button mt-10" onClick={() => setSent(false)} data-testid="button-send-another">Send another <ArrowRight size={14} /></button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-t border-[hsl(var(--foreground))] pt-1" data-testid="contact-form">
              <label className="block pt-5">
                <span className="mono text-[.58rem] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Your name</span>
                <input required className="contact-input" name="name" placeholder="How should I call you?" data-testid="input-name" />
              </label>
              <label className="block pt-8">
                <span className="mono text-[.58rem] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">Email</span>
                <input required type="email" className="contact-input" name="email" placeholder="you@example.com" data-testid="input-email" />
              </label>
              <label className="block pt-8">
                <span className="mono text-[.58rem] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))]">A few words</span>
                <textarea required rows={3} className="contact-input resize-none" name="message" placeholder="Tell me what you are thinking about..." data-testid="input-message" />
              </label>
              <button type="submit" className="outline-button mt-10" data-testid="button-send-message">Send message <ArrowUpRight size={14} /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] px-6 py-8 md:px-10" data-testid="site-footer">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-7 md:flex-row md:items-center">
        <div className="flex items-center gap-3"><Camera size={16} strokeWidth={1.2} /><span className="mono text-[.58rem] uppercase tracking-[.14em]">Ammar / Photography</span></div>
        <div className="flex items-center gap-7">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="nav-link flex items-center gap-2" data-testid="link-instagram"><Instagram size={14} strokeWidth={1.4} /> Instagram</a>
          <span className="mono text-[.58rem] text-[hsl(var(--muted-foreground))]">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

function Lightbox({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (index: number) => void }) {
  const photo = photos[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((index + 1) % photos.length);
      if (event.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, onChange, onClose]);

  return (
    <div className="lightbox-backdrop p-6" role="dialog" aria-modal="true" aria-label={`${photo.title}, image ${index + 1} of ${photos.length}`} ref={dialogRef} tabIndex={-1} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid="lightbox">
      <button className="lightbox-control absolute right-6 top-6" onClick={onClose} aria-label="Close image viewer" data-testid="button-close-lightbox"><X size={17} /></button>
      <button className="lightbox-control absolute left-5 top-1/2 -translate-y-1/2 md:left-10" onClick={() => onChange((index - 1 + photos.length) % photos.length)} aria-label="Previous image" data-testid="button-previous-image"><ArrowLeft size={17} /></button>
      <div className="flex flex-col items-center gap-5">
        <img className="lightbox-image" src={photo.src} alt={photo.alt} />
        <div className="flex w-full max-w-[min(80vw,62rem)] justify-between gap-8 text-[#efede8]">
          <div><p className="text-sm">{photo.title}</p><p className="mono mt-1 text-[.58rem] uppercase tracking-[.13em] text-[#aaa7a0]">{photo.place} / {photo.year}</p></div>
          <span className="mono pt-1 text-[.58rem] text-[#aaa7a0]">{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
        </div>
      </div>
      <button className="lightbox-control absolute right-5 top-1/2 -translate-y-1/2 md:right-10" onClick={() => onChange((index + 1) % photos.length)} aria-label="Next image" data-testid="button-next-image"><ArrowRight size={17} /></button>
    </div>
  );
}

function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollToWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="site-shell min-h-[100dvh] bg-[hsl(var(--background))]" data-testid="portfolio-page">
      <div className="grain" />
      <Nav />
      <main>
        <Hero onWorkClick={scrollToWork} />
        <Gallery onOpen={setLightboxIndex} />
        <About />
        <Contact />
      </main>
      <Footer />
      {lightboxIndex !== null && <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function NotFound() {
  return <main className="grid min-h-[100dvh] place-items-center p-8"><div><span className="eyebrow">404 / Not found</span><h1 className="display mt-6 text-7xl">Lost frame.</h1><a href="/" className="outline-button mt-10" data-testid="link-back-home">Back home</a></div></main>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;