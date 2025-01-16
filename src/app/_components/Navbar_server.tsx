// src/app/_components/Navbar_server.tsx

import Link from "next/link";
import { Bell } from "lucide-react";
import Image from "next/image";
import DropdownMenu from "~/components/ui/DropdownMenu";
import { auth } from "~/server/auth";
import { Search } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export async function NavbarServer({ className }: NavbarProps) {
  const session = await auth();

  const menuItems = [
    {
      label: `${session?.user.name}`,
      sub: `@${session?.user.username ?? session?.user.name}`,
      href: `/personal/profile`,
    },
    { label: "Dashboard", sub: null, href: "/personal/dashboard" },
    { label: "Create Post", sub: null, href: "/create-post" },
    { label: "Reading list", sub: null, href: "/reading-list" },
    { label: "Settings", sub: null, href: "/personal/Setting" },
    { label: "Sign Out", sub: null },
  ];

  const isLoggedIn = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white py-2 shadow-md">
      <div className="container relative mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          {/* Loại bỏ button toggleLeftbar */}
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
          {/* Loại bỏ button search */}
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
                {session?.user?.image && (
                  <DropdownMenu
                    trigger={
                      <Image
                        src={session?.user.image ?? ""}
                        alt={
                          session?.user.name
                            ? session.user.name.charAt(0).toUpperCase()
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