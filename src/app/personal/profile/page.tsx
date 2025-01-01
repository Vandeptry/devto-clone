//src/app/profile/page.tsx
"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
  uploadAva: string;
  name?: string;
  username?: string;
  email?: string;
  createdAt?: Date;
  image?:string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const formattedDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }) 
    : '';

  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex justify-center items-center">
          <div className="relative w-24 h-24 mr-4">
            {session?.user?.image ?? user?.uploadAva ? (
              <Image
                src={session?.user?.image ?? user?.uploadAva ?? ""}
                alt="Avatar"
                fill
                className="rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl">
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : user?.username
                  ? user.username.charAt(0).toUpperCase()
                  : "A"}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {session?.user?.name ?? user?.username}
            </h1>
            <p className="text-gray-600 text-sm">
              {user?.email ? user.email : "404 bio not found"}
            </p>
            <p className="text-gray-500 text-xs">
              <i className="bx bx-calendar mr-1"></i>
              Joined on {formattedDate}
            </p>
          </div>
          <div className="ml-auto">
            <Link
              href="/edit-profile"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit profile
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-white p-4 rounded-md shadow-md w-full md:w-1/3">
              <div className="flex items-center">
                <i className="bx bx-notepad text-xl mr-2"></i>
                <span className="font-medium">0 posts submitted</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md w-full md:w-1/3">
              <div className="flex items-center">
                <i className="bx bx-chat text-xl mr-2"></i>
                <span className="font-medium">0 comments written</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md w-full md:w-1/3">
              <div className="flex items-center">
                <i className="bx bx-hash text-xl mr-2"></i>
                <span className="font-medium">0 tags followed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
