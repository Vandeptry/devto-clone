// src/components/header/AuthButton.tsx
import Link from 'next/link';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-4 whitespace-nowrap ${className || ''}`}>
      <Link key="login" href="/enter" className="text-gray-700 hover:text-gray-900 hidden md:block text-sm whitespace-nowrap">
        Log in
      </Link>
      <Link key="signup"
        href="/enter?state=new-user"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm whitespace-nowrap"
      >
        Create account
      </Link>
    </div>
  );
};

export default AuthButtons;