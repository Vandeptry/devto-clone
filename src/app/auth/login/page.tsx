//src/app/auth/login/page.tsx
"use client";

import dynamic from "next/dynamic";
import Skeleton from "~/components/ui/skeleton";

const LoginForm = dynamic(() => import("./Login"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-screen-lg p-4">
      <Skeleton width="100%" height="500px" rounded />
    </div>
  ),
});

const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;