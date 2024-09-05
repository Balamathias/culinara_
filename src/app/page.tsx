import { Card, CardContent } from "@/components/ui/card";
import { getPosts } from "@/services/posts";
import Image from "next/image";

export default async function Home() {
  const posts = await getPosts();
  const results = posts?.results || [];
  return (
    <div className="flex flex-col gap-y-5 p-4 md:p-8 mx-auto max-w-7xl items-center">
      {
        results?.length && results.map((post) => (
          <Card key={post?.id} className="rounded-xl max-w-[500px] flex flex-col gap-y-2.5">
            <Image
              src={post.thumbnail!}
              alt={post.title}
              width={1000}
              height={1000}
              quality={100}
              className="w-full rounded-t-xl object-cover aspect-square h-[300px]"
            />
            <CardContent className="flex flex-col gap-y-2">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm text-muted-foreground">{post.short_description}</p>
            </CardContent>
          </Card>
        ))
      }
    </div>
  );
}
