import { getUser } from "@/services/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Search Recipes | Culinara'
}

export default async function Page() {
  await getUser()
  return (
    <div className="flex md:p-8 py-6 mx-auto max-w-7xl w-full justify-between">
      <h2 className="text-xl font-semibold">Search Recipes</h2>
    </div>
  );
}
