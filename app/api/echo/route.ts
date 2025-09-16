export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return new Response(JSON.stringify({ ok: true, youSent: body, at: Date.now() }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'parse error';
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
}
