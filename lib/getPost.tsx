import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDiretory = path.join(process.cwd(), "blogposts");

const getPost = async (id: string) => {
  const fullpath = path.join(postsDiretory, `${id}.md`);
  const fileContents = fs.readFileSync(fullpath, "utf-8");

  //use the gray-matter to parse the post metadata of the section
  const matterResult = matter(fileContents);
  //? remark and remark-html help to generate html content. this code process the markdown content in matterResult and convert it to html.
  const processContent = await remark().use(html).process(matterResult.content);

  console.log(processContent);

  const contentHtml = processContent.toString();

  const blogPostWithHTML: BlogPost & { contentHtml: string } = {
    id,
    title: matterResult?.data.title,
    date: matterResult?.data.date,
    contentHtml,
  };

  return blogPostWithHTML;
};

export default getPost;
