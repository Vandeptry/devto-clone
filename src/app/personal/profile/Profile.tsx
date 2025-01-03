//src/app/personal/profile/Profile.tsx
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
  image?: string;
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
    <>
      <div className='w-full bg-black md:h-32 h-12'></div>
      <div className='md:-translate-y-12  max-w-screen-lg bg-gray-100 min-h-64 shadow-sm border rounded-lg mx-auto'>
        {session?.user?.image ?? user?.uploadAva ? (
          <Image
            className='md:-translate-y-16 -translate-y-9 md:mx-auto mx-2 md:h-32 md:w-32 h-[4rem] w-[4rem] rounded-full md:border-8 border-4 border-slate-900 '
            src={session?.user?.image ?? user?.uploadAva ?? ""}
            alt=""
            width={128}
            height={128}
          />
        ) : (
          <div className="md:-translate-y-16 -translate-y-9 md:mx-auto mx-2 md:h-32 md:w-32 h-[4rem] w-[4rem] rounded-full md:border-8 border-4 border-slate-900 flex items-center justify-center text-gray-600 font-bold text-2xl bg-gray-300">
            {session?.user?.name
              ? session.user.name.charAt(0).toUpperCase()
              : user?.username
                ? user.username.charAt(0).toUpperCase()
                : "A"}
          </div>
        )}
        <Link
          href="/edit-profile"
          className='bg-blue-700 text-white font-semibold px-3 py-2 rounded-md md:-translate-y-28 -translate-y-16 absolute right-6 hover:bg-blue-800 hover:scale-95 transition-all duration-100 ease-linear '
        >
          Edit profile
        </Link>
        <div className='md:text-center -translate-y-8 flex flex-col gap-4 justify-start p-4'>
          <span className='text-3xl font-semibold'>{session?.user?.name ?? user?.username}</span>
          <span className='text-xl font-normal'>
            {user?.email ? user.email : "Not found bio, please update your bio"}
          </span>
          <span className='text-slate-800/80'>You joined on {formattedDate}</span>
        </div>
        <div className='text-center text-slate-800/80 md:hidden block'>
          <button className='text-sm p-4 hover:text-blue-500 transition-all duration-200 ease-linear'>
            More infomation about {session?.user?.name ?? user?.username}
          </button>
        </div>
      </div>
      <div className='flex flex-wrap flex-row gap-4 max-w-screen-lg mx-auto min-h-screen mt-4 md:mt-4'>
        <div className='md:flex flex-col bg-gray-100 md:w-1/3 w-full max-h-fit py-4 px-6 rounded-lg shadow-sm border *:text-slate-800/80 gap-2 hidden'>
          <span>0 posts published</span>
          <span>0 comments written</span>
          <span>0 tags followed</span>
          <span>0 friends</span>
          <span>0 followes</span>
        </div>
        <div className='bg-gray-100 flex-1 flex flex-col w-full shadow-sm border rounded-lg px-6 py-4  max-h-fit'>
          <div className='flex flex-row gap-2'>
            {session?.user?.image ?? user?.uploadAva ? (
              <Image
              className='md:h-16 md:w-16 h-10 w-10 rounded-full'
              src={session?.user?.image ?? user?.uploadAva ?? ""}
              alt=""
              width={40}
              height={40}
            />
            ) : (
              <div className="md:h-16 md:w-16 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl">
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : user?.username
                    ? user.username.charAt(0).toUpperCase()
                    : "A"}
              </div>
            )}
            <div className='flex flex-col justify-center'>
              <span className='text-slate-800 font-semibold'>{session?.user?.name ?? user?.username}</span>
              <span className='text-slate-800/80 text-sm'>{formattedDate}</span>
            </div>
          </div>
          <div className='flex flex-col py-4 gap-4'>
            <div>
              <span className='text-slate-900/80 font-serif '>
                This is a Logo
              </span>
              <Image
                className='h-auto w-auto mx-auto p-4'
                src='/logo_devto.png'
                alt=''
                width={200}
                height={100}
              />
            </div>
            <div className='flex justify-between *:text-slate-800 font-light'>
              <button>
                <span>Add comment</span>
              </button>
              <span className='text-sm'>1 min read</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}