import { getUser } from "@/services/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Profile - Settings | Culinara'
}

export default async function Page() {
  const user = await getUser()
  return (
    <div className="flex md:p-8 py-6 mx-auto max-w-7xl w-full justify-between">
      <h2 className="text-xl font-semibold">Hi {user?.username}</h2>
    </div>
  );
}
