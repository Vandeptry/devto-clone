// src/components/ui/Provider.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { FaDiscord, FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface Provider {
  icon: React.ComponentType;
  color: string;
  id: string;
}

export const providers: { provider: Provider; text: string }[] = [
  {
    provider: { id: "discord", icon: FaDiscord, color: "text-blue-500" },
    text: "Discord",
  },
  {
    provider: { id: "google", icon: FaGoogle, color: "text-red-500" },
    text: "Google",
  },
  {
    provider: { id: "github", icon: FaGithub, color: "text-gray-800" },
    text: "Github",
  },
];

interface AccountButtonProps {
  provider: Provider;
  children: React.ReactNode;
  userId?: string;
  onClick?: () => void;
}

const AccountButton: React.FC<AccountButtonProps> = ({
  provider,
  children,
  userId,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      if (userId) {
        const response = await fetch('/api/auth/link-discord', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Lỗi API:", errorData.message || "Không có thông báo lỗi từ server");
          throw new Error("API request failed");
        }

        const data = await response.json() as any;

        await signIn(provider.id, {
          link: {
            providerAccountId: data.providerAccountId,
          },
          callbackUrl: "/",
        });
      } else {
        if (onClick) {
          onClick();
        } else {
          await signIn(provider.id, { callbackUrl: "/" });
        }
      }
    } catch (error: any) {
      console.error("Lỗi chung:", error.message || error);
      alert('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={handleClick}
      disabled={isLoading}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <span className={`h-6 w-6 ${provider.color}`} style={{ fontSize: "25px" }}>
          <provider.icon />
        </span>
      </span>
      <span className="ml-3">
        {isLoading ? 'Loading...' : children}
      </span>
    </button>
  );
};

export { AccountButton };