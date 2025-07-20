import { Client, Databases, ID, Query, Users } from 'node-appwrite'

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.key)
  const users = new Users(client)
  const db = new Databases(client)

  if (req.path === '/cls') {
    const data = db.listDocuments(
      process.env.db,
      'cls',
      []
    )
    return res.send({ data }, 200, {
      'Access-Control-Allow-Origin': '*',
    })
  }

  const promise = db.createDocument(
    process.env.db,
    process.env.collection,
    ID.unique(),
    {
      name: new Date().toLocaleString(),
    },
  )
  const data = await promise
  return res.send({ message: data, env: process.env }, 200, {
    'Access-Control-Allow-Origin': '*',
  })
}
