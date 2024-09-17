import { getUser } from "@/services/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create new Recipe | Culinara'
}

export default async function Page() {
  await getUser()
  return (
    <div className="flex md:p-8 py-6 mx-auto max-w-7xl w-full justify-between">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold">Create Recipe</h2>

      </div>
    </div>
  );
}
