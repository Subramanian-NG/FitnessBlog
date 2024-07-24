import { NextResponse } from 'next/server';
import clientPromise from '../../utils/dbconnect';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Fitness-Blog');
    const subscribersCollection = db.collection('subscribers');

    // Check if email already exists
    const existingSubscriber = await subscribersCollection.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    // Insert the email into the database
    await subscribersCollection.insertOne({ email });

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
