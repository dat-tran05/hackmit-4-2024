import { auth } from "@clerk/nextjs/server";
import MainPage from "@/components/main-page";
import LoginPage from "@/components/launch-page";

export default function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  return userId ? <MainPage /> : <LoginPage />;
}
