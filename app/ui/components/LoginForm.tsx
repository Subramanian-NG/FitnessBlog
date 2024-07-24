// ui/components/LoginForm.tsx

// "use client";
// import React, { useState } from 'react';

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Logging in with', email, password);
//   };

//   return (
//     <form onSubmit={handleLogin} className="login-form">
//       <h2>Login</h2>
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
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;

'use client'
import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const users = await res.json()
    const user = users.find((u: { email: string, password: string }) => u.email === email && u.password === password)
    if (user) {
      alert('Login successful')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
      <Button>Login</Button>
    </form>
  )
}

export default LoginForm

