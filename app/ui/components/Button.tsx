// components/Button.tsx
// import React from 'react'

// interface ButtonProps {
//   children: React.ReactNode
//   onClick?: () => void
// }

// const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
//   return (
//     <button
//       type="submit"
//       onClick={onClick}
//       className="bg-blue-600 text-white p-2 rounded"
//     >
//       {children}
//     </button>
//   )
// }

// export default Button

// components/Button.tsx
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-blue-600 text-white p-2 rounded"
    >
      {children}
    </button>
  )
}

export default Button
