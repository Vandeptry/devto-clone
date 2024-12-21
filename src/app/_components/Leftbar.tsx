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

const menuItems = [
  { href: "/", icon: Home, label: "Home", color: "text-blue-500" },
  {
    href: "/dev-plus-plus",
    icon: PlusSquare,
    label: "DEV++",
    color: "text-green-500", 
  },
  {
    href: "/podcasts",
    icon: Mic,
    label: "Podcasts",
    color: "text-orange-500", 
  },
  {
    href: "/videos",
    icon: Video,
    label: "Videos",
    color: "text-red-500", 
  },
  { href: "/tags", icon: Tag, label: "Tags", color: "text-yellow-500" },
  {
    href: "/dev-help",
    icon: HelpCircle,
    label: "DEV Help",
    color: "text-cyan-500", 
  },
  {
    href: "/forem-shop",
    icon: ShoppingCart,
    label: "Forem Shop",
    color: "text-purple-500",
  },
  {
    href: "/advertise-on-dev",
    icon: Heart,
    label: "Advertise on DEV",
    color: "text-pink-500", 
  },
  {
    href: "/dev-challenges",
    icon: Trophy,
    label: "DEV Challenges",
    color: "text-amber-500", 
  },
  {
    href: "/dev-showcase",
    icon: Star,
    label: "DEV Showcase",
    color: "text-yellow-300",
  },
  { href: "/about", icon: Info, label: "About", color: "text-gray-600" },
  {
    href: "/contact",
    icon: PhoneCall,
    label: "Contact",
    color: "text-blue-500", 
  },
  {
    href: "/free-postgres-database",
    icon: Database,
    label: "Free Postgres",
    color: "text-gray-800", 
  },
  { href: "/guides", icon: BookOpen, label: "Guides", color: "text-green-500" }, 
];

const otherMenuItems = [
  {
    href: "/code-of-conduct",
    icon: ThumbsUp,
    label: "Code of Conduct",
    color: "gray-600",
  },
  {
    href: "/privacy-policy",
    icon: User,
    label: "Privacy Policy",
    color: "gray-600",
  },
  {
    href: "/terms-of-use",
    icon: Eye,
    label: "Terms of Use",
    color: "gray-600",
  },
];

const socialLinks = [
  { href: "https://www.facebook.com/", icon: Facebook },
  { href: "https://twitter.com/", icon: Twitter },
  { href: "https://github.com/", icon: Github },
  { href: "https://www.instagram.com/", icon: Instagram },
  { href: "https://www.youtube.com/", icon: Youtube },
  { href: "mailto:your.email@example.com", icon: Mail },
];

const Leftbar: React.FC<LeftbarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed shadow-lg shadow-gray-200 left-0 top-16  w-64 transform rounded-md bg-gray-200 p-4 transition-transform duration-300 lg:relative lg:top-0 lg:block lg:h-full lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-[calc(100vh-6rem)] lg:h-auto overflow-y-auto lg:overflow-y-hidden">
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded font-medium text-gray-800 hover:bg-gray-200"
            >
              <div className="flex hover:bg-slate-300 w-full p-2 rounded transition-all duration-200 ease-linear">
              <item.icon className={`mr-2 h-5 w-5 ${item.color}`} />
              <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="mt-6 border-t border-gray-300 pt-4">
          <h3 className="mb-2 px-3 font-medium text-gray-600">Other</h3>
          <div className="space-y-2 px-3">
            {otherMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
              >
                <item.icon className={`mr-2 h-5 w-5 text-${item.color}`} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6 border-t border-gray-300 pt-4">
          <h3 className="mb-2 px-3 font-medium text-gray-600">Follow us</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer" 
              >
                <link.icon className="h-6 lg:h-8 w-6 lg:w-10 text-gray-500 hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Leftbar;
