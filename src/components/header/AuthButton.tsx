// src/components/header/AuthButton.tsx
'use client';

import Link from 'next/link'

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-4 whitespace-nowrap ${className ?? ''}`}>
      <Link 
        href="/auth/login" 
        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 hidden md:inline-block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
      >
        Log in
      </Link>
      <Link 
        href="/auth/register"
        className="border border-black text-black bg-white hover:bg-gray-300 font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200" 
      >
        Create account
      </Link>
    </div>
  );
};

export default AuthButtons;