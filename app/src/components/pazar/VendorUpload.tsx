import React, { useState, useRef } from 'react';
import { PazarListingClassification, PazarItem } from '@/types';
import './VendorUpload.css';

interface VendorUploadProps {
  onComplete: (classification: PazarListingClassification) => void;
}

const VendorUpload: React.FC<VendorUploadProps> = ({ onComplete }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedItems, setExtractedItems] = useState<PazarItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    // Mocking Gemini Vision extraction
    setTimeout(() => {
      const mockItems: PazarItem[] = [
        { name: 'Brancin', category: 'fish', price: 22, unit: 'kg' },
        { name: 'Orada', category: 'fish', price: 18, unit: 'kg' },
        { name: 'Srdela', category: 'fish', price: 5, unit: 'kg' },
      ];
      setExtractedItems(mockItems);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleItemChange = (index: number, field: keyof PazarItem, value: string | number) => {
    const newItems = [...extractedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setExtractedItems(newItems);
  };

  const handleConfirm = () => {
    onComplete({
      items: extractedItems,
      freshness: 'morning',
      confidence: 0.95
    });
  };

  return (
    <div className="vendor-upload">
      {!previewUrl ? (
        <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            hidden 
          />
          <span className="material-symbols-outlined upload-icon">add_a_photo</span>
          <h3>Upload Stall Photo</h3>
          <p>Photograph your products and prices. AI will do the rest.</p>
          <button className="primary-btn">Select Image</button>
        </div>
      ) : (
        <div className="preview-container">
          <div className="image-preview">
            <img src={previewUrl} alt="Stall Preview" />
            <button className="change-btn" onClick={() => { setPreviewUrl(null); }}>
              Change Photo
            </button>
          </div>

          <div className="extraction-panel">
            {isAnalyzing ? (
              <div className="analysis-state">
                <div className="spinner"></div>
                <p>Gemini is reading your prices...</p>
              </div>
            ) : (
              <div className="items-editor">
                <h3>Extracted Products</h3>
                <p className="helper-text">Review and adjust prices if needed.</p>
                
                <div className="items-list">
                  {extractedItems.map((item, index) => (
                    <div key={index} className="item-row">
                      <input 
                        type="text" 
                        value={item.name} 
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      />
                      <div className="price-input">
                        <input 
                          type="number" 
                          value={item.price} 
                          onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                        />
                        <span>€/{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="confirm-btn" onClick={handleConfirm}>
                  Confirm & Post Listing
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorUpload;
