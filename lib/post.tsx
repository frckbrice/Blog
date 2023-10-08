import { compileMDX } from "next-mdx-remote/rsc"; //*react server component
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Video from "@/app/components/video";
import CustomImage from "@/app/components/CustomImage";

type FileTree = {
  tree: [
    {
      path: string;
    }
  ];
};

export const getPostByName = async (
  filename: string
): Promise<BlogPost | undefined> => {
  const resp = await fetch(
    `https://raw.githubusercontent.com/frckbrice/blog-markdown/main/${filename}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!resp.ok) return undefined;

  const rawMDX = await resp.text();

  if (rawMDX === "404: Not Found") return undefined;

  //? we need to process this MDX file by using "frontmatter method from react-mdx-remote" package which help parse the mdx files

  // type MetaPart = Pick<Meta, "title" | "date" | "tags">;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
  }>({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          // rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  const id = filename.replace(/\.mdx$/, ""); // remove ext and return the name

  const blogsPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };
  console.log(blogsPostObj.meta.tags)

  return blogsPostObj;
};

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const resp = await fetch(
    "https://api.github.com/repos/frckbrice/blog-markdown/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  if (!resp.ok) return undefined;

  const repoFiletree: FileTree = await resp.json();

  // console.log(repoFiletree)

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(".mdx"));

  const posts: Meta[] = [];

  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}