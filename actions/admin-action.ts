"use server";

import { currentRole } from "@/lib/auth-user-info";
import { UserRole } from "@prisma/client";

export const adminAction = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  return { success: "Allowed!" };
};
