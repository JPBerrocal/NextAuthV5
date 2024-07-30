import { db } from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFAToken = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFAToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFAToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFAToken;
  } catch {
    return null;
  }
};
