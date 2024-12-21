// src/components/header/AuthButton.tsx
'use client';

import Link from 'next/link'
import { useSession, SessionProvider } from "next-auth/react"
import { Bell } from 'lucide-react';
import Image from 'next/image';
import DropdownMenu from '../ui/DropdownMenu';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  const { data: session } = useSession();

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Create Post', href: '/create-post' },
    { label: 'Reading list', href: '/reading-list' },
    { label: 'Settings', href: '/settings' },
    { label: 'Sign Out' }
  ];

  return (
    <div className={`flex items-center space-x-4 whitespace-nowrap ${className ?? ''}`}>
      {session ? (
        <>
          <Link href="/create-post" className="border border-black text-black bg-white hover:bg-gray-300 font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200">
            Create Post
          </Link>
          <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md">
            <Bell size={24} />
          </button>
          {session.user?.image && (
            <DropdownMenu
            trigger={
              <Image
                src={session.user.image || ''}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            }
            items={menuItems}
          />
          )}
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100  inline-block px-4 py-2 rounded-md text-sm md:text-xl font-medium transition-colors duration-200"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="border border-black text-black bg-white hover:bg-gray-300 font-medium py-2 px-4 rounded-md text-sm md:text-xl transition-colors duration-200"
          >
            Create account
          </Link>
        </>
      )}
    </div>
  );
};


export default function AuthButtonsWrapper({ className }: AuthButtonsProps) {
  return (
    <SessionProvider> 
      <AuthButtons className={className} />
    </SessionProvider>
  );
}