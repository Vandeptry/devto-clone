// src/app/auth/register/credentials/page.tsx
"use client";

import dynamic from 'next/dynamic';

const Credentials = dynamic(() => import('./cred'), { ssr: false });

export default function Page() {
  return (
    <Credentials />
  );
}