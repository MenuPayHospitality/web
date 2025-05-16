import React, { useMemo } from 'react';
import MediaUpload from './MediaUpload';
import MenuHeader from './MenuHeader';
import AddCategoryInput from './AddCategoryInput';
import CategorySelector from './CategorySelector';
import TextInput from './TextInput';
import FormActions from './FormActions';
import DescriptionInput from './DescriptionInput';
import PriceInput from './PriceInput';

const MenuItemForm: React.FC<{
  formData: any;
  formErrors: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  mediaPreview: string | null;
  mediaFile: File | null; // Add mediaFile prop
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
  isAddingCategory: boolean;
  setIsAddingCategory: (value: boolean) => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
  handleAddCategory: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}> = ({
  formData,
  formErrors,
  handleInputChange,
  mediaPreview,
  mediaFile,
  fileInputRef,
  handleFileUpload,
  categories,
  isAddingCategory,
  setIsAddingCategory,
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleSubmit,
}) => {
  const isFormValid = useMemo(() => {
    return (
      formData.category &&
      formData.name &&
      formData.price &&
      !isNaN(Number(formData.price)) &&
      !formErrors.category &&
      !formErrors.name &&
      !formErrors.price
    );
  }, [formData, formErrors]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <MenuHeader title="Add menu item" onBack={() => window.history.back()} />

      <div className="flex-grow p-4 overflow-y-auto space-y-5">
        <MediaUpload
          mediaPreview={mediaPreview}
          mediaFile={mediaFile}
          onUpload={handleFileUpload}
          fileInputRef={fileInputRef}
        />

        {isAddingCategory ? (
          <AddCategoryInput
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onAdd={handleAddCategory}
            onCancel={() => setIsAddingCategory(false)}
          />
        ) : (
          <CategorySelector
            category={formData.category}
            categories={categories}
            hasError={formErrors.category}
            onChange={handleInputChange}
            onAddNew={() => setIsAddingCategory(true)}
          />
        )}

        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          placeholder="Enter name"
          required={true}
          hasError={formErrors.name}
          onChange={handleInputChange}
        />

        <PriceInput
          value={formData.price}
          hasError={formErrors.price}
          onChange={handleInputChange}
        />

        <DescriptionInput
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <FormActions
        onCancel={() => window.history.back()}
        isFormValid={isFormValid}
      />
    </form>
  );
};

export default MenuItemForm;