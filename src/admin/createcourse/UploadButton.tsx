// src/components/CreateCourse/UploadButton.tsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface UploadButtonProps {
  media: File | null;
  onMediaChange: (file: File | null) => void;
  onDeleteMedia: () => void;
  label: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ media, onMediaChange, onDeleteMedia, label }) => {
  return (
    <div className="mb-3">
      <label className="block font-semibold mb-1">{label}</label>
      {media ? (
        <>
          <button
            type="button"
            onClick={onDeleteMedia}
            className="text-red-500"
          >
            <FaTrash />
          </button>
          <p className="text-sm mt-1 text-gray-600">Uploaded: {media.name}</p>
        </>
      ) : (
        <input
          type="file"
          accept="image/*,video/*,.pdf,.docx"
          onChange={(e) => e.target.files && onMediaChange(e.target.files[0])}
        />
      )}
    </div>
  );
};

export default UploadButton;
