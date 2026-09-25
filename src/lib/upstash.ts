// Upstash Redis REST API helper (server-side only)
// Vercel injects these variable names when connecting Upstash via marketplace

const UPSTASH_URL = process.env.KV_REST_API_URL || '';
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN || '';

async function redis(command: string[]): Promise<any> {
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  const json = await res.json();
  return json.result;
}

export async function redisGet(key: string): Promise<any> {
  const raw = await redis(['GET', key]);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return raw; }
}

export async function redisSet(key: string, value: any): Promise<void> {
  await redis(['SET', key, JSON.stringify(value)]);
}
