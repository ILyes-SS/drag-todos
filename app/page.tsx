import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return <div> not logged in </div>;
  return (
    <div>
      {" "}
      user Logged in {session.user.email} <LogoutButton />{" "}
    </div>
  );
}
