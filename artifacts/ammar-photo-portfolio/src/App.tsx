import { useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Facebook,
  Gamepad2,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Network,
  Send,
  ServerCog,
  ShoppingBag,
  Workflow,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

const channels = [
  { name: 'WhatsApp', note: 'Sales, support, routing', icon: MessageCircle },
  { name: 'Instagram DMs', note: 'Social conversations', icon: Instagram },
  { name: 'Messenger', note: 'Meta customer journeys', icon: Facebook },
  { name: 'Telegram', note: 'Bots and notifications', icon: Send },
  { name: 'Discord', note: 'Community workflows', icon: Gamepad2 },
  { name: 'Web chat', note: 'Embedded experiences', icon: Globe2 },
];

const toolkit = [
  'n8n',
  'AWS EC2',
  'Meta Cloud API',
  'Chatwoot',
  'Baserow',
  'Shopify',
  'GPT models',
  'WAHA',
  'Gemini',
  'Docker',
  'React',
  'Full-stack web',
];

const processSteps = [
  {
    number: '01',
    title: 'Map the conversation',
    description: 'Start with the customer journey, not the model. I map intents, edge cases, product questions and the moments that need a human.',
    output: 'A clear conversation map',
  },
  {
    number: '02',
    title: 'Connect the source of truth',
    description: 'Catalogs, CRM records, orders and support history become useful context. The agent is grounded in the information your team already trusts.',
    output: 'Connected business data',
  },
  {
    number: '03',
    title: 'Build the workflow',
    description: 'Automations handle qualification, routing, notifications and follow-up. Each path has a useful next step instead of a dead-end reply.',
    output: 'A working agent pipeline',
  },
  {
    number: '04',
    title: 'Design the handoff',
    description: 'When a conversation gets nuanced, the system moves it to a person with context intact. The customer never has to repeat the whole story.',
    output: 'Human-ready escalation',
  },
  {
    number: '05',
    title: 'Ship the experience',
    description: 'I test the awkward questions, polish the interface and document how the system works so your team can own it after launch.',
    output: 'A client-ready build',
  },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Work', '#work'],
    ['Process', '#process'],
    ['Channels', '#channels'],
    ['About', '#about'],
  ];
  const close = () => setOpen(false);

  return (
    <header className="sticky left-0 right-0 top-0 z-30 border-b border-[hsl(var(--border)/.85)] bg-[hsl(var(--background)/.88)] px-5 backdrop-blur-md md:px-10" data-testid="site-header">
      <div className="mx-auto flex h-[4.65rem] max-w-[1240px] items-center justify-between">
        <a href="#top" onClick={close} className="group flex items-center gap-3" data-testid="link-home">
          <span className="grid h-8 w-8 place-items-center bg-[hsl(var(--foreground))] font-mono text-xs text-[hsl(var(--background))] transition-colors group-hover:bg-[hsl(var(--primary))]">A/</span>
          <span>
            <span className="block display text-[1.1rem] font-semibold tracking-[-.04em]">Ammar</span>
            <span className="mono hidden text-[.54rem] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))] sm:block">AI systems / Pakistan</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a className="nav-link" href={href} key={href} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>
          ))}
          <a className="button-primary ml-2 min-h-0 px-4 py-2.5" href="#contact" data-testid="link-nav-contact">Let's talk <ArrowUpRight size={13} /></a>
        </nav>
        <button className="grid h-10 w-10 place-items-center border border-[hsl(var(--border))] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
          {open ? <X size={17} strokeWidth={1.6} /> : <Menu size={17} strokeWidth={1.6} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu mx-auto max-w-[1240px] border-t border-[hsl(var(--border))] py-4 md:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a className="flex items-center justify-between border-b border-[hsl(var(--border)/.65)] px-1 py-4 mono text-[.65rem] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]" href={href} onClick={close} key={href} data-testid={`link-mobile-${label.toLowerCase()}`}>
              {label}<ChevronRight size={14} />
            </a>
          ))}
          <a className="button-primary mt-4 w-full" href="#contact" onClick={close} data-testid="link-mobile-contact">Let's talk <ArrowUpRight size={13} /></a>
        </nav>
      )}
    </header>
  );
}

