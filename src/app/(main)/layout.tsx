// src/app/(main)/layout.tsx
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "../_components/Navbar";
import { NavbarServer } from "../_components/Navbar_server";
import { useUser } from "~/components/hooks/useUser";

const Leftbar = dynamic(() => import('../_components/Leftbar'), { ssr: false });

const Rightbar = dynamic(() => import('../_components/Rightbar'), { ssr: false });

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  //const user = useUser();

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col mb-10">
        <Navbar setIsLeftbarOpen={setIsLeftbarOpen}/>
        <div className="flex flex-row mx-4 lg:mx-32 lg:mt-10 mt-4">
          <div className="">
            <Leftbar isOpen={isLeftbarOpen} />
          </div>
          <main className="container px-0 lg:px-4">
            <div className="mx-0 md:mx-10 rounded-md bg-white p-4 lg:px-10 shadow shadow-gray-400">
              {children}
            </div>
          </main>
          <div className="hidden md:block w-60 lg:w-80">
            <Rightbar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
