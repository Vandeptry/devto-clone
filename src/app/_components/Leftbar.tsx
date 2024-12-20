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
  { href: "/", icon: Home, label: "Home", color: "blue-500" },
  {
    href: "/dev-plus-plus",
    icon: PlusSquare,
    label: "DEV++",
    color: "gray-600",
  },
  { href: "/podcasts", icon: Mic, label: "Podcasts", color: "gray-600" },
  { href: "/videos", icon: Video, label: "Videos", color: "gray-600" },
  { href: "/tags", icon: Tag, label: "Tags", color: "yellow-500" },
  {
    href: "/dev-help",
    icon: HelpCircle,
    label: "DEV Help",
    color: "yellow-300",
  },
  {
    href: "/forem-shop",
    icon: ShoppingCart,
    label: "Forem Shop",
    color: "purple-500",
  },
  {
    href: "/advertise-on-dev",
    icon: Heart,
    label: "Advertise on DEV",
    color: "red-500",
  },
  {
    href: "/dev-challenges",
    icon: Trophy,
    label: "DEV Challenges",
    color: "yellow-500",
  },
  {
    href: "/dev-showcase",
    icon: Star,
    label: "DEV Showcase",
    color: "yellow-300",
  },
  { href: "/about", icon: Info, label: "About", color: "gray-600" },
  { href: "/contact", icon: PhoneCall, label: "Contact", color: "gray-600" },
  {
    href: "/free-postgres-database",
    icon: Database,
    label: "Free Postgres",
    color: "gray-600",
  },
  { href: "/guides", icon: BookOpen, label: "Guides", color: "gray-600" },
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
      className={`fixed left-0 top-12 h-screen w-64 transform rounded-md bg-gray-50 p-4 transition-transform duration-300 md:relative md:top-0 md:block md:h-full md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-[calc(100vh-4rem)] md:h-auto overflow-y-auto md:overflow-y-hidden">
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
            >
              <item.icon className={`mr-2 h-5 w-5 text-${item.color}`} />
              <span>{item.label}</span>
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
          <div className="flex justify-center space-x-4 px-3">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <link.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Leftbar;
