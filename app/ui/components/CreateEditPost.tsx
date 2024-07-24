import React, { useState, useEffect } from 'react';
import backgroundImage from '../../assets/image.jpg'; // Adjust the path if necessary

interface Post {
  _id?: string;
  owner_id?: string | null;
  title: string;
  content: string;
  category: string;
  time?: string | null;
}

interface CreateEditPostProps {
  existingPost?: Post;
  onSave: (post: Post) => void;
  resetKey: number; // Add resetKey prop
}

const CreateEditPost: React.FC<CreateEditPostProps> = ({ existingPost, onSave, resetKey }) => {
  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    category: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (existingPost) {
      setPost(existingPost);
    } else {
      setPost({
        title: '',
        content: '',
        category: '',
      });
    }
  }, [existingPost, resetKey]); // Reset form when existingPost or resetKey changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category: string) => {
    setPost(prevPost => ({
      ...prevPost,
      category,
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(post);
    setPost({
      title: '',
      content: '',
      category: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-semibold">Content</label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="category" className="block text-gray-700 font-semibold">Category</label>
        <div
          className="appearance-none mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {post.category || "Select Category"}
        </div>
        {isDropdownOpen && (
          <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white z-10">
            {["Mindfulness", "Workout", "Motivation", "Nutrition", "Fitness Tips"].map(category => (
              <div
                key={category}
                className={`block px-4 py-2 cursor-pointer ${
                  post.category === category ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {existingPost ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default CreateEditPost;
