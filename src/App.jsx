import { useEffect, useRef, useState } from 'react';
import { Hero } from './Hero.jsx';
import { Story, Experience, Flavours, Celebrate, Visit, Footer } from './Sections.jsx';
import { Reservation } from './Reservation.jsx';
import { listenToScroll, clamp } from './motion.js';

const links = [
  ['story', 'Story'],
  ['flavours', 'Flavours'],
  ['experience', 'Experience'],
  ['celebrate', 'Celebrate'],
  ['visit', 'Visit'],
];

function Header({ headerRef, scrolled, activeSection, menuOpen, setMenuOpen, onReserve }) {
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current.focus();
      }
    }
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen, setMenuOpen]);

  const headerClass = ['site-header', scrolled && 'scrolled', menuOpen && 'menu-open'].filter(Boolean).join(' ');
  return (
    <header ref={headerRef} className={headerClass} id="header">
      <a className="brand" href="#top" aria-label="The Mango Tree home" onClick={() => setMenuOpen(false)}>
        <span className="monogram" aria-hidden="true">M</span>The Mango Tree
      </a>
      <nav className="site-nav" id="navigation" aria-label="Main navigation">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={id === activeSection ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="button button-header" type="button" onClick={() => onReserve()}>Reserve a table</button>
        <button ref={toggleRef} className="nav-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(open => !open)}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [nav, setNav] = useState({ scrolled: false, activeSection: null });
  const mainRef = useRef(null);
  const headerRef = useRef(null);
  const celebrationRef = useRef(null);

  useEffect(() => {
    // A direct section link can arrive before React has rendered its target.
    const target = document.getElementById(window.location.hash.slice(1));
    if (target && window.scrollY === 0) {
      target.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const sections = [...mainRef.current.querySelectorAll(':scope > section[id]')];
    const celebration = celebrationRef.current;
    const header = headerRef.current;
    return listenToScroll(reducedMotion => {
      const scrolled = window.scrollY > 25;
      const cutoff = Math.max(header.offsetHeight + 30, window.innerHeight * .25);
      const activeSection = sections.findLast(section => section.getBoundingClientRect().top < cutoff)?.id ?? null;
      setNav(previous => previous.scrolled === scrolled && previous.activeSection === activeSection
        ? previous : { scrolled, activeSection });

      const bounds = celebration.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        const progress = clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height));
        celebration.style.setProperty('--celebrate-shift', reducedMotion ? '0px' : `${(progress - .5) * 27}px`);
      }
    });
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    document.body.classList.add('with-motion');
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.classList.add('visible');
        observer.unobserve(target);
      }
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => {
      document.body.classList.remove('with-motion');
      observer.disconnect();
    };
  }, []);

  function openReservation(kind = 'table') {
    setMenuOpen(false);
    setReservation(kind);
  }

  return (
    <>
      <a className="skip-link" href="#story">Skip to the story</a>
      <Header headerRef={headerRef} {...nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onReserve={openReservation} />
      <main id="top" ref={mainRef}>
        <Hero onReserve={openReservation} />
        <Story />
        <Experience />
        <Flavours />
        <Celebrate onReserve={openReservation} sectionRef={celebrationRef} />
        <Visit onReserve={openReservation} />
      </main>
      <Footer onReserve={openReservation} />
      <Reservation kind={reservation} onClose={() => setReservation(null)} />
    </>
  );
}
