//src/app/Setting/Setting.tsx

"use client";
import Link from "next/link";
import { User, Facebook, Github, Mail, Twitter, Trees } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { credentialsSchema } from "~/app/props/schema";

import Image from "next/image";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import EditAccount from "./EditAccount";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { IUser } from "~/app/props/interface";

const menuItems = [
  {
    id: "profile",
    href: "#profile",
    icon: User,
    label: "Profile",
    color: "text-yellow-500",
  },
  {
    id: "account",
    href: "#account",
    icon: Trees,
    label: "Account",
    color: "text-green-500",
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    icon: Facebook,
    label: "Facebook Account",
    bg: "bg-blue-700",
  },
  {
    href: "mailto:your.email@example.com",
    icon: Mail,
    label: "Google Accout",
    bg: "bg-blue-300",
  },

  {
    href: "https://github.com/",
    icon: Github,
    label: "Github Account",
    bg: "bg-slate-700",
  },
  {
    href: "https://twitter.com/",
    icon: Twitter,
    label: "Twitter Account",
    bg: "bg-slate-900",
  },
];

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");
  const pathname = usePathname();
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as IUser);
    }
  }, []);
  const methods = useForm<z.infer<typeof credentialsSchema>>({
    defaultValues: {
      password: "",
    },
  });
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  return (
    <div className="mx-auto my-4 mt-10 flex w-full max-w-screen-lg flex-row gap-8">
      <div className="w-1/3">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center rounded font-medium text-gray-800 hover:bg-gray-200 ${activeTab === item.id ? "bg-gray-200" : ""} ${pathname === item.href ? "font-bold text-blue-500" : ""}`}
              scroll={false}
            >
              <div className="flex w-full rounded p-1 transition-all ease-linear hover:bg-slate-100">
                <item.icon className={`mr-2 h-6 w-6 ${item.color}`} />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex w-full flex-col gap-8">
        {activeTab === "profile" && (
          <>
            <a href="personal" className="text-3xl font-semibold text-blue-700">
              @
              {session?.user.username ??
                user?.username ??
                session?.user.name ??
                user?.name}
            </a>
            <div className="border-1 flex flex-col gap-2 rounded-lg bg-slate-100 p-8 text-center">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href="/"
                  target="_blank"
                  className={`mb-2 font-semibold text-white ${link.bg} rounded-lg p-2`}
                >
                  <link.icon className="mx-2 inline h-6 w-6 text-xl" />
                  Connect {link.label}
                </Link>
              ))}
            </div>
            <EditProfile />
          </>
        )}

        {activeTab === "account" && (
          <EditAccount />
        )}
      </div>
    </div>
  );
}
