import { useEffect, useRef, useState } from 'react';
import { clamp, listenToScroll, smoothStep } from './motion.js';

const scenes = [
  { at: 0, label: 'Bhubaneswar · Odisha', title: 'The Mango Tree', tagline: 'Eat beneath the canopy' },
  { at: .23, label: 'Come closer', title: <>Where Nature<br /><em>Meets Flavour.</em></> },
  { at: .45, label: 'A little escape', title: <>Step away<br />from the city.</>, alignment: 'hero-left' },
  { at: .67, label: 'Stay awhile', title: <>Good food.<br />Calm vibes.<br /><em>Open skies.</em></>, alignment: 'hero-right' },
  { at: .90, label: 'Open daily · 11 AM–10 PM', title: <>Your table<br /><em>is waiting.</em></>, invitation: true },
];
const fadeLength = .105;

function fadeAt(progress, at) {
  return smoothStep((progress - (at - fadeLength)) / fadeLength);
}

export function Hero({ onReserve }) {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const sceneRefs = useRef([]);
  const [activeScene, setActiveScene] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    return listenToScroll(reducedMotion => {
      const distance = Math.max(1, hero.offsetHeight - stage.offsetHeight);
      const progress = clamp(-hero.getBoundingClientRect().top / distance);
      const weights = scenes.map((scene, index) => {
        const next = scenes[index + 1];
        const fadeIn = index === 0 ? 1 : fadeAt(progress, scene.at);
        const fadeOut = next ? 1 - fadeAt(progress, next.at) : 1;
        return Math.min(fadeIn, fadeOut);
      });
      const current = weights.indexOf(Math.max(...weights));
      const hintOpacity = 1 - smoothStep(progress / .09);
      setActiveScene(current);
      setShowHint(hintOpacity >= .1);

      // Write animation values directly on each frame. React manages the scene
      // that is interactive and accessible, so it need not redraw every frame.
      for (const [index, element] of sceneRefs.current.entries()) {
        const weight = weights[index];
        element.style.setProperty('--scene-opacity', reducedMotion ? Number(index === current) : weight.toFixed(3));
        element.style.setProperty('--scene-offset', reducedMotion ? '0px' : `${(1 - weight) * 18}px`);
      }
      stage.style.setProperty('--hint', hintOpacity.toFixed(3));
      stage.style.setProperty('--progress', progress.toFixed(4));
      stage.style.setProperty('--scale', reducedMotion ? 1 : (1 + progress * .19).toFixed(4));
      stage.style.setProperty('--night', smoothStep((progress - .59) / .29).toFixed(3));
    });
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef} aria-label="The Mango Tree introduction">
      <span className="hero-waypoint" id="come-closer" aria-hidden="true" />
      <div className="hero-stage" ref={stageRef}>
        <div className="hero-backdrop" aria-hidden="true">
          <img id="hero-day" src="./assets/canopy-day.webp" alt="" fetchPriority="high" width="1460" height="830" />
          <img id="hero-night" src="./assets/canopy-night.webp" alt="" width="1323" height="750" />
        </div>
        <div className="hero-vignette" />
        {scenes.map((scene, index) => {
          const current = index === activeScene;
          const classes = ['hero-scene', scene.alignment, current && 'is-current'].filter(Boolean).join(' ');
          return (
            <div key={scene.label} className={classes} id={scene.invitation ? 'hero-invitation' : undefined}
              ref={element => { sceneRefs.current[index] = element; }} inert={!current} aria-hidden={!current}>
              <p className="eyebrow">{scene.label}</p>
              {index === 0 ? <h1>{scene.title}</h1> : <p className="hero-title">{scene.title}</p>}
              {scene.tagline && <p className="hero-tagline">{scene.tagline}</p>}
              {scene.invitation && (
                <div className="hero-actions">
                  <button className="button button-gold" type="button" onClick={() => onReserve()}>
                    Reserve a table <span className="arrow" aria-hidden="true">→</span>
                  </button>
                  <a className="button button-ghost" href="#flavours">Explore the menu</a>
                </div>
              )}
            </div>
          );
        })}
        <a className="scroll-hint" href="#come-closer" tabIndex={showHint ? 0 : -1} aria-hidden={!showHint}>
          Scroll to enter <span aria-hidden="true">↓</span>
        </a>
        <div className="hero-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
