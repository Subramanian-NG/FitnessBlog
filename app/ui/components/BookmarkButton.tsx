// 'use client';
// import React, { useState } from 'react';

// interface bookmarkButtonProps {
//     postId: number;
//   }

// const BookmarkButton = ({ postId } : bookmarkButtonProps) => {
//   const [bookmarked, setBookmarked] = useState(false);

//   const handleBookmark = () => {
//     console.log(`${bookmarked ? 'Removed' : 'Added'} bookmark for post:`, postId);
//   };

//   return (
//     <button onClick={handleBookmark} className={`px-4 py-2 rounded-md ${bookmarked ? 'bg-yellow-500' : 'bg-gray-500 text-white'}`}>
//       {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
//     </button>
//   );
// };

// export default BookmarkButton;

'use client';
import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

interface BookmarkButtonProps {
  postId: string;
  userId: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ postId, userId }) => {
  //console.log("postId--",postId);
  //console.log("userId--",userId);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Check if the post is already bookmarked by the user
    const fetchBookmarkStatus = async () => {
      const res = await fetch(`/api/bookmarks?userId=${userId}&postId=${postId}`);
      const data = await res.json();
      setBookmarked(data.bookmarked);
    };
    
    fetchBookmarkStatus();
  }, [userId, postId]);

  const handleBookmark = async () => {
    const method = bookmarked ? 'DELETE' : 'POST';
    const res = await fetch('/api/bookmarks', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, postId }),
    });

    if (res.ok) {
      setBookmarked(!bookmarked);
      console.log(`${bookmarked ? 'Removed' : 'Added'} bookmark for post:`, postId);
    } else {
      console.error('Failed to update bookmark status');
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className={`px-4 py-2 rounded-full flex items-center space-x-2 shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 ${
        bookmarked ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'
      }`}
    >
      {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
    </button>
  );
};

export default BookmarkButton;

