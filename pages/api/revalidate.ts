//https://<your-site.com>/api/revalidate?tag=collection&secret=<token>

//* we have add path to make our revalidation to work with any path we give. path= /
//http://localhost:3000/api/revalidate?path=/&secret=1447b8110416d4ff2e27f4d1366f677b

import { NextApiRequest, NextApiResponse  } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if(req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token'})
  }

  //* it is advicebable to not use try.. catch because it is good to have the detail about the error. to handle that easily.


  const path = req.query.path as string ;

  await res.revalidate(path);


  return res.json({revalidated: true});
  //* Note: we do not test this in dev mode by running "npm run dev" (it will give a 500 error). We then need to rebuild our app by "npm run build" and "npm start"

}















