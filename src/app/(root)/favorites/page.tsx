import Favorites from "@/components/favorites/favorites";
import { getUser } from "@/services/auth";
import { LucideHeart } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Favorite Recipes | Culinara'
}

export default async function Page() {
  const user = await getUser()
  return (
    <div className="flex md:p-8 py-6 mx-auto gap-y-3 max-w-7xl w-full gap-x-10">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl md:text-4xl font-semibold py-4 text-muted-foreground flex items-center gap-x-2">
          <LucideHeart size={32} className="mt-1" />
          <span>Your Favorites</span>
        </h2>
        <Favorites user={user!} />
      </div>
    </div>
  );
}
