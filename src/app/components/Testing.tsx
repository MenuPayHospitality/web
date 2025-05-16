import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface CloudinaryResult {
  info?: {
    secure_url: string;
  };
}

const ImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [cloudinaryWidget, setCloudinaryWidget] = useState<any>(null);

  // Initialize Cloudinary widget
  useEffect(() => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'YOUR_CLOUD_NAME', // Replace with your Cloudinary cloud name
        uploadPreset: 'YOUR_UPLOAD_PRESET', // Replace with your upload preset
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
      },
      (error: any, result: CloudinaryResult) => {
        if (!error && result && result.info) {
          setImageUrl(result.info.secure_url);
        }
        if (error) {
          console.error('Upload error:', error);
        }
      }
    );
    setCloudinaryWidget(widget);

    // Cleanup
    return () => {
      if (widget) {
        widget.destroy();
      }
    };
  }, []);

  const handleUpload = () => {
    if (cloudinaryWidget) {
      cloudinaryWidget.open();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload Image
      </button>
      {imageUrl && (
        <div className="mt-4">
          <p className="text-gray-700">Uploaded Image URL:</p>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 break-all"
          >
            {imageUrl}
          </a>
          <Image src={imageUrl} alt="Uploaded" className="mt-2 max-w-xs" width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;