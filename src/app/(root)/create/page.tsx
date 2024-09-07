import { getUser } from "@/services/auth";

export default async function Page() {
  const user = await getUser()
  return (
    <div className="flex md:p-8 py-6 mx-auto max-w-7xl w-full justify-between">
      <h2 className="text-xl font-semibold">Create Recipe</h2>
    </div>
  );
}
