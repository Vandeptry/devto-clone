// src/app/auth/register/credentials/page.tsx
"use client";

import dynamic from "next/dynamic";
import Skeleton from "~/components/ui/skeleton";

const Credential = dynamic(() => import("./cred"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-screen-lg p-4">
      <Skeleton width="100%" height="500px" rounded />
    </div>
  ),
});

const Page = () => {
  return (
    <>
      <Credential />
    </>
  );
};

export default Page;