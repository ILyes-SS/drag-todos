"use client";
import { socialSignIn } from "@/app/actions/user";

const GithubLogin = () => {
  return (
    <button
      onClick={async () => await socialSignIn("github")}
      className="p-4 text-white bg-black"
    >
      Login with github
    </button>
  );
};

export default GithubLogin;
