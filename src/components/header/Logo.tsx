//src/components/header/Logo.tsx
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <img
        src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
        alt="DEV Community"
        className="h-8 mr-4 md:h-10"
      />
    </Link>
  );
};

export default Logo;