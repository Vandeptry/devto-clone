//src/app/_components/Header.tsx
"use client";

import Logo from "~/components/header/Logo";
import SearchBox from "~/components/header/SearchBox";
import AuthButtons from "~/components/header/AuthButton";
import { Search, Menu } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

interface HeaderProps {
  setIsLeftbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderContent: React.FC<HeaderProps> = ({ setIsLeftbarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);

  const toggleLeftbar = () => {
    setIsLeftbarOpen(prev => !prev);
  };

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node) && searchIconRef.current && !searchIconRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, handleClickOutside]);

  return (
    <header className="bg-white shadow-md py-2 sticky top-0 z-50 w-full border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 relative">
        <div className="flex items-center">
          <button onClick={toggleLeftbar} className="lg:hidden mr-4">
            <Menu className="w-6 h-6" />
          </button>
          <Logo />
        </div>
        <div className="flex items-center">
          <button ref={searchIconRef} onClick={toggleSearch} className="md:hidden mr-4 hover:bg-gray-100 rounded p-1">
            <Search className={` w-9 h-9 px-1 py-2 rounded-md ${isSearchOpen ? 'bg-slate-300' : ''}`} />
          </button>
          {isSearchOpen && (
            <div ref={searchBoxRef} className="absolute top-full left-0 w-full bg-white z-20 shadow-md rounded-b-md border-t border-gray-200">
              <div className="container mx-auto px-4 py-2">
                <SearchBox />
              </div>
            </div>
          )}
          <div className="hidden md:flex">
            <SearchBox className="w-96 mr-4"/>
          </div>
          <AuthButtons />
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;