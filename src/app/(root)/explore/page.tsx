import Explore from "@/components/explore/explore";
import StickyTabs from "@/components/explore/sticky-tabs";
import ExploreTabs from "@/components/explore/tabs";
import PostsSkeleton from "@/components/skeletons/posts";
import { getUser } from "@/services/auth";
import { LucideCompass } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Explore Recipes | Culinara'
}

export default async function Page() {
  const user = await getUser()
  return (
    <div className="flex md:p-8 py-6 mx-auto gap-y-3 max-w-7xl w-full gap-x-10 relative">
      <div className="flex flex-col gap-y-4 md:basis-2/3">
        
        <h2 className="text-2xl md:text-4xl font-semibold py-4 text-muted-foreground flex items-center gap-x-2">
          <LucideCompass size={32} className="mt-1 hidden" />
          <span>Explore</span>
        </h2>
        
        <StickyTabs />
        <Suspense fallback={<PostsSkeleton />}>
          <Explore user={user!} />
        </Suspense>
      </div>

      <div className="hidden md:flex flex-col gap-y-3 md:py-2 fixed top-16 right-48 px-4 bg-inherit">
        <h2 className="text-xl font-semibold py-4 text-muted-foreground">Tabs</h2>
        
        <ExploreTabs />
      </div>
    </div>
  );
}
