import Kanban from "@/components/Kanban";
import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session)
    return (
      <div>
        <Link className="border bg-blue-400" href={"/login"}>
          login
        </Link>
        <Kanban />
      </div>
    );
  return (
    <div className="flex">
      {" "}
      user Logged in {session.user.email} <Kanban /> <LogoutButton />{" "}
    </div>
  );
}
