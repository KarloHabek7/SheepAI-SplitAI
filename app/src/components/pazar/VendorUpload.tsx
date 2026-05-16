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
    newItems[index] = { ...newItems[index], [field]: value as never };
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
    <div className="vendor-upload-container">
      {/* Background from Aura Component */}
      <div className="vendor-upload-bg">
        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/60668e31-2150-424e-b292-05bfdda254e0_1600w.jpg" alt="Abstract background" />
        <div className="vendor-upload-overlay"></div>
      </div>

      <div className="vendor-upload-content">
        {/* Left Side: Copy & Highlights */}
        <div className="vendor-text-panel">
          <h2 className="vendor-text-title">Post Your Produce</h2>
          <p className="vendor-text-subtitle">
            Snap a photo of your stall with clearly written prices. Our AI will automatically classify the fish, fruit, and vegetables.
          </p>

          <div className="vendor-features">
            <div className="vendor-feature">
              <div className="feature-icon">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bolt</span>
              </div>
              <div className="feature-text">
                <h4>Instant Extraction</h4>
                <p>Gemini Vision reads the prices and items for you.</p>
              </div>
            </div>
            <div className="vendor-feature">
              <div className="feature-icon">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>public</span>
              </div>
              <div className="feature-text">
                <h4>Reach Citizens</h4>
                <p>Listings appear instantly on the public Pazar feed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Action Panel (Upload / Form) */}
        <div className="vendor-action-panel">
          <div className="panel-header">
            <div>
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>Vendor Portal</p>
              <h3>{previewUrl ? 'Review Items' : 'Upload Photo'}</h3>
            </div>
            <div className="panel-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_a_photo</span>
            </div>
          </div>

          {!previewUrl ? (
            <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                hidden 
              />
              <span className="material-symbols-outlined upload-icon">cloud_upload</span>
              <p>Click here to select a photo of your stall.</p>
              <button className="btn-primary" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                Select Image
              </button>
            </div>
          ) : (
            <div className="extraction-flow">
              <img src={previewUrl} alt="Preview" className="preview-thumb" />
              
              {isAnalyzing ? (
                <div className="analysis-state">
                  <div className="spinner"></div>
                  <p>Extracting prices...</p>
                </div>
              ) : (
                <div className="items-editor">
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
                          <span className="price-unit">€/{item.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="btn-primary" onClick={handleConfirm}>
                    Publish Listing
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setPreviewUrl(null)}>
                    Use different photo
                  </button>
                  <p className="form-helper-text">
                    By publishing, your listing will be visible for 4 hours.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorUpload;
