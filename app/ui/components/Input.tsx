// components/Input.tsx
// import React from 'react'

// interface InputProps {
//   label: string
//   type: string
//   value: string
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
// }

// const Input: React.FC<InputProps> = ({ label, type, value, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
//       />
//     </div>
//   )
// }

// export default Input

// components/Input.tsx
import React from 'react'

interface InputProps {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
      />
    </div>
  )
}

export default Input
