import React, { useEffect, useState } from 'react';

const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);

  useEffect(() => {
    const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    // This example assumes you have a function to fetch blogs by their IDs
    fetchBlogsByIds(bookmarkedIds).then(blogs => {
      setSavedBlogs(blogs);
    });
  }, []);

  return (
    <div>
      {savedBlogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedBlogs;

// Mock function to simulate fetching blogs by IDs
async function fetchBlogsByIds(ids) {
  // This should be replaced with your actual API call
  return ids.map(id => ({
    id,
    title: `Blog Title ${id}`,
    content: `Content for blog ${id}`
  }));
}
