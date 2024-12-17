// src/components/header/Search.tsx
import { Search } from 'lucide-react';

interface SearchProps {
  className?: string;
}

const SearchBox: React.FC<SearchProps> = ({ className }) => {
  return (
    <div className={`relative flex items-center w-full ${className || ''}`}>
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-white border border-gray-300 rounded-md p-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none text-gray-500">
        <Search size={16} />
      </div>
    </div>
  );
};

export default SearchBox;