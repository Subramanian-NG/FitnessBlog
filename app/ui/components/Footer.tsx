// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 p-4 text-center text-white">
//       <p>&copy; Fitness tracker</p>
//     </footer>
//   );
// };

// export default Footer;

// import React from 'react';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4">About Us</h3>
//             <p className="text-gray-400">
//               We are a company dedicated to providing the best products and services to our customers.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Follow Us</h3>
//             <ul className="flex space-x-4">
//               <li>
//                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
//                   <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//                     <path d="M22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h10v-9H9v-3h3V8c0-3 1.8-4.7 4.4-4.7 1.3 0 2.6.1 2.9.1v3.4h-2c-1.6 0-1.9.8-1.9 1.8v2.3h3.8l-.5 3h-3.3v9h6.5c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"/>
//                   </svg>
//                 </a>
//               </li>
//               <li>
//                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
//                   <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//                     <path d="M24 4.557a9.9 9.9 0 0 1-2.828.775A4.916 4.916 0 0 0 23.337 3.2a9.864 9.864 0 0 1-3.127 1.195A4.904 4.904 0 0 0 16.846 2c-2.706 0-4.9 2.192-4.9 4.9 0 .384.044.76.127 1.119A13.92 13.92 0 0 1 1.64 3.15a4.899 4.899 0 0 0-.662 2.465c0 1.702.867 3.203 2.188 4.084A4.897 4.897 0 0 1 .96 8.75v.06c0 2.379 1.693 4.365 3.94 4.816-.413.112-.848.172-1.296.172-.317 0-.625-.03-.927-.088.626 1.955 2.444 3.379 4.6 3.416a9.868 9.868 0 0 1-6.11 2.107c-.396 0-.79-.023-1.174-.068a13.943 13.943 0 0 0 7.548 2.213c9.05 0 13.998-7.497 13.998-13.998 0-.213-.004-.426-.014-.637a9.987 9.987 0 0 0 2.457-2.548z"/>
//                   </svg>
//                 </a>
//               </li>
//               <li>
//                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
//                   <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
//                     <path d="M22.23 0H1.77C.79 0 0 .774 0 1.733v20.535C0 23.227.79 24 1.77 24h20.46C23.21 24 24 23.227 24 22.268V1.733C24 .774 23.21 0 22.23 0zM7.1 20.452H3.542V9.048H7.1v11.404zM5.321 7.786a2.074 2.074 0 1 1 0-4.148 2.074 2.074 0 0 1 0 4.148zM20.452 20.452h-3.558V15c0-1.303-.467-2.192-1.636-2.192-.892 0-1.422.604-1.655 1.187-.085.207-.106.495-.106.783v5.674H10.39s.047-9.222 0-10.404h3.558v1.474c.471-.728 1.312-1.764 3.188-1.764 2.33 0 4.075 1.519 4.075 4.783v6.911z"/>
//                   </svg>
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Newsletter</h3>
//             <form className="flex flex-col space-y-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button type="submit" className="py-2 px-4 bg-blue-600 rounded hover:bg-blue-700">
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="mt-8 text-center text-gray-500">
//           <p>&copy; 2024 My Fitness. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


//updated footer to call api
"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/subscribe', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a company dedicated to providing the best products and services to our customers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  {/* SVG for Facebook */}
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  {/* SVG for Twitter */}
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  {/* SVG for LinkedIn */}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form className="flex flex-col space-y-4" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="py-2 px-4 bg-blue-600 rounded hover:bg-blue-700">
                Subscribe
              </button>
            </form>
            {message && <p className="mt-4 text-gray-400">{message}</p>}
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>&copy; 2024 My Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





