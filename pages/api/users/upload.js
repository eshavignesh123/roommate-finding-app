import multer from 'multer';
import nextConnect from 'next-connect';
import { MongoClient, GridFSBucket } from 'mongodb';
import clientPromise from '../../lib/mongodb';

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  try {
    console.log("Received file:", req.file);

    if (!req.file) {
      console.error("No file received.");
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const client = await clientPromise;
    const db = client.db('RoommateFinder');
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    const uploadStream = bucket.openUploadStream(req.file.originalname);
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
      console.log("File uploaded successfully");
      res.status(200).json({ message: 'File uploaded successfully' });
    });

    uploadStream.on('error', (err) => {
      console.error("Upload error:", err);
      res.status(500).json({ error: 'Error uploading file' });
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});



export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
