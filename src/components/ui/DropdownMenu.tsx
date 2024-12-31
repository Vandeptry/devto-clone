//src/components/ui/DropdownMenu.tsx
'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';

interface DropdownMenuItem {
    label: string;
    href?: string;
    onClick?: () => void;
  }
  
  interface DropdownMenuProps {
    trigger: React.ReactNode;
    items: DropdownMenuItem[];
  }

  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("user");
  };

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items }) => {
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
            {items.map((item) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  item.label === 'Sign Out' ? (
                    <button
                      onClick={() => handleSignOut()}
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full px-4 py-2 text-left text-sm`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}
                    >
                      {item.label}
                    </a>
                  )
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