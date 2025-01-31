import { useEffect, useState } from 'react';

export default function ImageDisplay({ imageId }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (imageId) {
      const fetchImage = async () => {
        try {
          const response = await fetch(`/api/image?id=${imageId}`);
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

      fetchImage();
    }
  }, [imageId]);

  {imageSrc ? (
    <img src={imageSrc} alt="Uploaded image" />
  ) : (
    <p>Loading image...</p>
  )}
}
