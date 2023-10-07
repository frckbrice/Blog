import { getSortedPostsData } from "@/lib/post";
import ListItems from "./ListItems";

function Posts() {
  const posts = getSortedPostsData();

  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-4xl font-bold text-white/90">Blog</h2>
      <ul>
        {posts.map((post) => (
          <ListItems post={post} key={post.id} />
        ))}
      </ul>
    </section>
  );
}

export default Posts;

