import { db } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  
  try {
    const doc = await db.collection('profiles').doc(id).get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Firestore fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  
  try {
    const profileData = {
      full_name: body.full_name,
      email: body.email,
      bio: body.bio,
      updated_at: new Date().toISOString()
    };

    await db.collection('profiles').doc(id).set(profileData, { merge: true });
    
    return NextResponse.json({ id, ...profileData });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
