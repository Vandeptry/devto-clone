//src/app/Setting/page.tsx
"use client";

import dynamic from "next/dynamic";
import Skeleton from "~/components/ui/skeleton";

const ProfilePage = dynamic(() => import("./Setting"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-screen-lg p-4">
      <Skeleton width="100%" height="500px" rounded />
    </div>
  ),
});
export default ProfilePage;
