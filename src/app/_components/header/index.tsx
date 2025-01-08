//src/app/_components/header/index.tsx
import dynamic from 'next/dynamic';
import Skeleton from '~/components/ui/skeleton';

const Header = dynamic(() => import('./Header'), {
    ssr: false,
    loading: () => (
      <div className="border border-x-4 p-5 shadow-md bg-red-500">
        <Skeleton />
      </div>
    ),
  });
  export default Header;