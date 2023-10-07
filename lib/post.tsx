import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

//*cwd = Current working directory
const postsDiretory = path.join(process.cwd(), 'blogposts');


export function getSortedPostsData() {
  
  //?Get file names under /posts
  const fileNames: string[] = fs.readdirSync(postsDiretory);
  // console.log("\n\nfileNames ", fileNames);
  const allPostsData = fileNames.map(fileName => {
    //?remove '.md' from file name to get id;
    const id = fileName.replace(/\.md/, '');

    // console.log("\n\nid ", id);

    //? Read markdown file as a string 
    const fullPath = path.join(postsDiretory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    //  console.log("\n\nfullPath ", fullPath);
    //   console.log("\n\nfileContents ", fileContents);
    
    //? use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

//  console.log("\n\nmatterResult ", matterResult);    

    const blogPost: BlogPost = {
      id,
      title: matterResult?.data?.title,
      date: matterResult?.data?.date
    }

    //? combine the data with the id
    return blogPost;
  })

  //? Sort Post by date
  return allPostsData?.sort((a, b)  => a.date  < b.date ? -1 : 1)

}