import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('RoommateConnectCluster'); 
    const collections = await db.listCollections().toArray();
    res.status(200).json({ collections });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

