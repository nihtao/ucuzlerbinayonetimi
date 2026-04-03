import { NextResponse } from 'next/server';

// Bu rota henüz kullanılmıyor. İleride haber oluşturma için kullanılabilir.
export async function POST() {
  return NextResponse.json({ success: false, message: 'Bu endpoint henüz aktif değil.' }, { status: 501 });
}
