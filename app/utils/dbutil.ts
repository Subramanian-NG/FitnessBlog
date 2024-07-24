// utils/posts.ts

import clientPromise from './dbconnect';

import { MongoClient, ObjectId } from 'mongodb';

export async function getAllPosts() {
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    return await db.collection('posts').find({}).toArray();
}

export async function getAllLatestPosts() {
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    //return await db.collection('posts').find({}).sort({ createdAt: -1 }).toArray();
    return await db.collection('posts').find({})
        .sort({ time: -1, _id: 1 })  // Sort by time descending and _id ascending for consistent order
        .toArray();
}

export async function getPostById(postId: string) {
    //console.log('fetch for--',postId);
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    return await db.collection('posts').findOne({ _id: new ObjectId(postId) });
}

export async function createPost(postData: any) {
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    const result = await db.collection('posts').insertOne(postData);
    return result;
}

export async function updatePost(postId: string, postData: any) {
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    const result = await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: postData });
    return result.modifiedCount > 0;
}

export async function deletePost(postId: string) {
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(postId) });
    return result.deletedCount > 0;
}

export async function getAllCategories(){
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    const result = await db.collection('categories').find({}).toArray();
    return result;
}

export async function getAllPostsForUser(email : string|null){
    const client = await clientPromise;
    const db = client.db("Fitness-Blog");
    const result = await db.collection('posts').find({ owner_id: email }).toArray();
    return result;
}

export async function createUser(postData: any){
    const client = await clientPromise;
    console.log(postData)
    const db = client.db("Fitness-Blog");
    const existingUser = await db.collection('users').findOne({ email: postData.email });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const result = await db.collection('users').insertOne(postData);
  console.log(result)
  return result;
}

