// src/server/api/middleware/getSession.ts

import { type NextApiRequest, type NextApiResponse } from "next";
import { db } from "~/server/db";
import { Session } from "next-auth";

// Mở rộng interface NextApiRequest
declare module 'next' {
  export interface NextApiRequest {
    session: Session | null;
  }
}

export async function getSessionMiddleware(
  opts: {
    req: NextApiRequest
    res: NextApiResponse
  }
) {
  const { req, res } = opts; // Lấy req và res từ opts

  // Lấy sessionToken từ cookie
  const sessionToken = req.cookies["next-auth.session-token"];

  if (sessionToken) {
    // Lấy thông tin session từ database
    const dbSession = await db.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (dbSession) {
      // Chuyển đổi expires từ Date sang string
      const session = { 
        ...dbSession, 
        expires: dbSession.expires.toISOString() 
      };

      // Gán thông tin session vào req object
      req.session = session as Session;
    }
  }
}