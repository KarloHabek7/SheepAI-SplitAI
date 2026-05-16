import React, { useRef } from 'react';
import './PhotoUpload.css';

interface PhotoUploadProps {
  onImageSelected: (image: string) => void;
  currentImage: string | null;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageSelected, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="photo-upload-container">
      {!currentImage ? (
        <div className="upload-placeholder" onClick={triggerUpload}>
          <div className="upload-icon">📸</div>
          <p className="upload-text">Tap to take photo or upload</p>
          <p className="upload-subtext">Gemini will automatically classify the issue</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            capture="environment"
            className="hidden-input"
          />
        </div>
      ) : (
        <div className="image-preview-container">
          <img src={currentImage} alt="Report preview" className="image-preview" />
          <button className="change-photo-btn" onClick={triggerUpload}>
            Change Photo
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            capture="environment"
            className="hidden-input"
          />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
