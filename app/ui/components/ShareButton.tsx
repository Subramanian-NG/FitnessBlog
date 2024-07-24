import React, { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';

interface ShareButtonProps {
  postId: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ postId }) => {
  const [copied, setCopied] = useState(false);

  //console.log('ShareButton Component - postId:', postId); 

  const handleShare = () => {
    const postUrl = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Error copying link: ', error);
      });
  };

  return (
    <div className="relative flex items-center space-x-2">
      <button
        onClick={handleShare}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full hover:from-blue-600 hover:to-green-600 transition-colors"
      >
        <FiShare2 className="mr-2" />
        <span>Share</span>
      </button>
      {copied && (
        <div className="absolute top-0 left-0 mt-8 ml-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-lg">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default ShareButton;
