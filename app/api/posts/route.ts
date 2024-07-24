// import { NextResponse } from 'next/server';

// const posts = [
//   { id: 1, title: 'Post 1', content: 'This is the full content of post 1...', category: 'category1' },
//   { id: 2, title: 'Post 2', content: 'This is the full content of post 2...', category: 'category2' },
//   { id: 3, title: 'Post 3', content: 'This is the full content of post 3...', category: 'category3' },
//   { id: 4, title: 'Post 4', content: 'This is the full content of post 4...', category: 'category1' },
//   { id: 5, title: 'Post 5', content: 'This is the full content of post 5...', category: 'category2' },
//   { id: 6, title: 'Post 6', content: 'This is the full content of post 6...', category: 'category3' },
// ];

// export async function GET() {
//   return NextResponse.json(posts);
// }

import { NextResponse } from 'next/server';
import clientPromise from '../../utils/dbconnect';
import { sendEmail } from '../../utils/sendMail';

let posts = [
  { id: 1, title: 'Post 1', content: 'This is the full content of post 1...', category: 'category1' },
  { id: 2, title: 'Post 2', content: 'This is the full content of post 2...', category: 'category2' },
  { id: 3, title: 'Post 3', content: 'This is the full content of post 3...', category: 'category3' },
  { id: 4, title: 'Post 4', content: 'This is the full content of post 4...', category: 'category1' },
  { id: 5, title: 'Post 5', content: 'This is the full content of post 5...', category: 'category2' },
  { id: 6, title: 'Post 6', content: 'This is the full content of post 6...', category: 'category3' },
];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const { title, content, category } = await req.json();

  if (!title || !content || !category) {
    return NextResponse.json({ error: 'Title, content, and category are required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Fitness-Blog');
    const postsCollection = db.collection('posts');
    const subscribersCollection = db.collection('subscribers');

    // Insert the new post into the database
    const newPost = { title, content, category, createdAt: new Date() };
    await postsCollection.insertOne(newPost);

    // Get all subscribers
    const subscribers = await subscribersCollection.find().toArray();

    // Send email to all subscribers
    for (const subscriber of subscribers) {
      await sendEmail(
        subscriber.email,
        'New Post Published',
        `A new post titled "${title}" has been published. Check it out!`
      );
    }

    // Add the new post to the in-memory posts array (for demo purposes)
    posts.push({ id: posts.length + 1, title, content, category });

    return NextResponse.json({ message: 'Post created and notifications sent' }, { status: 201 });
  } catch (error) {
    console.error('Error creating post or sending notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

