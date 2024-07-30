"use client";

import { logout } from "@/actions/logout-action";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
//import { signOut } from "next-auth/react";

export default function ClientSettingsPage() {
  //To utilize the useSession hook, we need to wrap it in a SessionProvider (see RootLayout.tsx)

  const user = useCurrentUser();

  const handleLogout = () => {
    //can be done using next-auth or a server action, signOut is for next-auth
    //signOut();

    //can be done using a server action
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <Button type="submit" variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
