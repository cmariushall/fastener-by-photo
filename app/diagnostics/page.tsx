'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Diagnostics() {
  const [ping, setPing] = useState('checking...');
  const [echo, setEcho] = useState('idle');

  useEffect(() => {
    fetch('/api/ping')
      .then(r => r.json())
      .then(d => setPing(d.ok ? 'healthy' : 'unhealthy'))
      .catch(() => setPing('unreachable'));
  }, []);

  const doEcho = async () => {
    setEcho('posting…');
    const r = await fetch('/api/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hello: 'world' }),
    });
    const data = await r.json();
    setEcho(JSON.stringify(data));
  };

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <h1>Diagnostics</h1>
      <p>API health: <strong>{ping}</strong></p>
      <button onClick={doEcho} style={{ padding: '8px 12px', marginTop: 12 }}>POST /api/echo</button>
      <pre style={{ background:'#f6f6f6', padding:12, marginTop:12, overflow:'auto' }}>{echo}</pre>
      <p style={{marginTop:24}}><Link href="/">← Back to Home</Link></p>
    </main>
  );
}
