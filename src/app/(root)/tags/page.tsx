import TagPosts from "@/components/partials/tag-posts";
import PostsSkeleton from "@/components/skeletons/posts";
import { getUser } from "@/services/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Culinara | Recipes'
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const sP = new URLSearchParams(searchParams)
  const tag = sP.get('tag')
  const user = await getUser()

  return (
    <div className="flex md:p-8 py-6 mx-auto gap-y-3 max-w-7xl w-full gap-x-10">
      <div className="flex flex-col gap-y-4 md:basis-2/3">
        <h2 className="text-2xl md:text-4xl font-semibold py-4 text-muted-foreground flex items-center gap-x-2">
          <span># {tag}</span>
        </h2>
        <Suspense fallback={<PostsSkeleton />}>
          <TagPosts user={user!} tag={tag!} />
        </Suspense>
      </div>

      <div className="hidden md:flex flex-col gap-y-3">
        <h2 className="text-xl md:text-2xl font-normal py-4 text-muted-foreground tracking-tighter">Options</h2>
        
        <div className="flex flex-col gap-y-2">
          <div className="rounded-lg py-2.5 bg-primary/15 text-primary px-4">
            <h3 className="text-lg font-semibold">Sort By</h3>
            <div className="flex flex-col gap-y-2 mt-2">
              <button className="text-base font-medium">Most Recent</button>
              <button className="text-base font-medium">Most Liked</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
