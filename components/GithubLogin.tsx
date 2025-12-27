"use client";
import { authClient } from "@/lib/auth-client"; // Import the client you created

const GithubLogin = () => {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/", // Where to go after login
    });
  };

  return (
    <button onClick={handleLogin} className="p-4 text-white bg-black">
      Login with Github
    </button>
  );
};

export default GithubLogin;
