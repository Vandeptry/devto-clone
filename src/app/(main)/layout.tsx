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
      <div className="flex flex-1 flex-col">
        <Header setIsLeftbarOpen={setIsLeftbarOpen} />
        <div className="flex flex-grow overflow-hidden mt-5 md:mx-52">
          <Leftbar isOpen={isLeftbarOpen} />
          <main className="container mx-auto flex-grow px-4">
            <div className="mx-4 rounded-md bg-white p-4 shadow">
              {children}
            </div>
          </main>
            <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Main;
