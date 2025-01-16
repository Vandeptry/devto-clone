//src/app/personal/layout.tsx
"use client";
import React from "react";
import { useState } from "react";
import { Navbar } from "../_components/Navbar";
import Leftbar from "../_components/Leftbar";

const Personal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);
  return (
    <div>
      <Navbar setIsLeftbarOpen={setIsLeftbarOpen} />
      <div className="md:hidden">
        <Leftbar isOpen={isLeftbarOpen} />
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Personal;
