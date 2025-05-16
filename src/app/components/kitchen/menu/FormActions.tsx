import React from 'react';

interface FormActionsProps {
  onCancel: () => void;
  isFormValid: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, isFormValid }) => {
  return (
    <div className="p-4 flex flex-col justify-center space-y-3">
        <button
        type="submit"
        disabled={!isFormValid}
        className={`px-4 py-2 rounded ${
          isFormValid ? 'bg-zinc-800 text-white' : 'bg-zinc-300 text-gray-200 cursor-not-allowed'
        }`}
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-gray-100 text-black rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default FormActions;