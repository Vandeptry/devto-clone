//src/components/ui/DropdownMenu.tsx
"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { useRouter,redirect } from 'next/navigation';

interface DropdownMenuItem {
  label: string;
  sub: string | null;
  href?: string;
  onClick?: () => void;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items }) => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({callbackUrl:'/'});
    localStorage.removeItem("user");
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
          {trigger}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  <div
                    className={`${index === 0 ? "border-b text-xl font-bold" : ""} ${index === items.length - 1 ? "border-t" : ""} ${item.label === "Sign Out" ? "text-red-500" : ""} ${active ? "bg-gray-100" : ""} block w-full px-4 py-2 text-left`}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={item.onClick}
                        className="hover:text-blue-600"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <div
                        onClick={handleSignOut}
                        className="text-red-500 hover:text-red-700"
                      >
                        {item.label}
                      </div>
                    )}

                    {/* sub index 0 */}
                    {index === 0 && item.sub && (
                      <div className="m-1 text-xs text-gray-500">
                        {item.sub}
                      </div>
                    )}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
