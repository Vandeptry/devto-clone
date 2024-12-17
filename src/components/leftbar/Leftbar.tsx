// src/components/leftbar/Leftbar.tsx
import Link from "next/link";
import {
  Home,
  PlusSquare,
  Mic,
  Video,
  Tag,
  HelpCircle,
  ShoppingCart,
  Heart,
  Trophy,
  Star,
  Info,
  PhoneCall,
  Database,
  BookOpen,
  ThumbsUp,
  User,
  Eye,
  Facebook,
  Twitter,
  Github,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";

interface LeftbarProps {
  isOpen: boolean;
}

const Leftbar: React.FC<LeftbarProps> = ({ isOpen }) => {
  return (
    <aside
      className={` rounded-md fixed left-0 z-40 h-full w-64 transform bg-gray-50 p-4 transition-transform duration-300 md:relative md:block md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="space-y-3">
        {" "}
        <Link
          href="/"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          {" "}
          <Home className="mr-2 h-5 w-5 text-blue-500" />
          <span>Home</span>
        </Link>
        <Link
          href="/dev-plus-plus"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <PlusSquare className="mr-2 h-5 w-5 text-gray-600" />
          <span>DEV++</span>
        </Link>
        <Link
          href="/podcasts"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Mic className="mr-2 h-5 w-5 text-gray-600" />
          <span>Podcasts</span>
        </Link>
        <Link
          href="/videos"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Video className="mr-2 h-5 w-5 text-gray-600" />
          <span>Videos</span>
        </Link>
        <Link
          href="/tags"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Tag className="mr-2 h-5 w-5 text-yellow-500" />
          <span>Tags</span>
        </Link>
        <Link
          href="/dev-help"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <HelpCircle className="mr-2 h-5 w-5 text-yellow-300" />
          <span>DEV Help</span>
        </Link>
        <Link
          href="/forem-shop"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <ShoppingCart className="mr-2 h-5 w-5 text-purple-500" />
          <span>Forem Shop</span>
        </Link>
        <Link
          href="/advertise-on-dev"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Heart className="mr-2 h-5 w-5 text-red-500" />
          <span>Advertise on DEV</span>
        </Link>
        <Link
          href="/dev-challenges"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          <span>DEV Challenges</span>
        </Link>
        <Link
          href="/dev-showcase"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Star className="mr-2 h-5 w-5 text-yellow-300" />
          <span>DEV Showcase</span>
        </Link>
        <Link
          href="/about"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Info className="mr-2 h-5 w-5 text-gray-600" />
          <span>About</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <PhoneCall className="mr-2 h-5 w-5 text-gray-600" />
          <span>Contact</span>
        </Link>
        <Link
          href="/free-postgres-database"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <Database className="mr-2 h-5 w-5 text-gray-600" />
          <span>Free Postgres</span>
        </Link>
        <Link
          href="/guides"
          className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
        >
          <BookOpen className="mr-2 h-5 w-5 text-gray-600" />
          <span>Guides</span>
        </Link>
      </nav>
      {/* Other */}
      <div className="mt-6 border-t border-gray-300 pt-4">
        <h3 className="mb-2 px-3 font-medium text-gray-600">Other</h3>{" "}
        <div className="space-y-2 px-3">
          {" "}       
          <Link
            href="/code-of-conduct"
            className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
          >
            {" "}
            <ThumbsUp className="mr-2 h-5 w-5 text-gray-600" />{" "}
            <span>Code of Conduct</span>
          </Link>
          <Link
            href="/privacy-policy"
            className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
          >
            {" "}
            <User className="mr-2 h-5 w-5 text-gray-600" />{" "}
            <span>Privacy Policy</span>
          </Link>
          <Link
            href="/terms-of-use"
            className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
          >
            {" "}
            <Eye className="mr-2 h-5 w-5 text-gray-600" />{" "}
            <span>Terms of Use</span>
          </Link>
        </div>
      </div>
      {/* Follow us */}
      <div className="mt-6 border-t border-gray-300 pt-4">
        <h3 className="mb-2 px-3 font-medium text-gray-600">Follow us</h3>{" "}
        <div className="flex justify-center space-x-4 px-3">
          {" "}
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <Facebook className="h-6 w-6" /> 
          </Link>
          <Link
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <Twitter className="h-6 w-6" /> 
          </Link>
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <Github className="h-6 w-6" /> 
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <Instagram className="h-6 w-6" /> 
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800"
          >
            <Youtube className="h-6 w-6" /> 
          </Link>
          <Link
            href="mailto:your.email@example.com"
            className="text-gray-600 hover:text-gray-800"
          >
            <Mail className="h-6 w-6" /> 
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Leftbar;
