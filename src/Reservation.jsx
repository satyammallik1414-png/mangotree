import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { instagramMessageUrl } from './links.js';

const timeZone = 'Asia/Kolkata';
const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
});

function todayInBhubaneswar() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const part = name => parts.find(item => item.type === name).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function formatRequest(fields) {
  const date = dateFormatter.format(new Date(`${fields.get('date')}T12:00:00+05:30`));
  const [hours, minutes] = fields.get('time').split(':').map(Number);
  const time = `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}`;
  const note = fields.get('note').trim();
  return [
    'Hi The Mango Tree! I’d like to request a table.',
    '',
    `Name: ${fields.get('name').trim()}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Guests: ${Number(fields.get('guests'))}`,
    ...(note ? [`Note: ${note}`] : []),
    '',
    'Could you please confirm availability? Thank you!',
  ].join('\n');
}

export function Reservation({ kind, onClose }) {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const [note, setNote] = useState('');
  const [request, setRequest] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!kind || dialog.open) return;
    if (kind === 'celebration') {
      setNote(previous => previous || 'I’d like to plan a celebration. ');
    }
    dialog.showModal();
    nameRef.current.focus();
    document.body.classList.add('modal-open');
  }, [kind]);

  useEffect(() => () => document.body.classList.remove('modal-open'), []);

  useLayoutEffect(() => {
    if (request) messageRef.current.focus();
  }, [request]);

  function close() {
    dialogRef.current.close();
  }

  function handleClose() {
    document.body.classList.remove('modal-open');
    onClose();
  }

  function dismissOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) close();
  }

  function prepareRequest(event) {
    event.preventDefault();
    setCopyStatus('');
    setRequest({ text: formatRequest(new FormData(event.currentTarget)) });
  }

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(request.text);
      setCopyStatus('Request copied. Open Instagram and paste it in a message.');
    } catch {
      messageRef.current.focus();
      messageRef.current.select();
      setCopyStatus('Copy the selected request, then paste it in an Instagram message.');
    }
  }

  return (
    <dialog id="reservation" aria-labelledby="reservation-title" className="reservation" ref={dialogRef}
      onClose={handleClose} onClick={dismissOnBackdrop}>
      <button className="dialog-close" type="button" aria-label="Close visit planner" onClick={close}>×</button>
      <p className="eyebrow">A table beneath the trees</p>
      <h2 id="reservation-title">Plan your visit</h2>
      <p className="form-help">Add your details, then copy the request and send it to the café on Instagram.</p>
      <form id="reservation-form" onSubmit={prepareRequest}>
        <label className="full">Your name<input ref={nameRef} id="guest-name" name="name" autoComplete="name" placeholder="Name" required maxLength={100} /></label>
        <label>Date<input id="reservation-date" name="date" type="date" min={todayInBhubaneswar()} required /></label>
        <label>Time<input name="time" type="time" required /></label>
        <label className="full">Number of guests<input name="guests" type="number" min="1" max="100" placeholder="2" required /></label>
        <label className="full">A note for the team<textarea id="reservation-note" name="note" rows={3} maxLength={500}
          placeholder="Celebration, seating preference…" value={note} onChange={event => setNote(event.target.value)} /></label>
        <button className="button button-green full" type="submit">
          <svg className="copy-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="8" y="8" width="13" height="13" rx="2" />
            <path d="M16 4.5V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5" />
          </svg> Prepare reservation request
        </button>
      </form>
      {request && (
        <div className="request" id="request">
          <label htmlFor="reservation-message">Your reservation request</label>
          <textarea id="reservation-message" ref={messageRef} rows={6} value={request.text} readOnly />
          <button className="button button-green" id="copy-request" type="button" onClick={copyRequest}>Copy request</button>
          <p id="copy-status" role="status">{copyStatus}</p>
          <p className="form-help">A table is confirmed when the café replies.</p>
        </div>
      )}
      <a className="instagram-direct" href={instagramMessageUrl} target="_blank" rel="noopener noreferrer">
        <span className="at" aria-hidden="true">@</span> Message @themangotree.bbsr
      </a>
    </dialog>
  );
}
