import { UserInfo } from "@/components/user/user-info";
import { currentUser } from "@/lib/auth-user-info";

const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <UserInfo user={user} label="Server component" />
    </div>
  );
};

export default ServerPage;
