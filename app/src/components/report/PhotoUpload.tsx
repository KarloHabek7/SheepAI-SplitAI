import React, { useState, useRef } from 'react';
import './PhotoUpload.css';

interface PhotoUploadProps {
  onImageSelect: (imageUrl: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(url);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div className="photo-upload-container">
      <div 
        className={`upload-zone ${preview ? 'has-preview' : ''}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          hidden
        />
        
        {!preview ? (
          <div className="upload-placeholder">
            <div className="icon-circle">
              <span className="material-symbols-outlined">add_a_photo</span>
            </div>
            <h3>Take a photo</h3>
            <p>Show us the problem clearly. We'll identify it automatically.</p>
            <button className="primary-btn">Select or Capture</button>
          </div>
        ) : (
          <div className="preview-wrapper">
            <img src={preview} alt="Problem preview" className="image-preview" />
            <div className="preview-overlay">
              <button className="action-btn remove" onClick={clearImage}>
                <span className="material-symbols-outlined">delete</span>
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
