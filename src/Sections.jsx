import { directionsUrl, instagramUrl } from "./links.js";

export function Story() {
  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="wrap">
        <p className="eyebrow section-index">01 · Our story</p>
        <div className="story-layout">
          <div data-reveal="">
            <p className="eyebrow">An open-air pause</p>
            <h2 className="display" id="story-title">A table beneath<br />the <em>trees.</em></h2>
          </div>
          <div className="story-copy" data-reveal="">
            <p className="story-lead">A calm corner of Bhubaneswar for unhurried meals, open-air conversations and evenings that stay with you.</p>
            <p>Here, the mango tree is more than a view. It sets the pace—cool shade by day, golden light by evening, and a gentle reason to linger.</p>
            <a className="text-link" href="#experience">Discover the experience <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <figure className="after-sunset" data-reveal="">
          <img src="./assets/canopy-night.webp" alt="Lanterns light tables beneath the mango tree after dark" width="1323" height="750" loading="lazy" />
          <figcaption className="eyebrow"><span>After sunset</span><span>Patharagadia · Bhubaneswar</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <div className="experience-top" data-reveal="">
          <p className="eyebrow section-index">02 · The experience</p>
          <h2 className="display" id="experience-title">Come for the food.<br /><em>Stay for the feeling.</em></h2>
        </div>
        <ol className="experience-list" data-reveal="">
          <li><span className="item-index">01</span><h3>Beneath the canopy</h3><p>A table in the shade, a breeze through the leaves, and nowhere else you need to be.</p><span aria-hidden="true" className="sparkle">✧</span></li>
          <li><span className="item-index">02</span><h3>Slow afternoons</h3><p>Come for a long lunch. Stay while the light changes and the city slips away.</p><span aria-hidden="true" className="sparkle">✧</span></li>
          <li><span className="item-index">03</span><h3>Golden evenings</h3><p>Warm lanterns, open skies and conversations that are never rushed.</p><span aria-hidden="true" className="sparkle">✧</span></li>
        </ol>
      </div>
    </section>
  );
}

export function Flavours() {
  return (
    <section className="section flavours" id="flavours" aria-labelledby="flavours-title">
      <div className="wrap">
        <div className="flavours-layout">
          <div data-reveal="">
            <p className="eyebrow section-index">03 · From the kitchen</p>
            <p className="eyebrow">Freshly prepared</p>
            <h2 className="display" id="flavours-title">Flavours<br />made<br />for <em>sharing.</em></h2>
            <p className="lead">A relaxed table calls for generous plates, chilled drinks and something sweet before you leave.</p>
            <a className="button button-green" href={instagramUrl} target="_blank" rel="noopener noreferrer">See today’s menu <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          <figure className="food-photo" data-reveal=""><img src="./assets/table-spread.webp" alt="Plates for sharing and chilled drinks on an open-air table" width="693" height="761" loading="lazy" /></figure>
        </div>
        <div className="flavour-list" data-reveal="">
          <article><p className="eyebrow">To begin</p><h3>Fresh plates</h3><p>Bright, generous and made for sharing.</p></article>
          <article><p className="eyebrow">To linger</p><h3>Slow lunches</h3><p>Comforting favourites for an unhurried table.</p></article>
          <article><p className="eyebrow">To toast</p><h3>Sunset sips</h3><p>Cool drinks for warm Bhubaneswar evenings.</p></article>
        </div>
      </div>
    </section>
  );
}

export function Celebrate({ onReserve, sectionRef }) {
  return (
    <section ref={sectionRef} className="celebrate" id="celebrate" aria-labelledby="celebrate-title">
      <img className="celebrate-photo" src="./assets/canopy-day.webp" width="1460" height="830" alt="" loading="lazy" />
      <div className="celebrate-shade"></div>
      <div className="wrap celebrate-content" data-reveal="">
        <p className="eyebrow">Your moments, naturally</p>
        <h2 className="display" id="celebrate-title">Celebrate under<br />the <em>mango tree.</em></h2>
        <p className="lead">Birthdays, anniversaries and intimate gatherings feel different beneath an open sky.</p>
        <button className="button button-gold" type="button" onClick={() => onReserve("celebration")}>Plan a celebration <span className="arrow" aria-hidden="true">→</span></button>
      </div>
    </section>
  );
}

export function Visit({ onReserve }) {
  return (
    <section className="section visit" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit-layout">
        <div data-reveal="">
          <p className="eyebrow section-index">04 · Visit</p>
          <p className="eyebrow">Find your way here</p>
          <h2 className="display" id="visit-title">Leave the<br />rush<br /><em>at the gate.</em></h2>
          <dl className="visit-details">
            <div><span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span><dt className="eyebrow">Find us</dt><dd>Patharagadia, Bhubaneswar</dd></div>
            <div><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6h5"/></svg></span><dt className="eyebrow">Opening hours</dt><dd>Open daily · 11 AM–10 PM</dd></div>
            <div><span aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="9" cy="7" r="3"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2m0-17a3 3 0 0 1 0 6m3 4a5 5 0 0 1 3 5v2"/></svg></span><dt className="eyebrow">Reservations</dt><dd><button className="inline-button" type="button" onClick={() => onReserve()}>Plan your table before you arrive</button></dd></div>
          </dl>
          <div className="visit-actions"><a className="button button-green" href={directionsUrl} target="_blank" rel="noopener noreferrer">Get directions <span className="arrow" aria-hidden="true">→</span></a><a className="button button-outline" href={instagramUrl} target="_blank" rel="noopener noreferrer"><span className="at" aria-hidden="true">@</span> Instagram</a></div>
        </div>
        <div className="map-card" data-reveal="">
          <div className="map-grid" aria-hidden="true"></div><div className="rings" aria-hidden="true"></div>
          <div className="map-content">
            <div className="map-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></div>
            <h3>Patharagadia</h3><p>Bhubaneswar · Odisha</p>
            <a className="text-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">Open in maps <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onReserve }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-call" data-reveal=""><h2 className="display">Come for the flavour.<br /><em>Stay for the feeling.</em></h2><button className="button button-gold" type="button" onClick={() => onReserve()}>Reserve a table <span className="arrow" aria-hidden="true">→</span></button></div>
        <div className="footer-base">
          <a className="brand" href="#top"><span className="monogram" aria-hidden="true">M</span>The Mango Tree</a>
          <div><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a><a href={directionsUrl} target="_blank" rel="noopener noreferrer">Directions</a></div>
          <div><span>© 2026 The Mango Tree</span><span>Website by Logisaar Technology Pvt. Ltd.</span></div>
        </div>
      </div>
    </footer>
  );
}
