'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const { data: session, status } = useSession();
  const [showSignOut, setShowSignOut] = useState(false);
  const router = useRouter();

  const toggleSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" passHref>
              <span className="text-white text-lg font-semibold hover:text-gray-400">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/blogs" passHref>
              <span className="text-white text-lg font-semibold hover:text-gray-400">Blogs</span>
            </Link>
          </li>
          {session?.user && (
            <li>
              <Link href="/myblogs" passHref>
                <span className="text-white text-lg font-semibold hover:text-gray-400">My Blogs</span>
              </Link>
            </li>
          )}
        </ul>
        <div className="relative flex items-center space-x-4">
          {!session ? (
            <Link href="/auth" passHref>
              <span className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full hover:from-blue-600 hover:to-green-600 transition-colors duration-300">
                {status === 'loading' ? 'Loading...' : 'SignUp/Login'}
              </span>
            </Link>
          ) : (
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleSignOut}>
              <img
                src={session.user.image || '/default-profile.png'}
                alt="Profile Picture"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white text-lg font-semibold hover:text-gray-400">
                Hi, {session.user.name}
              </span>
              {showSignOut && (
                <button
                  onClick={handleSignOut}
                  className="absolute top-12 right-0 bg-red-500 text-white text-lg font-semibold px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Sign Out
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
