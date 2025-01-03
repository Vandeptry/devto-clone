//src/app/_components/header/index.tsx
import dynamic from 'next/dynamic';
import Skeleton from '~/components/ui/skeleton';

const Header = dynamic(() => import('~/app/_components/header/Header'), {
    ssr: false,
    loading: () => (
      <div className="py-2 px-4">
        <div className="flex items-center">
          <Skeleton width="100px" height="20px" rounded /> 
          <div className="flex items-center gap-4">
            <Skeleton width="80px" height="30px" rounded /> 
            <Skeleton width="80px" height="30px" rounded /> 
          </div>
        </div>
      </div>
    ),
  });
  export default Header;