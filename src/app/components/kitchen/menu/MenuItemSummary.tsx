import React, { useState } from 'react';
import ItemDetail from './ItemDetail';
import { PlayCircle } from 'lucide-react';
import AvailabilityToggle from './AvailabilityToggle';
import Image from 'next/image';

const MenuItemSummary: React.FC<{
  loading: boolean
  formData: any;
  imagePreview: string | null; // Still named imagePreview for now
  isAvailable: boolean;
  setIsAvailable: (value: boolean) => void;
  handlePublish: () => void;
  handleBack: () => void;
}> = ({
  loading,
  formData,
  imagePreview,
  isAvailable,
  setIsAvailable,
  handlePublish,
  handleBack,
}) => {
    const isVideo = imagePreview && /\.(mp4|webm|ogg)$/i.test(imagePreview);

    return (
      <>
        {loading ? (
          <div className="w-full h-full fixed top-0 left-0 bg-yellow-200 op flex justify-center items-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#BB8F54]"></div>
            </div>
          </div>
        ) : (

          <div className="flex flex-col h-full">
            <div className="px-4 py-3">
              <h1 className="text-2xl font-semibold">Summary</h1>
              <p className="text-gray-500 text-sm">What your customers will see on the menu.</p>
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
              <div className="bg-white rounded-lg shadow p-4 space-y-6">
                <AvailabilityToggle
                  isAvailable={isAvailable}
                  onToggle={() => setIsAvailable(!isAvailable)}
                />

                {imagePreview && (
                  <div className="relative w-full">
                    {isVideo ? (
                      <video
                        src={imagePreview}
                        controls
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : (
                      <Image
                        width={300}
                        height={300}
                        src={imagePreview}
                        alt="Media preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                      <PlayCircle size={40} className="text-white" />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <ItemDetail label="Category" value={formData.category} />
                  <ItemDetail label="Name" value={formData.name} />
                  <ItemDetail label="Price" value={`₦${formData.price}`} />
                  <ItemDetail
                    label="Status"
                    value={isAvailable ? 'Available' : 'Unavailable'}
                    isStatus={true}
                  />

                  {formData.description && (
                    <div>
                      <span className="text-gray-500 text-sm">Description</span>
                      <p>{formData.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 flex flex-col space-y-3">
              <button
                type="button"
                onClick={handlePublish}
                className="w-full py-3 bg-gray-800 text-white rounded-md font-medium"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-3 bg-yellow-400 text-gray-800 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

export default MenuItemSummary;