import { auth, currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import MainPage from "@/components/main-page";
import LoginPage from "@/components/launch-page";

export default function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  return userId ? <MainPage /> : <LoginPage />;
}
