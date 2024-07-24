import React from 'react';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';

interface PostProps {
  post: {
    postId: string;
    id: string;
    title: string;
    content: string;
    category: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  //console.log('Post Component - post:', post); 

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">Category: {post.category}</p>
      <div className="text-gray-700 leading-relaxed">{post.content}</div>
      <div className="mt-6 flex space-x-4">
        <ShareButton postId={post.id} />
        <BookmarkButton postId={post.id} />
      </div>
    </div>
  );
};

export default Post;

