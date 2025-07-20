import { Client, Users, Databases,ID } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.key);
  const users = new Users(client);
  const db=new Databases(client)
  const promise= db.createDocument(
    process.env.db,
    process.env.collection,
    ID.unique(),
    {
      name:'-',
    }
  )
  promise.then(data=>{
    return res.json({ message: data,env:process.env });
  })
}
