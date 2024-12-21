// src/app/(main)/layout.tsx
"use client";
import Header from "~/app/_components/Header";
import { useState } from "react";
import Leftbar from "../_components/Leftbar";
import Rightbar from "../_components/Rightbar";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col mb-10">
        <Header setIsLeftbarOpen={setIsLeftbarOpen} />
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
