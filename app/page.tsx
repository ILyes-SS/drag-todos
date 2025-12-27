import Kanban from "@/components/Kanban";
import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return <Kanban />;
  return (
    <div>
      {" "}
      user Logged in {session.user.email} <LogoutButton />{" "}
    </div>
  );
}
