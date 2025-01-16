//src/components/hooks/useUser.ts
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface UserProfile {
  bio: string | null;
  location: string | null;
  website: string | null;
  brandColor: string | null;
}

export interface UserSession {
  user: {
    id: string;
    uploadAva: string | null;
    username: string | null;
    joinedAt: Date | null;
    hashedPassword: string | null;
    profile: UserProfile | null;
    email: string | null;
    name: string | null;
    image: string | null;
  };
  sessionToken: string;
  expires: string;
}

export function useUser(): UserSession | null {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const { user, expires, ...rest } = session as UserSession; 
      setUserSession({ 
        ...rest,
        user: {
          ...user,
          // Ensure these fields are populated
          email: user.email ?? null, 
          name: user.name ?? null,
          image: user.image ?? null,
        },
        expires, 
      });
    } else {
      setUserSession(null);
    }
  }, [session, status]);

  return userSession;
}