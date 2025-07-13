import { Client, Users, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);
  log(process.env.collection);
  try {
    return res.json({ message: res.bodyJson||'User created successfully' });
  } catch (err) {
    error('Could not list users: ' + err.message);
  }
};
