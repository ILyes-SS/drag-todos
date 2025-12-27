"use client";
import { logOut } from "@/app/actions/user";

const LogoutButton = () => {
  return <div onClick={async () => await logOut()}>Logout</div>;
};

export default LogoutButton;
