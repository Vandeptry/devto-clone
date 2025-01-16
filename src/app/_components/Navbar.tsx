//src/app/_components/Navbar.tsx
"use client"

import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import Image from "next/image";
import DropdownMenu from "~/components/ui/DropdownMenu";
import { useEffect, useState, useRef, useCallback } from "react";
import { auth } from "~/server/auth";
import { Search, Menu } from "lucide-react";
import { UserSession, useUser } from "~/components/hooks/useUser";

interface NavbarProps {
  className?: string;
  setIsLeftbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //user:UserSession|null
}

export function Navbar({ setIsLeftbarOpen }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);
  //const session = await auth();
  const {data:session} = useSession();
  //const session = useUser()

  // const [session, setSession] = useState<any>(null);
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const session = await auth();
  //     setSession(session);
  //   };

  //   fetchSession();
  // }, []);

  const [user, setUser] = useState<{
    uploadAva: string;
    name?: string;
    username?: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as { 
        uploadAva: string;
        name?: string;
        username?: string;
      };
      setUser(parsedUser); 
    }
  }, []);

  const menuItems = [
    {
      label: `${session?.user.name ?? user?.name}`,
      sub: `@${
        session?.user.username ??
        user?.username ??
        session?.user.name ??
        user?.name
      }`,
      href: `/personal/profile`,
    },
    { label: "Dashboard", sub: null, href: "/personal/dashboard" },
    { label: "Create Post", sub: null, href: "/create-post" },
    { label: "Reading list", sub: null, href: "/reading-list" },
    { label: "Settings", sub: null, href: "/personal/Setting" },
    { label: "Sign Out", sub: null },
  ];

  const isLoggedIn = session?.user ?? user;

  const toggleLeftbar = () => {
    setIsLeftbarOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node) &&
      searchIconRef.current &&
      !searchIconRef.current.contains(event.target as Node)
    ) {
      setIsSearchOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, handleClickOutside]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white py-2 shadow-md">
      <div className="container relative mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <button onClick={toggleLeftbar} className="mr-4 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/">
            <Image
              src="/logo_devto.png"
              alt="DEV Community"
              width={80}
              height={60}
              className="mr-2 h-5 w-12 md:h-10"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center">
          <button
            ref={searchIconRef}
            onClick={toggleSearch}
            className="mr-4 rounded p-1 hover:bg-gray-100 md:hidden"
          >
            <Search
              className={`h-9 w-9 rounded-md px-1 py-2 ${isSearchOpen ? "bg-slate-300" : ""}`}
            />
          </button>
          {isSearchOpen && (
            <div
              ref={searchBoxRef}
              className="absolute left-0 top-full z-20 w-full rounded-b-md border-t border-gray-200 bg-white shadow-md"
            >
              <div className="container mx-auto px-4 py-2">
                <div className={`relative flex w-full items-center`}>
                  <input
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    className="w-full rounded-md border border-gray-300 bg-white p-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <Search size={16} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="hidden md:flex">
            <div className={`relative mr-4 flex w-full items-center`}>
              <input
                type="text"
                placeholder="Search..."
                aria-label="Search"
                className="w-full rounded-md border border-gray-300 bg-white p-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <Search size={16} />
              </div>
            </div>
          </div>
          <div
            className={`flex items-center space-x-1 whitespace-nowrap lg:space-x-4`}
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
                {(session?.user?.image ??
                  user?.uploadAva ??
                  session?.user.name) && (
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
        </div>
      </div>
    </header>
  );
};
