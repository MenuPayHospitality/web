import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const MediaUpload: React.FC<{
  mediaPreview: string | null;
  mediaFile: File | null; // Added
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}> = ({ mediaPreview, mediaFile, onUpload, fileInputRef }) => {
  const isVideo = mediaPreview && /\.(mp4|webm|ogg)$/i.test(mediaPreview);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleContainerClick = () => {
    if (!mediaPreview) {
      fileInputRef.current?.click();
    }
  };

  const handleMediaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center ${
        mediaPreview ? 'border-gray-300' : 'border-gray-200 cursor-pointer'
      }`}
      onClick={handleContainerClick}
    >
      {mediaPreview ? (
        <div className="relative w-full">
          {isVideo ? (
            <video
              ref={videoRef}
              src={"https://v.ftcdn.net/09/76/81/82/700_F_976818205_3kvIaJPWaw8UKn30G97Q8vAjMJONBeIq_ST.mp4"}
              controls
              className="w-full h-48 object-cover rounded-md"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={handleMediaClick}
            />
          ) : (
            <Image
              src={mediaPreview}
              alt="Media preview"
              className="w-full h-48 object-cover rounded-md"
              onClick={handleMediaClick}
              onError={() => console.error("Failed to load image from blob URL")}
              width={400}
              height={400}
            />
          )}
          {isVideo && !isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md cursor-pointer"
              onClick={handlePlayClick}
              aria-label="Play video"
            >
              <PlayCircle size={40} className="text-white" />
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="p-2 mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16V8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12L12 8L16 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-800">Click to upload video or image</p>
            <p className="text-sm text-gray-500 mt-1">Maximum file size 50 MB</p>
          </div>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onUpload}
        accept="image/*,video/mp4,video/webm,video/ogg"
        className="hidden"
      />
    </div>
  );
};

export default MediaUpload;