function AgentVisual() {
  return (
    <div className="agent-visual reveal reveal-delay-2 min-h-[360px] md:min-h-[470px]" data-testid="agent-visual">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-4 py-3">
        <span className="mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">agent / live map</span>
        <span className="flex items-center gap-2 mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--primary))]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--primary))]" /> active</span>
      </div>
      <div className="relative h-[306px] md:h-[416px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 416" fill="none" aria-hidden="true">
          <path className="node-line" d="M106 102 C198 102 198 188 282 188" />
          <path className="node-line" d="M106 314 C196 314 198 228 282 228" />
          <path className="node-line-strong" d="M318 188 C402 188 398 103 493 103" />
          <path className="node-line-strong" d="M318 228 C401 228 400 313 493 313" />
          <path className="node-line" d="M300 207 L300 337" />
          <circle className="signal-dot" cx="106" cy="102" r="6" fill="hsl(11 69% 61%)" />
          <circle className="signal-dot" cx="106" cy="314" r="6" fill="hsl(158 27% 31%)" style={{ animationDelay: '.8s' }} />
          <circle cx="300" cy="208" r="37" fill="hsl(158 27% 31%)" />
          <circle cx="300" cy="208" r="44" stroke="hsl(158 27% 31% / .18)" />
          <circle className="signal-dot" cx="493" cy="103" r="6" fill="hsl(158 27% 31%)" style={{ animationDelay: '1.3s' }} />
          <circle className="signal-dot" cx="493" cy="313" r="6" fill="hsl(11 69% 61%)" style={{ animationDelay: '1.8s' }} />
        </svg>
        <div className="absolute left-[9%] top-[19%] flex items-center gap-2 border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2">
          <MessageCircle size={14} className="text-[hsl(var(--accent))]" /><span className="mono text-[.58rem] uppercase">WhatsApp</span>
        </div>
        <div className="absolute left-[9%] top-[70%] flex items-center gap-2 border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2">
          <ShoppingBag size={14} className="text-[hsl(var(--primary))]" /><span className="mono text-[.58rem] uppercase">catalogue</span>
        </div>
        <div className="absolute left-1/2 top-[44%] flex h-[74px] w-[74px] -translate-x-1/2 flex-col items-center justify-center gap-1 text-[hsl(var(--primary-foreground))]">
          <Bot size={20} strokeWidth={1.5} /><span className="mono text-[.5rem] uppercase tracking-[.1em]">agent</span>
        </div>
        <div className="absolute right-[8%] top-[19%] flex items-center gap-2 border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2">
          <ServerCog size={14} className="text-[hsl(var(--primary))]" /><span className="mono text-[.58rem] uppercase">CRM</span>
        </div>
        <div className="absolute right-[8%] top-[70%] flex items-center gap-2 border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2">
          <Network size={14} className="text-[hsl(var(--accent))]" /><span className="mono text-[.58rem] uppercase">handoff</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[hsl(var(--border))] px-4 py-3">
        <span className="mono text-[.57rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">message → context → action</span>
        <span className="mono text-[.57rem] text-[hsl(var(--muted-foreground))]">v.01</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-grid relative border-b border-[hsl(var(--border))] px-5 pb-14 pt-20 md:px-10 md:pb-20 md:pt-28" data-testid="section-hero">
      <div className="mx-auto grid max-w-[1240px] items-end gap-14 md:grid-cols-[1.02fr_.98fr] md:gap-12">
        <div className="reveal">
          <div className="mb-8 flex flex-wrap gap-2">
            {['Chatbot developer', 'AI agent builder', 'Full-stack engineer'].map((tag) => <span className="tag bg-[hsl(var(--card)/.65)]" key={tag}>{tag}</span>)}
          </div>
          <h1 className="display max-w-[700px] text-[clamp(4rem,9.4vw,8.8rem)] font-semibold leading-[.84] tracking-[-.075em]">
            Conversations<br /><span className="text-[hsl(var(--primary))]">that do</span> the work.
          </h1>
          <p className="mt-9 max-w-[31rem] text-[1.02rem] leading-[1.7] text-[hsl(var(--muted-foreground))] md:text-[1.1rem]">
            I build practical AI agents for sales, support and lead routing — across WhatsApp, Instagram, Messenger, Telegram, Discord and the web.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a className="button-primary" href="#work" data-testid="link-hero-work">See selected builds <ArrowDown size={14} /></a>
            <a className="button-secondary" href="#contact" data-testid="link-hero-contact">Start a project <ArrowUpRight size={14} /></a>
          </div>
          <div className="mt-12 flex items-center gap-3 mono text-[.6rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" /> Based in Pakistan <span className="text-[hsl(var(--border))]">/</span> working worldwide
          </div>
        </div>
        <AgentVisual />
      </div>
      <div className="mx-auto mt-20 max-w-[1240px] border-t border-[hsl(var(--border))] pt-4 md:mt-28">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <span className="mono text-[.59rem] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">One builder / many entry points</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mono text-[.59rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
            {channels.map((channel, index) => <span key={channel.name}><span className="mr-2 text-[hsl(var(--accent))]">0{index + 1}</span>{channel.name}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36" data-testid="section-intro">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <span className="eyebrow">The short version</span>
          <p className="mono mt-8 max-w-[16rem] text-[.63rem] uppercase leading-[1.8] tracking-[.11em] text-[hsl(var(--muted-foreground))]">01 / useful automation<br />02 / grounded answers<br />03 / human when it matters</p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <h2 className="display max-w-[760px] text-[clamp(2.8rem,5.6vw,5.7rem)] font-semibold leading-[.91] tracking-[-.06em]">The best agent is not the one that talks the most. It is the one that <span className="text-[hsl(var(--primary))]">moves work forward.</span></h2>
          <p className="mt-9 max-w-[590px] text-[1rem] leading-[1.75] text-[hsl(var(--muted-foreground))]">Ammar works at the intersection of conversational design, automation and frontend craft. Every build is shaped around a real business flow: answer the product question, capture the lead, update the record, bring in a person.</p>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.55)] px-5 py-24 md:px-10 md:py-36" data-testid="section-work">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 flex flex-col justify-between gap-7 md:mb-20 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Selected builds</span>
            <h2 className="display mt-6 text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[.83] tracking-[-.07em]">Systems<br /><span className="text-[hsl(var(--primary))]">in motion.</span></h2>
          </div>
          <p className="max-w-[20rem] text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">Real workflows, real constraints, and enough detail for a client to understand how the pieces fit.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-[1.2fr_.8fr]">
          <article className="work-card overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8" data-testid="card-work-regal">
            <div className="flex items-center justify-between gap-4">
              <span className="work-number">01 / CASE STUDY</span>
              <span className="tag border-[hsl(var(--primary)/.3)] bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">Live workflow</span>
            </div>
            <div className="mt-16 max-w-[610px] md:mt-24">
              <div className="mb-4 flex items-center gap-3 text-[hsl(var(--primary))]"><ShoppingBag size={18} strokeWidth={1.5} /><span className="mono text-[.6rem] uppercase tracking-[.13em]">Regal Furnitures</span></div>
              <h3 className="display text-[clamp(2.3rem,4.2vw,4.3rem)] font-semibold leading-[.9] tracking-[-.06em]">A WhatsApp sales agent with a catalogue brain.</h3>
              <p className="mt-6 max-w-[520px] text-[.96rem] leading-[1.7] text-[hsl(var(--muted-foreground))]">A conversational storefront that answers product questions, reads a Shopify feed, captures intent and routes the right conversations to the Regal team.</p>
            </div>
            <div className="mt-12 grid gap-7 border-t border-[hsl(var(--border))] pt-5 md:grid-cols-3">
              <div><span className="mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--accent))]">Stack</span><p className="mt-2 text-sm leading-[1.6]">n8n · AWS EC2 · Meta Cloud API · GPT</p></div>
              <div><span className="mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--accent))]">Context</span><p className="mt-2 text-sm leading-[1.6]">Shopify product feed · Baserow CRM</p></div>
              <div><span className="mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--accent))]">Handoff</span><p className="mt-2 text-sm leading-[1.6]">Chatwoot shared inbox for the team</p></div>
            </div>
          </article>
          <article className="work-card border border-[hsl(var(--border))] bg-[hsl(var(--foreground))] p-6 text-[hsl(var(--background))] md:p-8" data-testid="card-work-personal">
            <div className="flex items-center justify-between gap-4">
              <span className="work-number">02 / FIELD TEST</span>
              <span className="tag border-[hsl(var(--background)/.3)] bg-transparent text-[hsl(var(--background)/.7)]">Personal build</span>
            </div>
            <div className="mt-20">
              <div className="mb-4 flex items-center gap-3 text-[hsl(var(--accent))]"><Bot size={18} strokeWidth={1.5} /><span className="mono text-[.6rem] uppercase tracking-[.13em]">Private WhatsApp agent</span></div>
              <h3 className="display text-[clamp(2.2rem,3.8vw,3.8rem)] font-semibold leading-[.91] tracking-[-.06em]">A local agent built to learn by shipping.</h3>
              <p className="mt-6 text-[.95rem] leading-[1.72] text-[hsl(var(--background)/.68)]">WAHA, Gemini, Docker and local n8n come together in a hands-on environment for testing memory, tools and the feel of a useful reply.</p>
            </div>
            <div className="mt-12 border-t border-[hsl(var(--background)/.22)] pt-5">
              <span className="mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--accent))]">Why it matters</span>
              <p className="mt-2 text-sm leading-[1.65] text-[hsl(var(--background)/.7)]">The fastest way to build better agents is to use the channel yourself and notice every awkward moment.</p>
            </div>
          </article>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {['Lead qualification', 'Product discovery', 'Support triage', 'Human handoff', 'CRM updates', 'Full-stack interfaces'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];
  return (
    <section id="process" className="px-5 py-24 md:px-10 md:py-36" data-testid="section-process">
      <div className="mx-auto grid max-w-[1240px] gap-14 md:grid-cols-[.72fr_1.28fr] md:gap-20">
        <div>
          <span className="eyebrow">How I build</span>
          <h2 className="display mt-6 text-[clamp(3.2rem,6vw,6rem)] font-semibold leading-[.85] tracking-[-.07em]">From first<br /><span className="text-[hsl(var(--accent))]">message</span><br />to momentum.</h2>
          <p className="mt-8 max-w-[300px] text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">A practical process for turning a messy brief into a dependable conversational system.</p>
        </div>
        <div>
          <div className="grid border-t border-[hsl(var(--border))] md:grid-cols-5">
            {processSteps.map((item, index) => (
              <button className="step-button border-b border-[hsl(var(--border))] px-3 py-4 text-left md:border-b-0 md:border-r md:py-5" data-active={active === index} onClick={() => setActive(index)} key={item.number} data-testid={`button-process-${item.number}`}>
                <span className="mono text-[.58rem] uppercase tracking-[.12em] opacity-60">{item.number}</span>
                <span className="mt-5 block text-xs font-semibold leading-[1.25]">{item.title}</span>
              </button>
            ))}
          </div>
          <div className="mt-10 min-h-[225px] border border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.48)] p-6 md:p-8" data-testid="process-detail">
            <div className="flex items-start justify-between gap-6">
              <span className="mono text-[.6rem] uppercase tracking-[.13em] text-[hsl(var(--accent))]">Step {step.number}</span>
              <Workflow size={22} strokeWidth={1.2} className="text-[hsl(var(--primary))]" />
            </div>
            <h3 className="display mt-8 text-3xl font-semibold tracking-[-.04em]">{step.title}</h3>
            <p className="mt-4 max-w-[560px] text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">{step.description}</p>
            <div className="mt-7 flex items-center gap-2 mono text-[.58rem] uppercase tracking-[.12em] text-[hsl(var(--primary))]"><Check size={13} /> {step.output}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Channels() {
  return (
    <section id="channels" className="border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.55)] px-5 py-24 md:px-10 md:py-36" data-testid="section-channels">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-20">
          <div>
            <span className="eyebrow">Where agents meet people</span>
            <h2 className="display mt-6 text-[clamp(3.2rem,6vw,6rem)] font-semibold leading-[.85] tracking-[-.07em]">One logic.<br /><span className="text-[hsl(var(--primary))]">Every channel.</span></h2>
          </div>
          <div>
            <p className="max-w-[600px] text-[1.05rem] leading-[1.75] text-[hsl(var(--muted-foreground))]">The channel changes the texture of the conversation. The thinking stays grounded: give the agent context, a useful action and a safe exit.</p>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return <div className="channel-card border border-[hsl(var(--border))] bg-[hsl(var(--background)/.55)] p-4 md:p-5" key={channel.name} data-testid={`card-channel-${channel.name.toLowerCase().replaceAll(' ', '-')}`}>
                  <Icon size={19} strokeWidth={1.4} className="text-[hsl(var(--primary))]" />
                  <h3 className="mt-8 text-sm font-semibold">{channel.name}</h3>
                  <p className="mt-1 text-xs leading-[1.5] text-[hsl(var(--muted-foreground))]">{channel.note}</p>
                </div>;
              })}
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-[hsl(var(--border))] pt-5 md:mt-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <span className="eyebrow">Tools I reach for</span>
            <div className="flex max-w-[800px] flex-wrap gap-2">
              {toolkit.map((item) => <span className="tag bg-[hsl(var(--background)/.7)]" key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-36" data-testid="section-about">
      <div className="mx-auto grid max-w-[1240px] gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <span className="eyebrow">About Ammar</span>
          <div className="mt-12 flex items-center gap-3 mono text-[.6rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" /> Pakistan / GMT +5</div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <h2 className="display text-[clamp(2.8rem,5.5vw,5.4rem)] font-semibold leading-[.9] tracking-[-.06em]">I build the layer between a business and the people trying to reach it.</h2>
          <div className="mt-10 grid gap-8 border-t border-[hsl(var(--border))] pt-5 text-sm leading-[1.75] text-[hsl(var(--muted-foreground))] md:grid-cols-2 md:gap-12">
            <p>My work spans agent logic, automation, product data and the interfaces around them. I care about the quiet details: the right answer, the right record, the right moment to ask a person for help.</p>
            <p>Alongside conversational systems, I build full-stack web experiences that make complex services feel clear. I am available for focused builds, ongoing iterations and teams who want a thoughtful technical partner.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              ['01', 'Agent architecture', Bot],
              ['02', 'Automation systems', Workflow],
              ['03', 'Frontend craft', Code2],
            ].map(([number, label, Icon]) => {
              const FeatureIcon = Icon as typeof Bot;
              return <div className="border border-[hsl(var(--border))] p-4" key={label as string}><FeatureIcon size={17} className="text-[hsl(var(--primary))]" strokeWidth={1.4} /><span className="mt-8 block mono text-[.59rem] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{number as string}</span><span className="mt-2 block text-sm font-semibold">{label as string}</span></div>;
            })}
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
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${data.get('name') ?? 'a new client'}`);
    const body = encodeURIComponent(`${data.get('message') ?? ''}\n\nReply to: ${data.get('email') ?? ''}`);
    setSent(true);
    window.location.href = `mailto:syedammarabbas9349@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="border-t border-[hsl(var(--border))] px-5 py-24 md:px-10 md:py-36" data-testid="section-contact">
      <div className="mx-auto grid max-w-[1240px] gap-14 md:grid-cols-[.85fr_1.15fr] md:gap-20">
        <div>
          <span className="eyebrow">Have a useful problem?</span>
          <h2 className="display mt-7 text-[clamp(4rem,8vw,8rem)] font-semibold leading-[.8] tracking-[-.08em]">Let's make<br /><span className="text-[hsl(var(--accent))]">it work.</span></h2>
          <p className="mt-9 max-w-[300px] text-sm leading-[1.75] text-[hsl(var(--muted-foreground))]">Tell me what your customers are asking, where the work gets stuck, or what you want to ship next.</p>
          <a className="mt-8 inline-flex items-center gap-3 border-b border-[hsl(var(--foreground))] pb-2 text-sm" href="mailto:syedammarabbas9349@gmail.com" data-testid="link-email"><Mail size={15} strokeWidth={1.4} /> syedammarabbas9349@gmail.com</a>
        </div>
        <div>
          {sent ? (
            <div className="border-t border-[hsl(var(--foreground))] pt-5" data-testid="status-message-sent">
              <span className="eyebrow">Email draft opened</span>
              <h3 className="display mt-7 text-4xl font-semibold leading-[.95] tracking-[-.05em]">Your message is ready to send.</h3>
              <p className="mt-5 max-w-[430px] text-sm leading-[1.7] text-[hsl(var(--muted-foreground))]">If your email app did not open, write directly to the address on the left.</p>
              <button className="button-secondary mt-8" onClick={() => setSent(false)} data-testid="button-send-another">Send another <ArrowRight size={14} /></button>
            </div>
          ) : (
            <form className="border-t border-[hsl(var(--foreground))] pt-1" onSubmit={handleSubmit} data-testid="contact-form">
              <label className="block pt-5"><span className="mono text-[.58rem] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">Your name</span><input required className="contact-input" name="name" placeholder="How should I call you?" data-testid="input-name" /></label>
              <label className="block pt-8"><span className="mono text-[.58rem] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">Email</span><input required type="email" className="contact-input" name="email" placeholder="you@company.com" data-testid="input-email" /></label>
              <label className="block pt-8"><span className="mono text-[.58rem] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">What are you building?</span><textarea required rows={3} className="contact-input resize-none" name="message" placeholder="A WhatsApp sales agent, a support flow, a web experience..." data-testid="input-message" /></label>
              <button type="submit" className="button-primary mt-10" data-testid="button-send-message">Open email draft <ArrowUpRight size={14} /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] px-5 py-8 md:px-10" data-testid="site-footer">
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-7 md:flex-row md:items-center">
        <div className="flex items-center gap-3"><span className="mono text-[.62rem] text-[hsl(var(--primary))]">A/</span><span className="mono text-[.58rem] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">Ammar / AI agents + web experiences</span></div>
        <div className="flex flex-wrap items-center gap-6">
          <a className="nav-link flex items-center gap-2" href="https://github.com/syedammarabbas9349" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={14} /> GitHub</a>
          <a className="nav-link flex items-center gap-2" href="https://www.linkedin.com/in/syed-ammar-abbas-a34372337" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={14} /> LinkedIn</a>
          <a className="nav-link flex items-center gap-2" href="https://www.fiverr.com/ammarabbas9349/build-ai-powered-whatsapp-chatbot-for-customer-support" target="_blank" rel="noreferrer" data-testid="link-fiverr"><ExternalLink size={13} /> Fiverr</a>
          <span className="mono text-[.58rem] text-[hsl(var(--muted-foreground))]">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="site-shell min-h-[100dvh] bg-[hsl(var(--background))]" data-testid="portfolio-page">
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Process />
        <Channels />
        <About />
        <Contact />
      </main>
      <Footer />
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
  return <main className="grid min-h-[100dvh] place-items-center p-8"><div><span className="eyebrow">404 / Not found</span><h1 className="display mt-6 text-7xl font-semibold tracking-[-.06em]">Wrong endpoint.</h1><a className="button-primary mt-10" href="/" data-testid="link-back-home">Back home <ArrowRight size={14} /></a></div></main>;
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