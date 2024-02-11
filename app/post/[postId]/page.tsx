import React from "react";
import { notFound } from "next/navigation";
import { getPostsMeta, getPostsByName } from "@/lib/post";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";

export const revalidate = 86400;
//*export const revalidate = 0; this set cache to no-cache to avoid caching data. this help to catch errors during development
// that set the page by default to SSG


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
  const post = await getPostsByName(`${postId}.mdx`); //also  deduped by nextjs

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
  const post = await getPostsByName(`${postId}.mdx`); // deduped 

  if (!post) notFound(); 
  //? no need of "return" keyword here because notFound use TS type "never"

  const { meta, content } = post;

  const pubdata = getFormattedDate(meta.date);

  const tags = meta?.tags?.map((tag, i) => (
    <Link href={`/tags/${tag}`} key={i}>
      {tag}
    </Link>
  ));

  // console.log(tags);

  return (
    <>
      {" "}
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>{" "}
      <p className="mt-0  text-sm">{pubdata}</p>
      <article className=" mt-0">{content}</article>
      <section>
        <h3>Related: </h3>
        <div className="flex flex-row gap-4 ">{tags}</div>
      </section>
      <p>
        <Link href={"/"} className="mb-48 ">
          ← Back Home{" "}
        </Link>
      </p>
    </>
  );
}
