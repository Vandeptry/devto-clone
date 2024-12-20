// src/components/header/Logo.tsx
import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/logo_devto.png"
        alt="DEV Community"
        width={50}
        height={40}
        className="mr-4 md:h-10"
        priority
      />
    </Link>
  );
};

export default Logo;