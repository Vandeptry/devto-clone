// src/components/header/AuthButton.tsx
"use client";

import Link from "next/link";
import { useSession, SessionProvider } from "next-auth/react";
import { Bell } from "lucide-react";
import Image from "next/image";
import DropdownMenu from "../ui/DropdownMenu";
import { useEffect, useState } from "react";

interface AuthButtonsProps {
  className?: string;
}
interface User {
  uploadAva: string;
  name?: string; 
  username?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const menuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Create Post", href: "/create-post" },
    { label: "Reading list", href: "/reading-list" },
    { label: "Settings", href: "/settings" },
    { label: "Sign Out" },
  ];

  const isLoggedIn = session?.user ?? user; 

  return (
    <div
      className={`flex items-center space-x-1 lg:space-x-4 whitespace-nowrap ${
        className ?? ""
      }`}
    >
      {isLoggedIn ? (
        <>
          <Link
            href="/create-post"
            className="border border-black text-black bg-white hover:bg-gray-300 font-medium py-2 px-4 rounded-md text-sm transition-colors duration-200 hidden lg:block"
          >
            Create Post
          </Link>
          <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md">
            <Bell size={24} />
          </button>
          {/* Kiểm tra ảnh provider hay ảnh upload */}
          {(session?.user?.image ?? user?.uploadAva!) && (
            <DropdownMenu
            trigger={
              <Image
                src={session?.user.image ?? user?.uploadAva ?? ""}
                alt={
                  session?.user.name
                    ? session.user.name.charAt(0).toUpperCase()
                    : user?.username
                    ? user.username.charAt(0).toUpperCase()
                    : "Avatar"
                }
                width={30}
                height={30}
                className="flex items-center justify-center rounded-full lg:w-10 lg:h-10 w-10 h-10 border-2 border-slate-600 bg-gray-400 text-gray-800 font-bold text-lg" 
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
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100  inline-block px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors duration-200"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="border border-black text-black bg-white hover:bg-gray-300 font-medium py-2 px-4 rounded-md text-sm md:text-base transition-colors duration-200"
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