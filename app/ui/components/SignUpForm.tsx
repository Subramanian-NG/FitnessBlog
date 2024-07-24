// ui/components/SignUpForm.tsx

// "use client";
// import React, { useState } from 'react';

// const SignUpForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignUp = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     // Handle sign-up logic here
//     console.log('Signing up with', email, password);
//   };

//   return (
//     <form onSubmit={handleSignUp} className="signup-form">
//       <h2>Sign Up</h2>
//       <div className="form-group">
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="confirm-password">Confirm Password:</label>
//         <input
//           type="password"
//           id="confirm-password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUpForm;

'use client'
import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const newUser = await res.json()
    if (newUser) {
      alert('Signup successful')
    }
  }

  return (
    <form onSubmit={handleSignUp} className="signup-form">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button>Sign Up</Button>
    </form>
  )
}

export default SignUpForm

