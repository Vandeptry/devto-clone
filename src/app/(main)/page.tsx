// src/app/(main)/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import {useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  interface User {
    name: string
    email: string
    uploadAva: string
  }

  const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUser(JSON.parse(userString));
        }
    }, []);

  return (
    <div className="min-h-screen">
      <main>
        {(session ?? user) ? (
          <div>
            <p>
              Xin chào, {session?.user?.name ?? user?.name ?? "User"}!
            </p>
            {(session?.user?.image ?? user?.uploadAva) && (
              <img
                src={session?.user?.image ?? user?.uploadAva ?? ""}
                alt="Avatar"
                className="rounded-full w-20 h-20"
              />
            )}
          </div>
        ) : (
          <>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
              dolores nostrum maiores magni provident tempora natus voluptatibus
              saepe exercitationem similique, distinctio officia, perspiciatis
              fugit optio fugiat doloribus neque quas, illo repudiandae cumque
              facere error harum totam? Modi, accusamus cum provident minus
              architecto dicta aliquam. Numquam nesciunt exercitationem assumenda
              harum omnis?
            </p>
          </>
        )}
      </main>
    </div>
  );
}