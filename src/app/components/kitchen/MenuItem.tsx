import { useState } from "react";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";

export default function AddMenuItem() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    description: ""
  });

  const [categories, setCategories] = useState([
    { id: "main", name: "Main Course" },
    { id: "appetizer", name: "Appetizer" },
    { id: "dessert", name: "Dessert" }
  ]);

  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (e:any) => {
    const value = e.target.value;
    if (value === "new") {
      setShowNewCategoryInput(true);
    } else {
      setFormData({
        ...formData,
        category: value
      });
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      const categoryId = newCategory.toLowerCase().replace(/\s+/g, '-');
      const newCategoryObj = { id: categoryId, name: newCategory.trim() };
      
      // Add new category to the list
      setCategories([...categories, newCategoryObj]);
      
      // Select the new category
      setFormData({
        ...formData,
        category: categoryId
      });
      
      // Reset state
      setNewCategory("");
      setShowNewCategoryInput(false);
    }
  };

  const handleCancelNewCategory = () => {
    setShowNewCategoryInput(false);
    setNewCategory("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  // Check if form has required fields filled
  const isFormValid = formData.category && formData.name && formData.price;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 flex items-center">
        <button className="flex items-center text-gray-700">
          <ArrowLeft size={20} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      
      {/* Title */}
      <div className="px-5 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Add menu item</h1>
      </div>
      
      {/* Form */}
      <div className="px-5 flex-1 flex flex-col">
        {/* Image Upload */}
        <div className="w-full border-2 border-dashed border-gray-300 rounded-lg h-40 mb-6 flex flex-col items-center justify-center">
          <div className="text-center p-4">
            <Upload size={24} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700">Click to upload</p>
            <p className="text-xs text-gray-500 mt-1">Maximum file size 50 MB</p>
          </div>
        </div>
        
        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Category<span className="text-red-500">*</span>
          </label>
          
          {!showNewCategoryInput ? (
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded-lg p-3 appearance-none text-gray-700"
              >
                <option value="" disabled className="text-gray-400">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value="new" className="font-medium text-blue-600">+ Add new category</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                  autoFocus
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddNewCategory}
                  className="flex-1 bg-blue-500 text-white rounded-lg py-2 font-medium flex items-center justify-center"
                  disabled={!newCategory.trim()}
                >
                  <Plus size={16} className="mr-1" />
                  Add Category
                </button>
                <button
                  onClick={handleCancelNewCategory}
                  className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 font-medium flex items-center justify-center"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Price<span className="text-red-500">*</span>
          </label>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-200 p-3 text-gray-700 flex items-center justify-center">
              ₦
            </div>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="flex-1 p-3 border-none focus:outline-none"
            />
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Description (optional)<span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Additional information about the meal"
            className="w-full border border-gray-300 rounded-lg p-3 h-32"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="mt-auto mb-4">
          <button
            onClick={handleSubmit}
            className={`w-full rounded-lg py-4 font-medium ${
              isFormValid 
                ? "bg-gray-800 text-white" 
                : "bg-gray-200 text-gray-500"
            }`}
            disabled={!isFormValid}
          >
            Save
          </button>
          <button
            type="button"
            className="w-full text-gray-700 py-4 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}