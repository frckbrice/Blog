import React from "react";
import { notFound } from "next/navigation";
import { getPostsMeta, getPostByName } from "@/lib/post";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";

export const revalidate = 86400;
//* this set cache to no-cache to avoid caching data. this help to catch errors during development

type Props = {
  params: {
    postId: string;
  };
};

//* revalidate = 0 and generatStaticparams cannot work together. this will lead to conflict
export async function generateStaticParams() {
  const posts = await getPostsMeta(); // deduped by nextjs during the build. so just request data where ever it needs

  if (!posts) return [];

  return posts?.map((post) => ({ postId: post.id }));
}

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); // deduped by nextjs

  if (!post) {
    return {
      title: "Post not Found",
    };
  }
  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); // deduped by nextjs

  if (!post) notFound(); //? no need of return here because notFound use TS type "never"

  const { meta, content } = post;

  const pubdata = getFormattedDate(meta.date);

  const tags = meta?.tags?.map((tag, i) => (
    <Link href={`/tags/${tag}`} key={i} className=" text-white/40">
      {tag}
    </Link>
  ));

  console.log(tags);

  return (
    <>
      {" "}
      <h2 className="text-3xl mt-4 mb-0 text-white/80">{meta.title}</h2>{" "}
      <p className="mt-0  text-white/80">{pubdata}</p>
      <article className=" text-white/80 mt-0">{content}</article>
      <section>
        <h3 className=" text-white/40">Related: </h3>
        <div className="flex flex-row gap-4  text-white/40">{tags}</div>
      </section>
      <p>
        <Link href={"/"} className="mb-48 text-white/40">
          ← Back Home{" "}
        </Link>
      </p>
    </>
  );
}
