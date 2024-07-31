import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useCurrentRole = () => {
  const { data: session } = useSession();
  return session?.user?.role;
};
