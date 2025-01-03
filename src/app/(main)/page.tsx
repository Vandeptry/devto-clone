// src/app/(main)/page.tsx
"use client";
import React from "react";
//import { useEffect, useState } from "react";
//import {useSession } from "next-auth/react";

export default function Page() {
  // const { data: session } = useSession();
  //temp
  // interface User {
  //   name: string
  //   email: string
  //   uploadAva: string
  // }

  // const [user, setUser] = useState<User | null>(null);

  //   useEffect(() => {
  //       const userString = localStorage.getItem('user');
  //       if (userString) {
  //           setUser(JSON.parse(userString) as User);
  //       }
  //   }, []);

  return (
    <div className="min-h-screen">
      <main>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus, corrupti.
      </main>
    </div>
  );
}