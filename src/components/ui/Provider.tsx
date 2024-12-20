// src/components/ui/AccountButton.tsx
"use client";

import * as React from "react";
import { FaDiscord, FaGoogle, FaGithub } from "react-icons/fa";

type Provider = {
  icon: React.ComponentType;
  color: string;
};

export const providers: { provider: Provider; text: string }[] = [
  {
    provider: { icon: FaDiscord, color: "text-blue-500" },
    text: "Discord",
  },
  {
    provider: { icon: FaGoogle, color: "text-red-500" },
    text: "Google",
  },
  {
    provider: { icon: FaGithub, color: "text-gray-800" },
    text: "Github",
  },
];

type AccountButtonProps = {
  provider: Provider;
  children:React.ReactNode;
}; 

const AccountButton: React.FC<AccountButtonProps> = ({ provider,children }) => {
  const { icon: Icon, color } = provider;

  return (
    <button className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"> 
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <span className={`h-6 w-6 ${color}`} style={{ fontSize: "25px" }}> 
          <Icon />
        </span>
      </span>
      <span className="ml-3">
        {children}
      </span>
    </button>
  );
};

export { AccountButton };