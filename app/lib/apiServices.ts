// lib/apiService.ts

const API_BASE_URL = '/api/posts';

export async function fetchPosts() {
  const response = await fetch(API_BASE_URL);
  return response.json();
}

export async function fetchPost(id: number) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
}

export async function createPost(post: { title: string, content: string }) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return response.json();
}

export async function updatePost(id: number, post: { title?: string, content?: string }) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return response.json();
}

export async function deletePost(id: number) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}
