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
    {
      label: `${session?.user.name ?? user?.name}`,
      sub: `@${session?.user.name ?? user?.username}`,
      href: `/personal/profile`,
    },
    { label: "Dashboard", sub: null, href: "/personal/dashboard" },
    { label: "Create Post", sub: null, href: "/create-post" },
    { label: "Reading list", sub: null, href: "/reading-list" },
    { label: "Settings", sub: null, href: "/settings" },
    { label: "Sign Out", sub: null },
  ];

  const isLoggedIn = session?.user ?? user;

  return (
    <div
      className={`flex items-center space-x-1 whitespace-nowrap lg:space-x-4 ${
        className ?? ""
      }`}
    >
      {isLoggedIn ? (
        <>
          <Link
            href="/create-post"
            className="hidden rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-300 lg:block"
          >
            Create Post
          </Link>
          <button className="rounded-md bg-gray-200 p-2 hover:bg-gray-300">
            <Bell size={24} />
          </button>
          {/* Kiểm tra ảnh provider hay ảnh upload */}
          {(session?.user?.image ?? user?.uploadAva ?? session?.user.name) && (
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-600 bg-gray-400 text-lg font-bold text-gray-800 lg:h-10 lg:w-10"
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
            className="inline-block rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 md:text-base"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-300 md:text-base"
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
