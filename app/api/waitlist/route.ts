import admin from 'firebase-admin';

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Invalid email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save to Firestore
    await db.collection('waitlist').add({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Firebase Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}