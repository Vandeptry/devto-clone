//src/app/_components/header/index.tsx
import dynamic from 'next/dynamic';
import Skeleton from '~/components/ui/skeleton';

const Header = dynamic(() => import('~/app/_components/header/Header'), {
    ssr: false,
    loading: () => (
      <div className="border border-x-4 p-5 shadow-md">
        <Skeleton />
      </div>
    ),
  });
  export default Header;