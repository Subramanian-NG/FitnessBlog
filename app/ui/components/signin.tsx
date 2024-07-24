'use client'
import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from next/navigation

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize the useRouter hook

  const handleDBadd = async () => {
    if (session) {
      const users = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: session?.user?.name,
          email: session?.user?.email,
        }),
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error('Error fetching users:', error);
        });

      if (users != null) {
        console.log("User created");
      }
    }
  };

  const handleSignIn = async () => {
    await signIn('google', {
      callbackUrl: '/', // Redirect to the home page after signing in
    });
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/', // Redirect to the home page after signing out
    });
  };

  useEffect(() => {
    if (session) {
      handleDBadd();
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.jpg')" }} // Ensure this path is correct
    >
      {session ? (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm mx-auto text-center">
          <p>Signed in as {session.user?.name}</p>
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-lg hover:bg-red-600 transition-colors duration-300 mt-4"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full hover:from-blue-600 hover:to-green-600 transition-colors px-4 py-2"
        >
          <div className="flex items-center justify-center bg-white w-9 h-9 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <title>Sign in with Google</title>
              <desc>Google G Logo</desc>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                className="fill-blue-500"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                className="fill-green-500"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                className="fill-yellow-500"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                className="fill-red-500"
              ></path>
            </svg>
          </div>
          <span className="text-sm text-white tracking-wider">Sign in with Google</span>
        </button>
      )}
    </div>
  );
};

export default SignIn;
