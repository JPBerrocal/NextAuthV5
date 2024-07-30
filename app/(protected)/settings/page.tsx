//this import is for server components
import { auth, signOut } from "@/auth";

import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  //this approach is for server components
  const session = await auth();

  return (
    <div>
      <h1>Settings Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          //this signOut function only works in server Components
          await signOut();
        }}
      >
        <Button type="submit" variant="destructive">
          Logout
        </Button>
      </form>
    </div>
  );
}
