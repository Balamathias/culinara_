import HomeActions from "@/components/home-actions";
import Posts from "@/components/posts";
import HomeActionsSkeleton from "@/components/skeletons/home-actions";
import { getUser } from "@/services/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Culinara | Home | Recipes"
}

export default async function Home() {
  const user = await getUser()
  return (
    <div className="flex md:p-8 py-6 mx-auto max-w-7xl gap-5 w-full justify-between">
      <Posts user={user!} />

      <Suspense fallback={<HomeActionsSkeleton />}>
        <HomeActions user={user} />
      </Suspense>
    </div>
  );
}
