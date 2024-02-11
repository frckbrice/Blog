import { getPostsMeta } from "@/lib/post";
import ListItems from "@/app/components/ListItems";
import Link from "next/link";
import NotFound from "@/app/post/[postId]/not-found";

export const revalidate = 86400;

type Props = {
  params: {
    tag: string;
  };
};

//? Donot forget that, if revalidate = 0, you need to comment generateStaticParams(.)
export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  const tags = new Set(posts.map((post) => post.tags).flat());

  return Array.from(tags).map((tag) => ({ tag }));
}

export function generateMetadata({ params: { tag } }: Props) {
  
  if(!tag)
    NotFound()
  return {
    title: `Posts about ${tag}`,
  };
}

export default async function TagPostList({ params: { tag } }: Props) {
  const posts = await getPostsMeta(); //deduped!

  if (!posts)
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;

  const tagPosts = posts.filter((post) => post.tags?.includes(tag));

  if (!tagPosts.length) {
    return (
      <div className="text-center">
        <p className="mt-10">Sorry, no posts for #{tag} keyword.</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl mt-16 mb-0 ">Results for: #{tag}</h2>
      <section className="mt-6 mx-auto max-w-2xl">
        <ul className="w-full list-none p-0">
          {tagPosts.map((post) => (
            <ListItems key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </>
  );
}
