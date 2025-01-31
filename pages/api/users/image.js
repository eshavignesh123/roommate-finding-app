import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Missing image ID' });
    }

    const client = await clientPromise;
    const db = client.db('RoommateFinder');
    const bucket = new mongodb.GridFSBucket(db);
    const downloadStream = bucket.openDownloadStream(ObjectId(id));

    downloadStream.on('error', () => {
      return res.status(404).json({ error: 'Image not found' });
    });

    res.setHeader('Content-Type', 'image/jpeg');
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving image' });
  }
};
