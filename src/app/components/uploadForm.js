import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('pages/api/users/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload file');
      }

      alert('File uploaded successfully');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-600 dark:file:bg-blue-600 dark:file:text-white ..." onChange={handleFileChange} required />
      <button type="submit" className="mt-2 w-60 py-2 text-base font-medium text-white focus:outline-none bg-gray-600 rounded-lg focus:z-10 focus:ring-4 ">Upload</button>
    </form>
  );
}
