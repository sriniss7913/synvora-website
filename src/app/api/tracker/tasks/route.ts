import { NextRequest, NextResponse } from 'next/server';
import { redisGet, redisSet } from '@/lib/upstash';

const KEY = 'synvora:tracker:tasks';

export async function GET() {
  const data = await redisGet(KEY);
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const task = await req.json();
  const existing: any[] = (await redisGet(KEY)) || [];
  const updated = [...existing.filter((t: any) => t.id !== task.id), task];
  await redisSet(KEY, updated);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const existing: any[] = (await redisGet(KEY)) || [];
  const updated = existing.filter((t: any) => t.id !== id);
  await redisSet(KEY, updated);
  return NextResponse.json({ ok: true });
}
