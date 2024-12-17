//src/app/_components/Layout/Main.tsx
"use client";
import Header from "./Home/Header";
import Leftbar from "~/components/leftbar/Leftbar";
import { useState } from "react";
import Rightbar from "~/components/rightbar/Rightbar";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <Header setIsLeftbarOpen={setIsLeftbarOpen} />
      <div className="container mx-auto flex flex-grow px-4 mt-4">
        <Leftbar isOpen={isLeftbarOpen} />
        <main className="flex-grow mx-4 bg-white rounded-md shadow p-4">
          {children}
        </main>
          <Rightbar />
      </div>
    </div>
  );
};

export default Main;