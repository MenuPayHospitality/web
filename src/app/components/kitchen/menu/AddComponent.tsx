import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { usePrivy, useSolanaWallets } from '@privy-io/react-auth';
import MenuItemForm from './MenuItemForm';
import MenuItemSummary from './MenuItemSummary';
import { useRouter } from 'next/navigation';
import { uploadBlobToCloudinary } from '../../../../../utlis/uploader';
import SuccessMenuUpload from './SuccessMenuUpload';

const AddMenuItemPage: React.FC = () => {
  const { user } = usePrivy();
  const router = useRouter();
  const [formData, setFormData] = useState({
    menuId: '',
    category: '',
    name: '',
    price: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories] = useState(['FOOD', 'DRINK', 'JUICE', 'DESSERT', 'SNACK']);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSummary, setIsSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState("")
  const [error, setError] = useState<string | null>(null);
  const [isSuccessful, setIsSuccessful] = useState(false)

  const {wallets} = useSolanaWallets()

  useEffect(() => {
    return () => {
      if (mediaPreview) {
        URL.revokeObjectURL(mediaPreview);
      }
    };
  }, [mediaPreview]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clear previous mediaPreview if it exists
      if (mediaPreview) {
        URL.revokeObjectURL(mediaPreview);
      }
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setIsAddingCategory(false);
      setNewCategory('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.price || isNaN(Number(formData.price))) errors.price = 'Valid price is required';

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setIsSummary(true);
  };

  const handlePublish = async () => {
    const api_url = process.env.NEXT_PUBLIC_API_URL

    if (!user?.email?.address && !user?.wallet?.address) {
      setError('Please log in to continue');
      return;
    }

    try {
      setLoading(true)

      const userIdentifier = user.google?.email || wallets[0]?.address;
      let imageUrl: string | null | undefined;

      const restaurantInfo = localStorage.getItem("restaurant_unique");
      const parsedRestaurantInfo = restaurantInfo ? JSON.parse(restaurantInfo) : null;
      if (!parsedRestaurantInfo?.id) {
        setError('Restaurant information not found');
        return;
      }

      if (mediaFile) {
        // Use empty string if mediaFile.name is undefined (though it shouldn't be with File type)
        const fileName = mediaFile.name?.toLowerCase() || '';
        const mediaType = mediaFile.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)
          ? "image"
          : mediaFile.type.startsWith("video/") || /\.(mp4|webm|ogg)$/i.test(fileName)
          ? "video"
          : null;

        if (!mediaType) {
          setError('Unsupported file type');
          return;
        }

        imageUrl = await uploadBlobToCloudinary(mediaFile, mediaType);
        if (!imageUrl) {
          setError(`Failed to upload ${mediaType}`);
          return;
        }
      }

      const response = await axios.post(
        `${api_url}/menu-items`,
        {
          restaurantId: parsedRestaurantInfo.id,
          category: formData.category,
          name: formData.name,
          price: Number(formData.price),
          description: formData.description || undefined,
          imageUrl,
          available: isAvailable,
        },
        { headers: { 'x-user-identifier': userIdentifier } }
      );
      setRestaurantId(parsedRestaurantInfo.id)
      setIsSuccessful(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error adding menu item');
    } finally {
      setLoading(false)
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      {isSuccessful? (
        <SuccessMenuUpload restaurantId={restaurantId}/>
      ): (
        isSummary ? (
          <MenuItemSummary
          loading={loading}
            formData={formData}
            imagePreview={mediaPreview}
            isAvailable={isAvailable}
            setIsAvailable={setIsAvailable}
            handlePublish={handlePublish}
            handleBack={() => setIsSummary(false)}
          />
        ) : (
          <MenuItemForm
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
          mediaPreview={mediaPreview}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          categories={categories}
          isAddingCategory={isAddingCategory}
          setIsAddingCategory={setIsAddingCategory}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          handleAddCategory={handleAddCategory}
          handleSubmit={handleSubmit}
          mediaFile={mediaFile} // Added
        />
        )
      )
      }
    </>
  )
};

export default AddMenuItemPage;