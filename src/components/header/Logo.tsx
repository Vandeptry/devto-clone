// src/components/header/Logo.tsx
import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
        alt="DEV Community"
        width={40}
        height={40}
        className="mr-4 md:h-10"
        priority
      />
    </Link>
  );
};

export default Logo;