//src/app/props/interface.ts
export interface Profile {
  uploadAva: string;
  name?: string;
  username?: string;
  email?: string;
  createdAt?: Date;
}

export interface ToasterProps {
  toast:
    | {
        success: (message: string) => string;
        error: (message: string) => string;
        loading: (message: string) => string;
      }
    | undefined;
  dismiss: () => void;
}

export interface IUser {
  id: string;
  uploadAva: string;
  name?: string;
  username?: string;
  email?: string;
  joinedAt?: Date;
  image?: string;
  profile?: {
    bio: string | null;
    location: string | null;
    website: string | null;
    brandColor: string | null;
  } | null;
}
